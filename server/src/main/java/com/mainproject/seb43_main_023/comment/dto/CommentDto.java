package com.mainproject.seb43_main_023.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

public class CommentDto {
    @NoArgsConstructor
    @Setter
    @Getter
    public static class CommentPostDto {
        @NotBlank(message = "댓글 내용을 작성해야 합니다.")
        private String content;
        private long memberId;
        private long postId;

    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Setter
    @Getter
    public static class CommentPatchDto {
        @NotBlank(message = "댓글 내용을 작성해야 합니다.")
        private String content;
        private long memberId;
        private long postId;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Setter
    @Getter
    public static class CommentResponseDto {
        private long commentId;
        private String content;
        private long voteCount;
        private String createdAt;
        private String modifiedAt;
        private long memberId;
        private long postId;
    }
}
