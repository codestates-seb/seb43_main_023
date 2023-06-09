package com.mainproject.seb43_main_023.domain.service;

import com.mainproject.seb43_main_023.domain.entity.Comment;
import com.mainproject.seb43_main_023.domain.repository.CommentRepository;
import com.mainproject.seb43_main_023.global.exception.BusinessLogicException;
import com.mainproject.seb43_main_023.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

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
    public List<Comment> findComments(long postId) {
        return commentRepository.findByPostId(postId);
    }
    public Comment findVerifiedComment(long commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        Comment findComment = optionalComment.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        return findComment;
    }
    @Transactional
    public Comment voteComment(long commentId,long memberId) {
        Comment comment = findVerifiedComment(commentId);
        Set<Long> voteList = new HashSet<>(comment.getVoteList());
        Long count = comment.getVoteCount();
        if (voteList.contains(memberId)) {
            voteList.remove(memberId);
            count--;
        } else {
            voteList.add(memberId);
            count++;
        }
        comment.setVoteCount(count);
        comment.setVoteList(new ArrayList<>(voteList));
        return commentRepository.save(comment);
    }
}
