package com.mainproject.seb43_main_023.global.oauth;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mainproject.seb43_main_023.global.auth.jwt.JwtTokenProvider;
import com.mainproject.seb43_main_023.global.util.RandomPassword;
import com.mainproject.seb43_main_023.domain.dto.MemberDto;
import com.mainproject.seb43_main_023.domain.entity.Member;
import com.mainproject.seb43_main_023.domain.repository.MemberRepository;
import com.mainproject.seb43_main_023.domain.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class GoogleOauth {
    private final ObjectMapper objectMapper;
    private final RestTemplate restTemplate;
    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final RandomPassword randomPassword;
    private final PasswordEncoder passwordEncoder;

    public ResponseEntity<String> requestUserInfo(String accessToken) {
        String GOOGLE_USERINFO_REQUEST_URL = "https://www.googleapis.com/oauth2/v1/userinfo";

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);

        HttpEntity request = new HttpEntity(headers);
        ResponseEntity<String> response = restTemplate.exchange(GOOGLE_USERINFO_REQUEST_URL, HttpMethod.GET, request, String.class);
        System.out.println("response.getBody() = " + response.getBody());
        return response;
    }

    public GoogleUser getUserInfo(ResponseEntity<String> userInfoRes) throws JsonProcessingException {
        GoogleUser googleUser = objectMapper.readValue(userInfoRes.getBody(), GoogleUser.class);
        return googleUser;
    }

    public GetSocialOAuthRes oAuthLogin(String accessToken) throws IOException {

        ResponseEntity<String> userInfoResponse = requestUserInfo(accessToken);
        GoogleUser googleUser = getUserInfo(userInfoResponse);

        String user_id = googleUser.getEmail();

        long user_num = memberService.getUserNum(user_id);

        if (user_num != 0) {
            Member member = memberService.findVerifiedMemberByEmail(user_id);
            String password = randomPassword.getRandomPassword(10);
            member.setPassword(passwordEncoder.encode(password));
            memberRepository.save(member);
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(user_id, password);
            Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
            MemberDto.TokenInfo tokenInfo = jwtTokenProvider.generateToken(authentication);
            tokenInfo.setMemberId(user_num);

            GetSocialOAuthRes getSocialOAuthRes = new GetSocialOAuthRes(tokenInfo, accessToken, user_id, googleUser.getName(), password);
            return getSocialOAuthRes;
        }
        else {
            return new GetSocialOAuthRes(null, null, user_id, googleUser.getName(), randomPassword.getRandomPassword(10));
        }
    }
}
