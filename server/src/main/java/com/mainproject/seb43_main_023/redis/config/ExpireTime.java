package com.mainproject.seb43_main_023.redis.config;

public class ExpireTime {
    public static final long ACCESS_TOKEN_EXPIRE_TIME = 30 * 60 * 1000L;                //30분
    public static final long REFRESH_TOKEN_EXPIRE_TIME = 7 * 24 * 60 * 60 * 1000L;      //7일
    public static final long REFRESH_TOKEN_EXPIRE_TIME_FOR_REDIS = REFRESH_TOKEN_EXPIRE_TIME / 1000L;

}
