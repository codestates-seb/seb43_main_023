package com.mainproject.seb43_main_023.domain.repository;

import com.mainproject.seb43_main_023.domain.entity.Mbti;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MbtiRepository extends JpaRepository<Mbti,Long> {
    Mbti findByMbti(String mbti);
}
