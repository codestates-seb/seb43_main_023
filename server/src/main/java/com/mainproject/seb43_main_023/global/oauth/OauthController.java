package com.mainproject.seb43_main_023.global.oauth;

import com.mainproject.seb43_main_023.domain.dto.ApiResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class OauthController {
    private final ApiResponseDto response;
    private final GoogleOauth googleOauth;
    private final NaverOauth naverOauth;

    @PostMapping("/auth/google")
    public ResponseEntity googleLogin(@RequestBody String accessToken) throws IOException {
        GetSocialOAuthRes getSocialOAuthRes = googleOauth.oAuthLogin(accessToken);

        return response.success(getSocialOAuthRes);
    }

    @PostMapping("/auth/naver")
    public ResponseEntity naverLogin(@RequestBody String accessToken) throws IOException {
        GetSocialOAuthRes getSocialOAuthRes = naverOauth.oAuthLogin(accessToken);

        return response.success(getSocialOAuthRes);
    }
}
