package com.mainproject.seb43_main_023.post.controller;

import com.mainproject.seb43_main_023.post.dto.PostDto;
import com.mainproject.seb43_main_023.post.entity.Post;
import com.mainproject.seb43_main_023.post.mapper.PostMapper;
import com.mainproject.seb43_main_023.post.service.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

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
//    @PatchMapping("/{post-id}")
//    public ResponseEntity patchPost(@RequestBody @Valid PostDto.postPatchDto postPatchDto,
//                                    @PathVariable("post-id") long postId){
//        Post post = mapper.postPatchToPost(postPatchDto);
//        post.
//    }
}
