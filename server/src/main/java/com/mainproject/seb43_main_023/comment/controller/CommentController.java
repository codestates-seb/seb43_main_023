package com.mainproject.seb43_main_023.comment.controller;

import com.mainproject.seb43_main_023.comment.dto.CommentDto;
import com.mainproject.seb43_main_023.comment.entity.Comment;
import com.mainproject.seb43_main_023.comment.mapper.CommentMapper;
import com.mainproject.seb43_main_023.comment.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/posts")
@Validated
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;
    private final CommentMapper commentMapper;
    @PostMapping("/{post-id}/comments")
    public ResponseEntity postComment(@RequestBody @Valid CommentDto.CommentPostDto commentPostDto) {
        Comment comment = commentMapper.commentPostDtoToComment(commentPostDto);
        Comment createdComment = commentService.createComment(comment);
        return new ResponseEntity<>(commentMapper.commentToCommentResponseDto(createdComment), HttpStatus.CREATED);
    }
    @PatchMapping("/{post-id}/comments/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("comment-id") @Positive long commentId,
                                       @RequestBody @Valid CommentDto.CommentPatchDto commentPatchDto) {
        Comment comment = commentMapper.commentPatchDtoToComment(commentPatchDto);
        comment.setCommentId(commentId);
        Comment updatedComment = commentService.updateComment(comment);
        return new ResponseEntity<>(commentMapper.commentToCommentResponseDto(updatedComment), HttpStatus.OK);
    }
    @GetMapping("/{post-id}/comments/{comment-id}")
    public ResponseEntity getComment(@PathVariable("comment-id") long commentId) {
        Comment verifiedComment = commentService.findVerifiedComment(commentId);
        return new ResponseEntity<>(commentMapper.commentToCommentResponseDto(verifiedComment), HttpStatus.OK);
    }
    @DeleteMapping("/{post-id}/comments/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("comment-id") long commentId) {
        commentService.deleteComment(commentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @PatchMapping("/{post-id}/comments/{comment-id}/vote/{member-id}")
    public ResponseEntity voteComment(@PathVariable("comment-id") long commentId,
                                      @PathVariable("member-id") long memberId){
        Comment comment = commentService.voteComment(commentId, memberId);
        return new ResponseEntity(commentMapper.commentToCommentResponseDto(comment),HttpStatus.OK);
    }
}
