package com.mainproject.seb43_main_023.domain.controller;

import com.mainproject.seb43_main_023.domain.dto.ApiResponseDto;
import com.mainproject.seb43_main_023.global.exception.BusinessLogicException;
import com.mainproject.seb43_main_023.global.exception.ExceptionCode;
import com.mainproject.seb43_main_023.domain.dto.MemberDto;
import com.mainproject.seb43_main_023.domain.entity.Member;
import com.mainproject.seb43_main_023.domain.mapper.MemberMapper;
import com.mainproject.seb43_main_023.domain.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper memberMapper;
    private final ApiResponseDto apiResponseDto;

    @PostMapping("/signup")
    public ResponseEntity singUp(@RequestBody MemberDto.Post memberPostDto) {
        Member member = memberMapper.memberPostDtoToMember(memberPostDto);
        Member createdMember = memberService.createMember(member);

        return new ResponseEntity<>(memberMapper.memberToMemberResponseDto(createdMember), HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity signIn(HttpServletRequest request,
                                 @RequestBody @Valid MemberDto.SignIn signIn, Errors errors) {
        Member member = memberService.findVerifiedMemberByEmail(signIn.getEmail());
        if (member.getMemberStatus().equals(Member.MemberStatus.MEMBER_QUIT)) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }

        if (errors.hasErrors()) {
            return apiResponseDto.fail(errors);
        }
        return memberService.signIn(request, signIn);
    }

    @PostMapping("/reissue")
    public ResponseEntity reissue(HttpServletRequest request) {
        return memberService.reissue(request);
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity updateMember(@PathVariable("member-id") long memberId,
                                       @RequestBody MemberDto.Patch memberPatchDto) {
        Member findMember = memberService.findVerifiedMember(memberId);
        Member member = memberMapper.memberPatchDtoToMember(memberPatchDto, findMember);

        Member updatedMember = memberService.updateMember(member);

        return new ResponseEntity<>(memberMapper.memberToMemberResponseDto(updatedMember), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getMembers() {
        List<Member> members = memberService.getMembers();
        return new ResponseEntity<>(members, HttpStatus.OK);
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") long memberId) {
        Member verifiedMember = memberService.findVerifiedMember(memberId);
        return new ResponseEntity<>(memberMapper.memberToMemberResponseDto(verifiedMember), HttpStatus.OK);
    }

    @DeleteMapping("/{member-id}")
    public void deleteMember(HttpServletRequest request, @PathVariable("member-id") long memberId) {
        memberService.deleteMember(request, memberId);
    }

    @PatchMapping("/grantBadge/{member-id}")
    public ResponseEntity grantBadge(@PathVariable("member-id") long memberId) {
        memberService.grantBadge(memberId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/findAllMembers")
    public ResponseEntity<Integer> findAll() {
        int all = memberService.findAllMembers();
        return new ResponseEntity<>(all, HttpStatus.OK);
    }
}
