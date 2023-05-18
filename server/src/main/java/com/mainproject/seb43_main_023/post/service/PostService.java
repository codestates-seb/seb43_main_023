package com.mainproject.seb43_main_023.post.service;

import com.mainproject.seb43_main_023.exception.BusinessLogicException;
import com.mainproject.seb43_main_023.exception.ExceptionCode;
import com.mainproject.seb43_main_023.member.entity.Member;
import com.mainproject.seb43_main_023.member.service.MemberService;
import com.mainproject.seb43_main_023.post.entity.Post;
import com.mainproject.seb43_main_023.post.repository.PostRepository;
import org.springframework.data.annotation.Transient;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

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
        post.addMember(post,member);
        return postRepository.save(post);
    }
    public Post updatePost(Post post, long memberId){
        Post findPost = verifyPost(post.getPostId());
        if(findPost.getMemberId().equals(memberId)) {
            Optional.ofNullable(post.getSubject()).ifPresent(findPost::setSubject);
            Optional.ofNullable(post.getTitle()).ifPresent(findPost::setTitle);
            Optional.ofNullable(post.getContent()).ifPresent(findPost::setContent);
            Optional.ofNullable(post.getImage()).ifPresent(findPost::setImage);
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
                (title, subject, PageRequest.of(page, 8,Sort.by("postId").descending()));
    }
    @Transient
    public Post votePost(long postId, long memberId){
        Post post = verifyPost(postId);
        Set<Long> voteList = new HashSet<>(post.getVoteList());
        long count = post.getVoteCount();
        if (voteList.contains(memberId)) {
            voteList.remove(memberId);
            count--;
        } else {
            voteList.add(memberId);
            count++;
        }
        post.setVoteCount(count);
        post.setVoteList(new ArrayList<>(voteList));
        return postRepository.save(post);
    }
    public Post verifyPost(long postId){
        return postRepository.findById(postId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
    }
}
