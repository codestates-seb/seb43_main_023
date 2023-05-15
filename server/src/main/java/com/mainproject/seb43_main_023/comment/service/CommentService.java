package com.mainproject.seb43_main_023.comment.service;

import com.mainproject.seb43_main_023.comment.entity.Comment;
import com.mainproject.seb43_main_023.comment.repository.CommentRepository;
import com.mainproject.seb43_main_023.exception.BusinessLogicException;
import com.mainproject.seb43_main_023.exception.ExceptionCode;
import com.mainproject.seb43_main_023.post.entity.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    public Comment createComment(Comment comment) {
        return commentRepository.save(comment);
    }
    public Comment updateComment(Comment comment) {
        Comment findComment = findVerifiedComment(comment.getCommentId());
        Optional.ofNullable(comment.getContent())
                .ifPresent((content -> findComment.setContent(content)));
        return commentRepository.save(findComment);
    }
    public void deleteComment(long commentId) {
        Comment findComment = findVerifiedComment(commentId);
        commentRepository.delete(findComment);
    }

    public Comment findVerifiedComment(long commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        Comment findComment = optionalComment.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        return findComment;
    }
    public Comment voteComment(long commentId) {
        Comment comment = findVerifiedComment(commentId);
        if(comment.getVoteList().contains(comment.getMemberId())){
            comment.setVoteCount(comment.getVoteCount() - 1);
            comment.getVoteList().remove(comment.getMemberId());
        }
        else {
            comment.setVoteCount(comment.getVoteCount() + 1);
            comment.getVoteList().add(comment.getMemberId());
        }
        return commentRepository.save(comment);
    }
}
