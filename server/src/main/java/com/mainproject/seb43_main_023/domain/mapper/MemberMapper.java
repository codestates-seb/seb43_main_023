package com.mainproject.seb43_main_023.domain.mapper;

import com.mainproject.seb43_main_023.domain.dto.MemberDto;
import com.mainproject.seb43_main_023.domain.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    Member memberPostDtoToMember(MemberDto.Post memberPostDto);

    default Member memberPatchDtoToMember(MemberDto.Patch memberPatchDto, Member findMember) {
        if (memberPatchDto == null) {
            return null;
        } else {
            Member member = new Member();
            member.setMemberId(findMember.getMemberId());
            member.setEmail(findMember.getEmail());
            member.setPassword(findMember.getPassword());
            member.setNickname(memberPatchDto.getNickname());
            member.setMbti(memberPatchDto.getMbti());
            member.setRoles(findMember.getRoles());
            member.setMemberStatus(findMember.getMemberStatus());
            member.setBadge(findMember.getBadge());
            member.setImg(findMember.getImg());
            member.setCreatedAt(findMember.getCreatedAt());
            member.setModifiedAt(findMember.getModifiedAt());
            return member;
        }
    }

    MemberDto.Response memberToMemberResponseDto(Member member);
}
