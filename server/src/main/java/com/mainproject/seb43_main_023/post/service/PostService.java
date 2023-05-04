package com.mainproject.seb43_main_023.post.service;

import com.mainproject.seb43_main_023.member.entity.Member;
import com.mainproject.seb43_main_023.member.service.MemberService;
import com.mainproject.seb43_main_023.post.entity.Post;
import com.mainproject.seb43_main_023.post.repository.PostRepository;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

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
        return postRepository.save(post);
    }
}
