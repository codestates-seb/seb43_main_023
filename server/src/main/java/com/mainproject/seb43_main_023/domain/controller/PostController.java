package com.mainproject.seb43_main_023.domain.controller;

import com.mainproject.seb43_main_023.domain.dto.PostDto;
import com.mainproject.seb43_main_023.domain.entity.Post;
import com.mainproject.seb43_main_023.domain.mapper.PostMapper;
import com.mainproject.seb43_main_023.domain.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/posts")
@Validated
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;
    private final PostMapper mapper;

    @PostMapping("/{member-id}")
    public ResponseEntity postPost(@RequestBody @Valid PostDto.postPostDto postPostDto,
                                   @PathVariable("member-id") long memberId){
        Post post = mapper.postPostToPost(postPostDto);
        Post createdPost = postService.createPost(post,memberId);
        return new ResponseEntity((mapper.postToPostResponse(createdPost)), HttpStatus.CREATED);
    }
    @PatchMapping("/{post-id}/{member-id}")
    public ResponseEntity patchPost(@RequestBody @Valid PostDto.postPatchDto postPatchDto,
                                    @PathVariable("post-id") long postId,
                                    @PathVariable("member-id") long memberId){
        Post post = mapper.postPatchToPost(postPatchDto);
        post.setPostId(postId);
        Post updatedPost = postService.updatePost(post,memberId);

        return new ResponseEntity((mapper.postToPostResponse(updatedPost)),HttpStatus.OK);
    }
    @GetMapping("/{post-id}")
    public ResponseEntity getPost(@PathVariable("post-id") long postId){
        Post findPost = postService.findPost(postId);
        return new ResponseEntity((mapper.postToPostResponse(findPost)),HttpStatus.OK);
    }
    @DeleteMapping("/{post-id}/{member-id}")
    public ResponseEntity deletePost(@PathVariable("post-id") long postId,
                                     @PathVariable("member-id") long memberId){
        postService.removePost(postId,memberId);
        return new ResponseEntity(HttpStatus.OK);
    }
    @GetMapping
    public  ResponseEntity searchPosts(@RequestParam(value = "title",defaultValue = "") String title,
                                        @RequestParam(value = "subject",defaultValue = "") String subject,
                                        @RequestParam(value = "date",defaultValue = "") String date,
                                        @Positive @RequestParam(defaultValue = "1") int page,
                                        @Positive @RequestParam(defaultValue = "8") int size){
        Page<Post> posts = postService.searchPostsMonth(page-1,size,title,subject,date);
        List<Post> content = posts.getContent();

        return new ResponseEntity(mapper.postsToPostDto(content),HttpStatus.OK);
    }
    @PatchMapping("/{post-id}/vote/{member-id}")
    public ResponseEntity votePost(@PathVariable("post-id") long postId,
                                   @PathVariable("member-id") long memberId){
        Post post = postService.votePost(postId,memberId);
        return new ResponseEntity(mapper.postToPostResponse(post),HttpStatus.OK);
    }
}
