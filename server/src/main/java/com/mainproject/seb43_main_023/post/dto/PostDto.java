package com.mainproject.seb43_main_023.post.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.ElementCollection;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

public class PostDto {
    @AllArgsConstructor
    @Getter
    public static class postPostDto {
        @NotBlank(message = "말머리를 선택해주세요.")
        private String subject;
        @NotBlank(message = "제목를 입력해주세요.")
        private String title;
        @NotBlank(message = "내용를 입력해주세요.")
        private String content;
        private List<String> image;

/**    TODO
 *      private String tag;
 *      추가예정
 */
    }

    @Getter
    @Setter
    public static class postResponseDto {
        private long postId;
        private long memberId;
        private String email;
        private String nickname;
        private String subject;
        private String title;
        private String content;
        private List<String> image;
        private long viewCount;
        private long voteCount;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }
    @Getter
    @Setter
    public static class postsResponseDto{
        private long postId;
        private long memberId;
        private String email;
        private String nickname;
        private String subject;
        private String title;
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
        private List<String> image;
//        private String tag;
//        추가예정
    }
}