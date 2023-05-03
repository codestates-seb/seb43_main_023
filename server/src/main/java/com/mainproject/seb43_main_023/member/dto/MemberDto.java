package com.mainproject.seb43_main_023.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

public class MemberDto {
    @Getter
    @AllArgsConstructor
    public static class Post {
        private String email;
        private String password;
        private String nickname;
        private String mbti;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch {
        private String nickname;
        private String mbti;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class Response {
        private Long memberId;
        private String email;
        private String password;
        private String nickname;
        private String mbti;
        private String role;
        private String memberStatus;
        private String badge;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }
}
