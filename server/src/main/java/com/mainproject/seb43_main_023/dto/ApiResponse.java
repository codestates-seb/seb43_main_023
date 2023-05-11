package com.mainproject.seb43_main_023.dto;

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
public class ApiResponse {

    private static final String STATUS_SUCCESS = "success";
    private static final String STATUS_FAIL = "fail";
    private static final String STATUS_ERROR = "error";

    private  <T, E> ResponseEntity<?> get(String status, @Nullable String message, @Nullable T data, @Nullable E errors,
                                          @Nullable Long page, @Nullable Integer size, @Nullable Long total) {

        if (status.equals(STATUS_SUCCESS)) {
            //pagedBody
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

    /**
     * <p>성공 응답을 반환합니다. 첫 번째 인자는 message, 두 번째 인자는 data 에 표시됩니다.</p>
     * <pre>
     *  {
     *      "status" : "success",
     *      "message" : "success message",
     *      "data" : "배열 또는 단일 데이터"
     *  }
     * </pre>
     *
     * @param message   응답 바디 message 필드에 포함될 정보
     * @param data      응답 바디 data 필드에 포함될 정보
     * @return          응답 객체
     */
    public <T> ResponseEntity<?> success(String message, T data) {
        return get(STATUS_SUCCESS, message, data, null, null, null, null);
    }

    /**
     * <p>성공 응답을 반환합니다. 전달된 인자는 data 에 표시됩니다.</p>
     * <pre>
     *  {
     *      "status" : "success",
     *      "message" : null,
     *      "data" : "배열 또는 단일 데이터"
     *  }
     * </pre>
     *
     * @param data      응답 바디 data 필드에 포함될 정보
     * @return          응답 객체
     */
    public <T> ResponseEntity<?> success(T data) {
        return get(STATUS_SUCCESS, null, data, null, null, null, null);
    }

    /**
     * <p>성공 응답을 반환합니다.</p>
     * <pre>
     *  {
     *      "status" : "success",
     *      "message" : null,
     *      "data" : null
     *  }
     * </pre>
     *
     * @return          응답 객체
     */
    public <T> ResponseEntity<?> success() {
        return get(STATUS_SUCCESS, null, null, null, null, null, null);
    }

    /**
     * <p>페이지네이션 정보를 포함한 성공 응답을 반환합니다.</p>
     * <pre>
     *     {
     *         "status" : "success",
     *         "message" : null,
     *         "data" : [{data1}, {data2} ...],
     *         "page" : 1,
     *         "size" : 10,
     *         "total" : 100
     *     }
     * </pre>
     *
     * @param data      응답 바디 data 필드에 포함될 정보
     * @param page      응답 바디 page 필드에 포함될 정보
     * @param size      응답 바디 size 필드에 포함될 정보
     * @param total     응답 바디 total 필드에 포함될 정보
     * @return          응답 객체
     */
    public <T> ResponseEntity<?> pagination(T data, Long page, Integer size, Long total) {
        return get(STATUS_SUCCESS, null, data, null, page, size, total);
    }

    /**
     * <p>페이지네이션 정보를 포함한 성공 응답을 반환합니다.</p>
     * <pre>
     *     {
     *         "status" : "success",
     *         "message" : null,
     *         "data" : [{data1}, {data2} ... ],
     *         "page" : 1,
     *         "size" : 10,
     *         "total" : 100
     *     }
     * </pre>
     *
     * @param data      응답 바디 data 필드에 포함될 정보
     * @param pageable  응답 바디 page, size 필드에 포함될 정보를 가진 Pageable 객체
     * @param total     응답 바디 total 필드에 포함될 정보
     * @return          응답 객체
     */
    public <T> ResponseEntity<?> pagination(T data, Pageable pageable, Long total) {
        return get(STATUS_SUCCESS, null, data, null, pageable.getOffset(), pageable.getPageSize(), total);
    }

    /**
     * <p>오류 발생 시 실패 응답을 반환합니다.</p>
     * <pre>
     *     {
     *         "status" : "fail",
     *         "message" : "fail message",
     *         "errors" : null
     *     }
     * </pre>
     *
     * @param message   응답 바디 message 필드에 포함될 정보
     * @return          응답 객체
     */
    public <T> ResponseEntity<?> fail(String message) {
        return get(STATUS_FAIL, message, null, null, null, null, null);
    }

    /**
     * <p>필드 에러로 인한 실패 응답을 반환합니다.</p>
     * <pre>
     *     {
     *         "status" : "fail",
     *         "message" : fail message,
     *         "errors" : [{error data1}, {error data2} ... ]
     *     }
     * </pre>
     *
     * @param message   응답 바디 message 필드에 포함될 정보
     * @param errors    응답 바디 errors 필드에 포함될 정보
     * @return          응답 객체
     */
    public <E> ResponseEntity<?> fail(String message, E errors) {
        return get(STATUS_FAIL, message, null, errors, null, null, null);
    }

    /**
     * <p>필드 에러로 인한 실패 응답을 반환합니다.</p>
     * <pre>
     *     {
     *         "status" : "fail",
     *         "message" : fail message,
     *         "errors" : [{error data1}, {error data2} ... ]
     *     }
     * </pre>
     *
     * @param errors    응답 바디 errors 필드에 포함될 정보
     * @return          응답 객체
     */
    public ResponseEntity<?> fail(Errors errors) {
        List<FieldError> fieldErrorList = errors.getAllErrors().stream().map(FieldError::new).collect(Collectors.toList());
        return fail(null, fieldErrorList);
    }

    /**
     * <p>필드 에러로 인한 실패 응답을 반환합니다.</p>
     * <pre>
     *     {
     *         "status" : "fail",
     *         "message" : fail message,
     *         "errors" : [{error data1}, {error data2} ... ]
     *     }
     * </pre>
     *
     * @param bindingResult     응답 바디 errors 필드에 포함될 정보를 가진 BindingResult 객체
     * @return                  응답 객체
     */
    public ResponseEntity<?> fail(BindingResult bindingResult) {
        return fail((Errors) bindingResult);
    }

    /**
     * <p>필드 에러로 인한 실패 응답을 반환합니다.</p>
     * <pre>
     *     {
     *         "status" : "fail",
     *         "message" : null,
     *         "errors" : [{error data1}, {error data2} ... ]
     *     }
     * </pre>
     *
     * @param errors    응답 바디 errors 필드에 포함될 정보
     * @return          응답 객체
     */
    public <E> ResponseEntity<?> fail(E errors) {
        return get(STATUS_FAIL, null, null, errors, null, null, null);
    }

    /**
     * <p>예외 발생 시 에러 응답을 반환합니다.</p>
     * <pre>
     *     {
     *         "status" : "error",
     *         "message" : "custom error message"
     *     }
     * </pre>
     *
     * @param message   응답 바디 message 필드에 포함될 정보
     * @return          응답 객체
     */
    public <T> ResponseEntity<?> error(String message) {
        return get(STATUS_ERROR, message, null, null, null, null, null);
    }

    /**
     * <p>성공 응답 객체의 바디</p>
     */
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

    /**
     * <p>페이지네이션 정보가 포함된 응답 객체의 바디</p>
     */
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

    /**
     * <p>실패 응답 객체의 바디</p>
     */
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

    /**
     * <p>오류 응답 객체의 바디</p>
     */
    @Builder
    @Setter
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ErroredBody {

        private String status;
        private String message;
    }

    /**
     * <p>필드 에러 출력에 사용할 객체</p>
     */
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

