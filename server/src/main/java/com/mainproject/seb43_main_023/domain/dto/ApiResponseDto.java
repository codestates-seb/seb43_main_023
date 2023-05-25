package com.mainproject.seb43_main_023.domain.dto;

import lombok.*;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.validation.ObjectError;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ApiResponseDto {

    private static final String STATUS_SUCCESS = "success";
    private static final String STATUS_FAIL = "fail";
    private static final String STATUS_ERROR = "error";

    private  <T, E> ResponseEntity<?> get(String status, @Nullable String message, @Nullable T data, @Nullable E errors,
                                          @Nullable Long page, @Nullable Integer size, @Nullable Long total) {

        if (status.equals(STATUS_SUCCESS)) {
            if (page != null && size != null && total != null) {
                return new ResponseEntity<>(PagedBody.builder()
                        .status(status)
                        .message(message)
                        .data(data != null ? data : Collections.emptyList())
                        .page(page)
                        .size(size)
                        .total(total)
                        .build(),
                        HttpStatus.OK);
            }
            //succeededBody
            else {
                return new ResponseEntity<>(SucceededBody.builder()
                        .status(status)
                        .message(message)
                        .data(data)
                        .build(),
                        HttpStatus.OK);
            }
        }
        else if (status.equals(STATUS_FAIL)) {
            return new ResponseEntity<>(FailedBody.builder()
                    .status(status)
                    .message(message)
                    .errors(errors)
                    .build(),
                    HttpStatus.OK);
        }
        else if (status.equals(STATUS_ERROR)) {
            return new ResponseEntity<>(ErroredBody.builder()
                    .status(status)
                    .message(message)
                    .build(),
                    HttpStatus.OK);
        }

        else {
            throw new RuntimeException("Api Response Error");
        }
    }
    public <T> ResponseEntity<?> success(String message, T data) {
        return get(STATUS_SUCCESS, message, data, null, null, null, null);
    }
    public <T> ResponseEntity<?> success(T data) {
        return get(STATUS_SUCCESS, null, data, null, null, null, null);
    }

    public <T> ResponseEntity<?> success() {
        return get(STATUS_SUCCESS, null, null, null, null, null, null);
    }

    public <T> ResponseEntity<?> pagination(T data, Long page, Integer size, Long total) {
        return get(STATUS_SUCCESS, null, data, null, page, size, total);
    }
    public <T> ResponseEntity<?> pagination(T data, Pageable pageable, Long total) {
        return get(STATUS_SUCCESS, null, data, null, pageable.getOffset(), pageable.getPageSize(), total);
    }
    public <T> ResponseEntity<?> fail(String message) {
        return get(STATUS_FAIL, message, null, null, null, null, null);
    }
    public <E> ResponseEntity<?> fail(String message, E errors) {
        return get(STATUS_FAIL, message, null, errors, null, null, null);
    }
    public ResponseEntity<?> fail(Errors errors) {
        List<FieldError> fieldErrorList = errors.getAllErrors().stream().map(FieldError::new).collect(Collectors.toList());
        return fail(null, fieldErrorList);
    }

    public ResponseEntity<?> fail(BindingResult bindingResult) {
        return fail((Errors) bindingResult);
    }

    public <E> ResponseEntity<?> fail(E errors) {
        return get(STATUS_FAIL, null, null, errors, null, null, null);
    }

    public <T> ResponseEntity<?> error(String message) {
        return get(STATUS_ERROR, message, null, null, null, null, null);
    }
    @Builder
    @Setter
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class SucceededBody<T> {

        private String status;
        private String message;
        private T data;
    }
    @Builder
    @Setter
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PagedBody<T> {

        private String status;
        private String message;
        private T data;
        private Long page;
        private int size;
        private Long total;
    }
    @Builder
    @Setter
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class FailedBody<E> {

        private String status;
        private String message;
        private E errors;
    }
    @Builder
    @Setter
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ErroredBody {

        private String status;
        private String message;
    }
    @Builder
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class FieldError {

        private String field;
        private String message;

        public FieldError(ObjectError objectError) {
            this.field = objectError.getObjectName();
            this.message = objectError.getDefaultMessage();
        }
    }
}

