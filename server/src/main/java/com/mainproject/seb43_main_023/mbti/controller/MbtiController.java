package com.mainproject.seb43_main_023.mbti.controller;

import com.mainproject.seb43_main_023.mbti.dto.MbtiDto;
import com.mainproject.seb43_main_023.mbti.entity.Mbti;
import com.mainproject.seb43_main_023.mbti.mapper.MbtiMapper;
import com.mainproject.seb43_main_023.mbti.repository.MbtiRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mbtiInfo")
@Validated
public class MbtiController {
    private final MbtiMapper mbtiMapper;
    private final MbtiRepository repository;

    public MbtiController(MbtiMapper mbtiMapper, MbtiRepository repository){
        this.mbtiMapper = mbtiMapper;
        this.repository = repository;
    }
    @GetMapping("/{mbti}")
    public ResponseEntity getMbti(@PathVariable("mbti") String mbti){
        Mbti findMbti = verifyMbti(mbti);
        return new ResponseEntity((mbtiMapper.mbtiToMbtiResponse(findMbti)), HttpStatus.OK);
    }
    public Mbti verifyMbti(String mbti){
        return repository.findByMbti(mbti);
    }
}
