package com.mainproject.seb43_main_023.member.service;

import com.mainproject.seb43_main_023.exception.BusinessLogicException;
import com.mainproject.seb43_main_023.exception.ExceptionCode;
import com.mainproject.seb43_main_023.member.entity.Member;
import com.mainproject.seb43_main_023.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    public Member createMember(Member member) {
        verifyExistsEmail(member.getEmail());


        return memberRepository.save(member);
    }

    public Member updateMember(Member member) {
        Member findMember = findVerifiedMember(member.getMemberId());
        Optional.ofNullable(member.getNickname())
                .ifPresent(nickname -> findMember.setNickname(nickname));
        Optional.ofNullable(member.getMbti())
                .ifPresent(mbti -> findMember.setMbti(mbti));

        return memberRepository.save(member);
    }

    public void deleteMember(long memberId) {
        Member verifiedMember = findVerifiedMember(memberId);
        verifiedMember.setMemberStatus(Member.MemberStatus.MEMBER_QUIT);
        memberRepository.save(verifiedMember);
    }

    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member findMember = optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return findMember;
    }

    private void verifyExistsEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
        }
    }
}
