package com.mainproject.seb43_main_023.member.service;


import com.mainproject.seb43_main_023.auth.jwt.JwtTokenProvider;
import com.mainproject.seb43_main_023.auth.lib.Helper;
import com.mainproject.seb43_main_023.auth.utils.CustomAuthorityUtils;
import com.mainproject.seb43_main_023.dto.ApiResponse;
import com.mainproject.seb43_main_023.exception.BusinessLogicException;
import com.mainproject.seb43_main_023.exception.ExceptionCode;
import com.mainproject.seb43_main_023.member.dto.MemberDto;
import com.mainproject.seb43_main_023.member.entity.Member;
import com.mainproject.seb43_main_023.member.repository.MemberRepository;
import com.mainproject.seb43_main_023.redis.entity.RefreshToken;
import com.mainproject.seb43_main_023.redis.repository.RefreshTokenRedisRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final RefreshTokenRedisRepository refreshTokenRedisRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private final ApiResponse apiResponse;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    public ResponseEntity<?> signin(HttpServletRequest request, HttpServletResponse response, MemberDto.SignIn signIn) {
        // 1. email, password 기반으로 Authentication 객체 생성
        // 이때 authentication 는 인증 여부를 확인하는 authenticated 값이 false
        UsernamePasswordAuthenticationToken authenticationToken = signIn.toAuthentication();

        // 2. 실제 검증 (사용자 비밀먼호 확인)이 이루어지는 부분
        // authenticate 메서드가 실행될 때 Custom
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 3. 인증 정보를 기반으로 JWT Token 생성
        MemberDto.TokenInfo tokenInfo = jwtTokenProvider.generateToken(authentication);

        // 4. Redis RefreshToken 저장
        refreshTokenRedisRepository.save(RefreshToken.builder()
                .id(authentication.getName())
                .ip(Helper.getClientIp(request))
                .authorities(authentication.getAuthorities())
                .refreshToken(tokenInfo.getRefreshToken())
                .build());

        Member member = findVerifiedMemberByEmail(signIn.getEmail());
        response.addHeader("Authorization", tokenInfo.getAccessToken());
        response.addHeader("AccessTokenExpirationTime", tokenInfo.getAccessTokenExpirationTime().toString());
        response.addHeader("Refresh", tokenInfo.getRefreshToken());
        response.addHeader("RefreshTokenExpirationTime", tokenInfo.getRefreshTokenExpirationTime().toString());
        response.addHeader("MemberId", member.getMemberId().toString());

        ResponseCookie cookie = ResponseCookie.from("refreshToken", tokenInfo.getRefreshToken())
                .maxAge(7 * 24 * 60 * 60)
                .path("/")
                .secure(true)
                .sameSite("None")
                .httpOnly(true)
                .build();
        response.setHeader("Set-Cookie", cookie.toString());
        return new ResponseEntity<> (HttpStatus.OK);
    }

    public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response) {
        // 1. Request Header 에서 JWT Token 추출
        String token = jwtTokenProvider.resolveToken(request);

        // 2. validateToken 메서드로 토큰 유효성 검사
        if (token != null && jwtTokenProvider.validateToken(token)) {
            // 3. refreshToken 인지 확인
            if (jwtTokenProvider.isRefreshToken(token)) {
                // refreshToken
                RefreshToken refreshToken = refreshTokenRedisRepository.findByRefreshToken(token);
                if (refreshToken != null) {
                    // 4. 최초 로그인한 ip 와 같은지 확인 (처리 방식에 따라 재발금을 하지 않거나 메일 등의 알림을 주는 방법이 있음)
                    String currentIpAddress = Helper.getClientIp(request);
                    if (refreshToken.getIp().equals(currentIpAddress)) {
                        // 5. Redis 에 저장된 RefreshToken 정보를 기반으로 JWT Token 생성
                        MemberDto.TokenInfo tokenInfo = jwtTokenProvider.generateToken(refreshToken.getId(), refreshToken.getAuthorities());

                        // 6. Redis RefreshToken update
                        refreshTokenRedisRepository.save(RefreshToken.builder()
                                .id(refreshToken.getId())
                                .ip(currentIpAddress)
                                .authorities(refreshToken.getAuthorities())
                                .refreshToken(tokenInfo.getRefreshToken())
                                .build());

                        response.addHeader("Authorization", tokenInfo.getAccessToken());
                        response.addHeader("AccessTokenExpirationTime", tokenInfo.getAccessTokenExpirationTime().toString());
                        response.addHeader("Refresh", tokenInfo.getRefreshToken());
                        response.addHeader("RefreshTokenExpirationTime", tokenInfo.getRefreshTokenExpirationTime().toString());
                        return new ResponseEntity<> (HttpStatus.OK);
                    }
                }
            }
        }
        return apiResponse.fail("토큰 갱신에 실패했습니다.");
    }

    public Member createMember(Member member) {
        verifyExistsEmail(member.getEmail());


        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        Member savedMember = memberRepository.save(member);
        return savedMember;
    }

    public Member updateMember(Member member) {
        Member findMember = findVerifiedMember(member.getMemberId());
        Optional.ofNullable(member.getNickname())
                .ifPresent(nickname -> findMember.setNickname(nickname));
        Optional.ofNullable(member.getMbti())
                .ifPresent(mbti -> findMember.setMbti(mbti));

        return memberRepository.save(member);
    }

    public void deleteMember(long memberId) {
        Member verifiedMember = findVerifiedMember(memberId);
        verifiedMember.setMemberStatus(Member.MemberStatus.MEMBER_QUIT);
        memberRepository.save(verifiedMember);
    }

    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member findMember = optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return findMember;
    }

    public Member findVerifiedMemberByEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        Member findMember = member.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }

    private void verifyExistsEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
        }
    }
}
