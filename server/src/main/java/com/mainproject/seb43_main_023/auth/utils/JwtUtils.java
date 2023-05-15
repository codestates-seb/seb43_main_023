package com.mainproject.seb43_main_023.auth.utils;

import com.mainproject.seb43_main_023.auth.jwt.JwtTokenProvider;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

public class JwtUtils {
    private final JwtTokenProvider jwtTokenProvider;

    public JwtUtils(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public Map<String, Object> getJwsClaimsFromRequest(HttpServletRequest request) {
        String token = jwtTokenProvider.resolveToken(request);
        return jwtTokenProvider.parseClaims(token);
    }
}
