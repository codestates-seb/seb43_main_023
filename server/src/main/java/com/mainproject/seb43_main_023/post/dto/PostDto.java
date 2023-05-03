package com.mainproject.seb43_main_023.post.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

public class PostDto {
    @AllArgsConstructor
    @Getter
    public static class postPostDto {
        private String subject;
        private String title;
        private String content;
//    private String tag;
//    추가예정
    }

    @Getter
    @Setter
    public static class postResponseDto {
        private long postId;
        private long memberId;
        private String nickname;
        private String subject;
        private String title;
        private String content;
        private long viewCount;
        private long voteCount;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }

    @Getter
    @Setter
    public static class postPatchDto{
        private String subject;
        private String title;
        private String content;
//    private String tag;
//    추가예정
    }
}
