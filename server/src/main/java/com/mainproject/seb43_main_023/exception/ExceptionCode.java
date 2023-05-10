package com.mainproject.seb43_main_023.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    POST_NOT_FOUND(HttpStatus.NOT_FOUND,"게시물을 찾을 수 없습니다."),
    MBTI_NOT_FOUND(HttpStatus.NOT_FOUND,"잘못된 MBTI 입니다."),
    NO_PERMISSION(HttpStatus.FORBIDDEN, "권한이 없습니다.");

    @Getter
    private int status;
    @Getter
    private HttpStatus httpStatus;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
    ExceptionCode(HttpStatus httpStatus, String message) {
        this.httpStatus = httpStatus;
        this.message = message;
    }
}
