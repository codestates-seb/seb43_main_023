package com.mainproject.seb43_main_023.comment.mapper;

import com.mainproject.seb43_main_023.comment.dto.CommentDto;
import com.mainproject.seb43_main_023.comment.entity.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CommentMapper {
    Comment commentPostDtoToComment(CommentDto.CommentPostDto commentPostDto);
    Comment commentPatchDtoToComment(CommentDto.CommentPatchDto commentPatchDto);
    CommentDto.CommentResponseDto commentToCommentResponseDto(Comment comment);
}
