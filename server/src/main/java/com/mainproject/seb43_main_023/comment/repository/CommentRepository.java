package com.mainproject.seb43_main_023.comment.repository;

import com.mainproject.seb43_main_023.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
}
