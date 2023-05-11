package com.mainproject.seb43_main_023.config;

import com.mainproject.seb43_main_023.auth.filter.JwtAuthenticationFilter;
import com.mainproject.seb43_main_023.auth.filter.JwtVerificationFilter;
import com.mainproject.seb43_main_023.auth.handler.MemberAccessDeniedHandler;
import com.mainproject.seb43_main_023.auth.handler.MemberAuthenticationEntryPoint;
import com.mainproject.seb43_main_023.auth.handler.MemberAuthenticationFailureHandler;
import com.mainproject.seb43_main_023.auth.handler.MemberAuthenticationSuccessHandler;
import com.mainproject.seb43_main_023.auth.jwt.JwtTokenProvider;
import com.mainproject.seb43_main_023.auth.utils.CustomAuthorityUtils;
import com.mainproject.seb43_main_023.auth.utils.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@EnableWebSecurity
@RequiredArgsConstructor
@Configuration
public class WebSecurityConfigure {
    private final JwtTokenProvider jwtTokenProvider;
    private final CustomAuthorityUtils authorityUtils;

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, HttpSecurity builder) throws Exception {
        //httpBasic, csrf, formLogin, rememberMe, logout, session disable
        http.headers().frameOptions().sameOrigin()
                .and()
                .httpBasic().disable()
                .csrf().disable()
                .cors(Customizer.withDefaults())
                .formLogin().disable()
                .rememberMe().disable()
                .logout().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                .accessDeniedHandler(new MemberAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer());


        // 요청에 대한 권한 설정
        http.authorizeRequests()
                .antMatchers("/members/signin", "/members/signup", "/members/reissue").permitAll()
                .antMatchers(HttpMethod.PATCH, "/members/**").hasRole("USER")
                .antMatchers(HttpMethod.GET, "/members/**").hasRole("ADMIN")
                .antMatchers(HttpMethod.DELETE, "/members/**").hasRole("USER")
                .anyRequest().permitAll();

        // jwt filter 설정
        AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);
        http.addFilterBefore(new JwtAuthenticationFilter(authenticationManager, jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOrigin("http://localhost:3000");
        configuration.addAllowedOriginPattern("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);
        configuration.addExposedHeader("Authorization");
        configuration.addExposedHeader("Refresh");
        configuration.addExposedHeader("MemberId");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenProvider);
            jwtAuthenticationFilter.setFilterProcessesUrl("/members/signin");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtUtils(), authorityUtils);


            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }

    @Bean
    public JwtUtils jwtUtils() {
        return new JwtUtils(jwtTokenProvider);
    }

}
