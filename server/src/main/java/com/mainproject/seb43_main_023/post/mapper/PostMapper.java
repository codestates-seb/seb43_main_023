package com.mainproject.seb43_main_023.post.mapper;

import com.mainproject.seb43_main_023.post.dto.PostDto;
import com.mainproject.seb43_main_023.post.entity.Post;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PostMapper {
    Post postPostToPost(PostDto.postPostDto postDto);
    Post postPatchToPost(PostDto.postPatchDto patchDto);
    PostDto.postResponseDto postToPostResponse(Post post);
    List<PostDto.postsResponseDto> postsToPostDto(List<Post> posts);

}
