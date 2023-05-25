package com.mainproject.seb43_main_023.post.repository;

import com.mainproject.seb43_main_023.member.entity.Member;
import com.mainproject.seb43_main_023.post.entity.Post;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;

@Repository
public interface PostRepository extends JpaRepository<Post,Long> {
    @Query("SELECT p FROM Post p WHERE p.title LIKE %:title% AND p.subject LIKE %:subject% AND p.postCreatedAt >= :startDate")
    Page<Post> findRecentPosts(@Param("title") String title, @Param("subject") String subject, @Param("startDate") LocalDateTime startDate, PageRequest pageRequest);
}
