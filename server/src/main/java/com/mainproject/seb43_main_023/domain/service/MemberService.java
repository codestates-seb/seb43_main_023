package com.mainproject.seb43_main_023.domain.service;


import com.mainproject.seb43_main_023.global.auth.jwt.JwtTokenProvider;
import com.mainproject.seb43_main_023.global.auth.lib.Helper;
import com.mainproject.seb43_main_023.global.util.CustomAuthorityUtils;
import com.mainproject.seb43_main_023.domain.entity.Comment;
import com.mainproject.seb43_main_023.domain.repository.CommentRepository;
import com.mainproject.seb43_main_023.domain.dto.ApiResponseDto;
import com.mainproject.seb43_main_023.global.exception.BusinessLogicException;
import com.mainproject.seb43_main_023.global.exception.ExceptionCode;
import com.mainproject.seb43_main_023.domain.dto.MemberDto;
import com.mainproject.seb43_main_023.domain.entity.Member;
import com.mainproject.seb43_main_023.domain.repository.MemberRepository;
import com.mainproject.seb43_main_023.domain.entity.Post;
import com.mainproject.seb43_main_023.domain.repository.PostRepository;
import com.mainproject.seb43_main_023.global.redis.entity.RefreshToken;
import com.mainproject.seb43_main_023.global.redis.repository.RefreshTokenRedisRepository;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final RefreshTokenRedisRepository refreshTokenRedisRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private final ApiResponseDto response;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    public ResponseEntity<?> signIn(HttpServletRequest request, MemberDto.SignIn signIn) {
        UsernamePasswordAuthenticationToken authenticationToken = signIn.toAuthentication();

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        MemberDto.TokenInfo tokenInfo = jwtTokenProvider.generateToken(authentication);

        Member verifiedMember = findVerifiedMemberByEmail(signIn.getEmail());
        tokenInfo.setMemberId(verifiedMember.getMemberId());

        refreshTokenRedisRepository.save(RefreshToken.builder()
                .id(authentication.getName())
                .ip(Helper.getClientIp(request))
                .authorities(authentication.getAuthorities())
                .refreshToken(tokenInfo.getRefreshToken())
                .build());

        return response.success(tokenInfo);
    }

    public ResponseEntity<?> reissue(HttpServletRequest request) {
        String token = jwtTokenProvider.resolveToken(request);

        if (token != null && jwtTokenProvider.validateToken(token)) {
            if (jwtTokenProvider.isRefreshToken(token)) {
                RefreshToken refreshToken = refreshTokenRedisRepository.findByRefreshToken(token);
                if (refreshToken != null) {
                    String currentIpAddress = Helper.getClientIp(request);
                    if (refreshToken.getIp().equals(currentIpAddress)) {
                        MemberDto.TokenInfo tokenInfo = jwtTokenProvider.generateToken(refreshToken.getId(), refreshToken.getAuthorities());

                        refreshTokenRedisRepository.save(RefreshToken.builder()
                                .id(refreshToken.getId())
                                .ip(currentIpAddress)
                                .authorities(refreshToken.getAuthorities())
                                .refreshToken(tokenInfo.getRefreshToken())
                                .build());

                        return response.success(tokenInfo);
                    }
                }
            }
        }
        return response.fail("토큰 갱신에 실패했습니다.");
    }

    public Member createMember(Member member) {
        verifyExistsEmail(member.getEmail());
        verifyExistsNickname(member.getNickname());

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        Member savedMember = memberRepository.save(member);
        return savedMember;
    }

    @Transactional
    public Member updateMember(Member member) {
        Member findMember = findVerifiedMember(member.getMemberId());
        Optional.ofNullable(member.getNickname())
                .ifPresent(nickname -> findMember.setNickname(nickname));
        Optional.ofNullable(member.getMbti())
                .ifPresent(mbti -> findMember.setMbti(mbti));
        Optional.ofNullable(member.getImg())
                .ifPresent((img -> findMember.setImg(img)));
        return memberRepository.save(member);
    }

    public List<Member> getMembers() {
        return memberRepository.findAll();
    }

    @Transactional
    public void deleteMember(HttpServletRequest request, long memberId) {
        String accessToken = request.getHeader("Authorization").substring(7);
        Claims claims = jwtTokenProvider.parseClaims(accessToken);
        String email = claims.getSubject();
        Member member = findVerifiedMemberByEmail(email);
        if (memberId != member.getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.NO_PERMISSION);
        }
        Member verifiedMember = findVerifiedMember(memberId);
        memberRepository.delete(verifiedMember);
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

    private void verifyExistsNickname(String nickname) {
        Optional<Member> member = memberRepository.findByNickname(nickname);
        if (member.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.NICKNAME_EXISTS);
        }
    }

    public long getUserNum(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent()) {
            return member.get().getMemberId();
        }
        else return 0;
    }

    public void grantBadge(long memberId) {
        Member verifiedMember = findVerifiedMember(memberId);

        List<Post> posts = postRepository.findAll().stream()
//                .filter(post -> post.getMemberId() == memberId)
                .filter(post -> post.getMember().getMemberId() == memberId)
                .collect(Collectors.toList());

        List<Comment> comments = commentRepository.findAll().stream()
                .filter(comment -> comment.getMemberId() == memberId)
                .collect(Collectors.toList());

        long voteCount = posts.stream()
                .map(Post::getVoteCount)
                .reduce(0L, Long::sum);

        if (posts.size() >= 50 && voteCount >= 30 && comments.size() >= 100) {
            verifiedMember.setBadge("고수 여행자");
        }
        else if (posts.size() >= 30 && voteCount >= 10 && comments.size() >= 30) {
            verifiedMember.setBadge("중급 여행자");
        }
        else if (posts.size() >= 5 && voteCount >= 1 && comments.size() >= 5) {
            verifiedMember.setBadge("초보 여행자");
        }

        memberRepository.save(verifiedMember);
    }

    public int findAllMembers() {
        return memberRepository.findAll().size();
    }
}
