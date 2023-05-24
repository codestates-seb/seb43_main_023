package com.mainproject.seb43_main_023.oauth;

import com.mainproject.seb43_main_023.member.dto.MemberDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class GetSocialOAuthRes {
    MemberDto.TokenInfo tokenInfo;
    private String accessToken;
    private String email;
    private String name;
    private String password;
}
