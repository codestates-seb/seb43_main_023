package com.mainproject.seb43_main_023.redis.entity;

import com.mainproject.seb43_main_023.redis.config.ExpireTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.Id;
import java.util.Collection;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@RedisHash(value = "refresh", timeToLive = ExpireTime.REFRESH_TOKEN_EXPIRE_TIME_FOR_REDIS)
public class RefreshToken {
    @Id
    private String id;
    private String ip;
    private Collection<? extends GrantedAuthority> authorities;

    @Indexed
    private String refreshToken;
}
