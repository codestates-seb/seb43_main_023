package com.mainproject.seb43_main_023.mbti.dto;

import lombok.Getter;
import lombok.Setter;

public class MbtiDto {
    @Getter
    @Setter
    public static class mbtiResponseDto{
    private String mbti;
    private String img;
    private String place;
    private String description;
    private String placeImg;
    }
}