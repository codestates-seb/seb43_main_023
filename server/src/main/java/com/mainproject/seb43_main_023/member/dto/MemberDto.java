package com.mainproject.seb43_main_023.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class MemberDto {

    @Getter
    @Setter
    public static class SignIn {
        // 이메일
        @NotBlank(message = "이메일을 입력해주세요.")
        private String email;

        // 비밀번호
        @NotBlank(message = "비밀번호를 입력해주세요.")
        private String password;

        public UsernamePasswordAuthenticationToken toAuthentication() {
            return new UsernamePasswordAuthenticationToken(email, password);
        }
    }
    @Getter
    @AllArgsConstructor
    public static class Post {
        private String email;
        private String password;
        private String nickname;
        private String mbti;
        private String img;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch {
        private String nickname;
        private String mbti;
        private String img;
        private String badge;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class Response {
        private Long memberId;
        private String email;
        private String nickname;
        private String mbti;
        private String memberStatus;
        private String img;
        private String badge;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    public static class TokenInfo {
        private String grantType;
        private String accessToken;
        private Long accessTokenExpirationTime;
        private String refreshToken;
        private Long refreshTokenExpirationTime;
        private Long memberId;
    }
}
