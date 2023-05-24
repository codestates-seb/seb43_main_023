package com.mainproject.seb43_main_023.post.dto;

import com.mainproject.seb43_main_023.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.ElementCollection;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

public class PostDto {
    @AllArgsConstructor
    @Getter
    @NoArgsConstructor
    public static class postPostDto {
        @NotBlank(message = "말머리를 선택해주세요.")
        private String subject;

        @NotBlank(message = "제목를 입력해주세요.")
        private String title;

        @NotBlank(message = "내용를 입력해주세요.")
        private String content;

        private String placeName;

        private String locationY;

        private String locationX;

        private List<String> image;

        private List<String> tag;

/**    TODO
 *      private String tag;
 *      뱃지
 *      추가예정
 */
    }

    @Getter
    @Setter
    public static class postResponseDto {
        private long postId;
//        private long memberId;
//        private String email;
//        private String nickname;
        private Member member;
        private String subject;
        private String title;
        private String content;
        private String locationY;

        private String locationX;
        private List<String> image;
        private List<String> tag;
        private long viewCount;
        private long voteCount;
        private LocalDateTime postCreatedAt;
        private LocalDateTime postModifiedAt;
    }

    @Getter
    @Setter
    public static class postPatchDto{
        private String subject;
        private String title;
        private String content;
        private String locationY;

        private String locationX;
        private List<String> image;
        private List<String> tag;
    }
}
