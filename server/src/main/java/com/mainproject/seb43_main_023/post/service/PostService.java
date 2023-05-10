package com.mainproject.seb43_main_023.post.service;

import com.mainproject.seb43_main_023.exception.BusinessLogicException;
import com.mainproject.seb43_main_023.exception.ExceptionCode;
import com.mainproject.seb43_main_023.member.entity.Member;
import com.mainproject.seb43_main_023.member.service.MemberService;
import com.mainproject.seb43_main_023.post.entity.Post;
import com.mainproject.seb43_main_023.post.repository.PostRepository;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final MemberService memberService;

    public PostService(PostRepository postRepository,
                       MemberService memberService) {
        this.postRepository = postRepository;
        this.memberService = memberService;
    }
    public Post createPost(Post post, long memberId){
        Member member = memberService.findVerifiedMember(memberId);
        post.setMemberId(memberId);
        post.setNickname(member.getNickname());
        post.setEmail(member.getEmail());
        return postRepository.save(post);
    }
    public Post updatePost(Post post, long memberId){
        Post findPost = verifyPost(post.getPostId());
        if(memberId == findPost.getMemberId()) {
            Optional.ofNullable(post.getSubject()).ifPresent(subject -> findPost.setSubject(subject));
            Optional.ofNullable(post.getTitle()).ifPresent(title -> findPost.setTitle(title));
            Optional.ofNullable(post.getContent()).ifPresent(content -> findPost.setContent(content));
            Optional.ofNullable(post.getImage()).ifPresent(image -> findPost.setImage(image));
            findPost.setModifiedAt(LocalDateTime.now());
            return postRepository.save(findPost);
        }
        else throw new BusinessLogicException(ExceptionCode.NO_PERMISSION);
    }
    public void removePost(long postId, long memberId){
        Post deletePost = verifyPost(postId);
        if(memberId == deletePost.getMemberId()) {
            postRepository.delete(deletePost);
        } else throw new BusinessLogicException(ExceptionCode.NO_PERMISSION);
    }
    public Post findPost(long postId){
        Post post = verifyPost(postId);
        post.setViewCount(post.getViewCount()+1);
        return postRepository.save(post);
    }
    public Page<Post> searchPosts(int page,String title,String subject){
        return postRepository.findByTitleContainingAndSubjectContaining
                (title, subject, PageRequest.of(page, 10,Sort.by("postId").descending()));
    }
    public Post votePost(long postId, long memberId){
        Post post = verifyPost(postId);
        if(post.getVoteList().contains(memberId)){
            post.setVoteCount(post.getVoteCount()-1);
            post.getVoteList().remove(memberId);
        }
        else {
            post.setVoteCount(post.getVoteCount()+1);
            post.getVoteList().add(memberId);
        }
        return postRepository.save(post);
    }
    public Post verifyPost(long postId){
        return postRepository.findById(postId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
    }
}
