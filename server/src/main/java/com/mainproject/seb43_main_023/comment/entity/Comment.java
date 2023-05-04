package com.mainproject.seb43_main_023.comment.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long commentId;
    @Column(nullable = false)
    private String content;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Comment.CommentStatus commentStatus = CommentStatus.COMMENT_REGISTERED;
    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    @Column(nullable = false)
    private LocalDateTime modifiedAt = LocalDateTime.now();

    public enum CommentStatus {
        COMMENT_REGISTERED("댓글 등록"),
        COMMENT_DELETED("댓글 삭제");

        @Getter
        private String commentStatus;

        CommentStatus(String commentStatus) {
            this.commentStatus = commentStatus;
        }
    }
}
