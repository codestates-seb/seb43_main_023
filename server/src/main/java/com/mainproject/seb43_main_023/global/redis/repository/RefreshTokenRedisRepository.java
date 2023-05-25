package com.mainproject.seb43_main_023.global.redis.repository;

import com.mainproject.seb43_main_023.global.redis.entity.RefreshToken;
import org.springframework.data.repository.CrudRepository;

public interface RefreshTokenRedisRepository extends CrudRepository<RefreshToken, Long> {
    RefreshToken findByRefreshToken(String refreshToken);
}
