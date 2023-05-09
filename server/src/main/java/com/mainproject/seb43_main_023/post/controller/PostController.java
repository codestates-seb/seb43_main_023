package com.mainproject.seb43_main_023.post.controller;

import com.mainproject.seb43_main_023.post.dto.PostDto;
import com.mainproject.seb43_main_023.post.entity.Post;
import com.mainproject.seb43_main_023.post.mapper.PostMapper;
import com.mainproject.seb43_main_023.post.repository.PostRepository;
import com.mainproject.seb43_main_023.post.service.PostService;
import lombok.Getter;
import lombok.Value;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/posts")
@Validated
public class PostController {
    private final PostService postService;
    private final PostMapper mapper;

    public PostController(PostService postService, PostMapper mapper) {
        this.postService = postService;
        this.mapper = mapper;
    }
    @PostMapping("/{member-id}")//게시글 작성(member-id 임시로사용)
    public ResponseEntity postPost(@RequestBody @Valid PostDto.postPostDto postPostDto,
                                   @PathVariable("member-id") long memberId){
        Post post = mapper.postPostToPost(postPostDto);
        Post createdPost = postService.createPost(post,memberId);
        return new ResponseEntity((mapper.postToPostResponse(createdPost)), HttpStatus.CREATED);
    }
    @PatchMapping("/{post-id}/{member-id}")//게시글 수정(member-id 임시로사용)
    public ResponseEntity patchPost(@RequestBody @Valid PostDto.postPatchDto postPatchDto,
                                    @PathVariable("post-id") long postId,
                                    @PathVariable("member-id") long memberId){
        Post post = mapper.postPatchToPost(postPatchDto);
        post.setPostId(postId);
        Post updatedPost = postService.updatePost(post,memberId);

        return new ResponseEntity((mapper.postToPostResponse(updatedPost)),HttpStatus.OK);
    }
    @GetMapping("/{post-id}")// 게시글 조회
    public ResponseEntity getPost(@PathVariable("post-id") long postId){
        Post findPost = postService.findPost(postId);
        return new ResponseEntity((mapper.postToPostResponse(findPost)),HttpStatus.OK);
    }
    @DeleteMapping("/{post-id}/{member-id}")// 게시글삭제(member-id 임시로사용)
    public ResponseEntity deletePost(@PathVariable("post-id") long postId,
                                     @PathVariable("member-id") long memberId){
        postService.removePost(postId,memberId);
        return new ResponseEntity(HttpStatus.OK);
    }
    @GetMapping// 게시글 목록조회 + 게시글 검색기능 추가
    public ResponseEntity searchPosts(@RequestParam(value = "title",defaultValue = "") String title,
                                      @RequestParam(value = "subject",defaultValue = "") String subject,
                                      @Positive @RequestParam(defaultValue = "1") int page) {
        Page<Post> posts = postService.searchPosts(page-1,title,subject);
        List<Post> content = posts.getContent();

        return new ResponseEntity(mapper.postsToPostDto(content),HttpStatus.OK);
    }
    @PatchMapping("/{post-id}/vote/{member-id}")// 게시글 추천 (한번누르면 추천 다시누르면 추천취소)(member-id 임시로사용)
    public ResponseEntity votePost(@PathVariable("post-id") long postId,
                                   @PathVariable("member-id") long memberId){
        Post post = postService.votePost(postId,memberId);
        return new ResponseEntity(mapper.postToPostResponse(post),HttpStatus.OK);
    }
}
