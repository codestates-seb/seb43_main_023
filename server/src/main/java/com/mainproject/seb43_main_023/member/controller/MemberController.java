package com.mainproject.seb43_main_023.member.controller;

import com.mainproject.seb43_main_023.dto.ApiResponse;
import com.mainproject.seb43_main_023.member.dto.MemberDto;
import com.mainproject.seb43_main_023.member.entity.Member;
import com.mainproject.seb43_main_023.member.mapper.MemberMapper;
import com.mainproject.seb43_main_023.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper memberMapper;
    private final ApiResponse apiResponse;

    @PostMapping("/signup")
    public ResponseEntity singUp(@RequestBody MemberDto.Post memberPostDto) {
        Member member = memberMapper.memberPostDtoToMember(memberPostDto);
        Member createdMember = memberService.createMember(member);

        return new ResponseEntity<>(memberMapper.memberToMemberResponseDto(createdMember), HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity signIn(HttpServletRequest request,
                                 @RequestBody @Valid MemberDto.SignIn signIn, Errors errors) {
        if (errors.hasErrors()) {
            return apiResponse.fail(errors);
        }
        return memberService.signin(request, signIn);
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

    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") long memberId) {
        Member verifiedMember = memberService.findVerifiedMember(memberId);
        return new ResponseEntity<>(memberMapper.memberToMemberResponseDto(verifiedMember), HttpStatus.OK);
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") long memberId) {
        memberService.deleteMember(memberId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/grantBadge/{member-id}")
    public ResponseEntity grantBadge(@PathVariable("member-id") long memberId) {
        memberService.grantBadge(memberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
