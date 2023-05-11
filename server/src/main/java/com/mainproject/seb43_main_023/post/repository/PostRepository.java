package com.mainproject.seb43_main_023.post.repository;

import com.mainproject.seb43_main_023.post.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post,Long> {
    Page<Post> findByTitleContainingAndSubjectContaining(String title, String subject, PageRequest pageRequest);
}
