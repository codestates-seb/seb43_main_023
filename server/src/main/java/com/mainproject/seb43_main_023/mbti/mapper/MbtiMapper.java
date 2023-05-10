package com.mainproject.seb43_main_023.mbti.mapper;

import com.mainproject.seb43_main_023.mbti.dto.MbtiDto;
import com.mainproject.seb43_main_023.mbti.entity.Mbti;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MbtiMapper {
    MbtiDto.mbtiResponseDto mbtiToMbtiResponse(Mbti mbti);
}
