package com.mainproject.seb43_main_023.domain.entity;

import com.mainproject.seb43_main_023.global.audit.Auditable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Comment extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long commentId;
    @Column(nullable = false)
    private String content;
    @Column(nullable = false)
    private long voteCount = 0;
    @Column(nullable = false)
    private String nickname;
    @Column(nullable = false)
    private long memberId;
    @Column(nullable = false)
    private long postId;
    @ElementCollection
    private List<Long> voteList = new ArrayList<>();
}