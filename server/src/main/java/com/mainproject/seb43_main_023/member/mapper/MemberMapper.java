package com.mainproject.seb43_main_023.member.mapper;

import com.mainproject.seb43_main_023.member.dto.MemberDto;
import com.mainproject.seb43_main_023.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    Member memberPostDtoToMember(MemberDto.Post memberPostDto);

    default Member memberPatchDtoToMember(MemberDto.Patch memberPatchDto, Member findmember) {
        if (memberPatchDto == null) {
            return null;
        } else {
            Member member = new Member();
            member.setMemberId(findmember.getMemberId());
            member.setEmail(findmember.getEmail());
            member.setPassword(findmember.getPassword());
            member.setNickname(memberPatchDto.getNickname());
            member.setMbti(memberPatchDto.getMbti());
            member.setRoles(findmember.getRoles());
            member.setMemberStatus(findmember.getMemberStatus());
            member.setBadge(findmember.getBadge());
            member.setCreatedAt(findmember.getCreatedAt());
            member.setModifiedAt(findmember.getModifiedAt());
            return member;
        }
    }

    MemberDto.Response memberToMemberResponseDto(Member member);
}
