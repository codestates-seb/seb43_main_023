package com.mainproject.seb43_main_023.domain.dto;

import com.mainproject.seb43_main_023.domain.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.ArrayList;
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
    }

    @Getter
    @Setter
    public static class postResponseDto {
        private long postId;
        private Member member;
        private String subject;
        private String title;
        private String content;
        private String placeName;
        private String locationY;

        private String locationX;
        private List<String> image;
        private List<String> tag;
        private long viewCount;
        private long voteCount;
        private List<Long> voteList = new ArrayList<>();
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
