package com.mainproject.seb43_main_023.post.mapper;

import com.mainproject.seb43_main_023.member.entity.Member;
import com.mainproject.seb43_main_023.member.service.MemberService;
import com.mainproject.seb43_main_023.post.dto.PostDto;
import com.mainproject.seb43_main_023.post.entity.Post;
import com.mainproject.seb43_main_023.post.repository.PostRepository;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PostMapper {
    Post postPostToPost(PostDto.postPostDto postDto);
    Post postPatchToPost(PostDto.postPatchDto patchDto);
    default PostDto.postResponseDto postToPostResponse(Post post,Member member){

        PostDto.postResponseDto responseDto = new PostDto.postResponseDto();
        responseDto.setPostId(post.getPostId());
        responseDto.setMemberId(post.getMemberId());
        responseDto.setCreatedAt(post.getCreatedAt());
        responseDto.setModifiedAt(post.getModifiedAt());
        responseDto.setContent(post.getContent());
        responseDto.setSubject(post.getSubject());
        responseDto.setImage(post.getImage());
        responseDto.setTitle(post.getTitle());
        responseDto.setViewCount(post.getViewCount());
        responseDto.setVoteCount(post.getVoteCount());
        responseDto.setNickname(member.getNickname());
        responseDto.setEmail(member.getEmail());
        return responseDto;
    }
    List<PostDto.postsResponseDto> postsToPostDto(List<Post> posts);

}
