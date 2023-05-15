package com.mainproject.seb43_main_023.post.entity;


import com.mainproject.seb43_main_023.audit.Auditable;
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
public class Post extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    @Column(nullable = false)
    private String subject;

    @Column(nullable = false)
    private String title;

    @Column(length = 3000,nullable = false)
    private String content;

    @Column
    private long viewCount = 0;

    @Column
    private long voteCount = 0;

    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime modifiedAt = createdAt;

    @Column(nullable = false)
    private Long memberId;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String nickname;

    @ElementCollection
    private List<Long> voteList = new ArrayList<>();

    @ElementCollection
    private List<String> image = new ArrayList<>();

    public Post(Post post,Long memberId, String nickname, String email){
        post.setMemberId(memberId);
        post.setNickname(nickname);
        post.setEmail(email);
    }
}
