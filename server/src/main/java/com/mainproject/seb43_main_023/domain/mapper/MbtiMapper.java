package com.mainproject.seb43_main_023.domain.mapper;

import com.mainproject.seb43_main_023.domain.dto.MbtiDto;
import com.mainproject.seb43_main_023.domain.entity.Mbti;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MbtiMapper {
    MbtiDto.mbtiResponseDto mbtiToMbtiResponse(Mbti mbti);
}
