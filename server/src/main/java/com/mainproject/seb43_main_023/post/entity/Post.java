package com.mainproject.seb43_main_023.post.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;
    private String subject;
    private String title;
    private String content;
    private long viewCount = 0;
    private long voteCount = 0;
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime modifiedAt = LocalDateTime.now();
    private Long memberId;
    private String nickname;
    @ElementCollection
    private List<Long> voteList = new ArrayList<>();
}
