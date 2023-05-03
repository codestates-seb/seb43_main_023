package com.mainproject.seb43_main_023.member.mapper;

import com.mainproject.seb43_main_023.member.dto.MemberDto;
import com.mainproject.seb43_main_023.member.entity.Member;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-05-02T16:32:06+0900",
    comments = "version: 1.5.1.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.6.1.jar, environment: Java 11.0.15 (Oracle Corporation)"
)
@Component
public class MemberMapperImpl implements MemberMapper {

    @Override
    public Member memberPostDtoToMember(MemberDto.Post memberPostDto) {
        if ( memberPostDto == null ) {
            return null;
        }

        Member member = new Member();

        member.setEmail( memberPostDto.getEmail() );
        member.setPassword( memberPostDto.getPassword() );
        member.setNickname( memberPostDto.getNickname() );
        member.setMbti( memberPostDto.getMbti() );

        return member;
    }

    @Override
    public MemberDto.Response memberToMemberResponseDto(Member member) {
        if ( member == null ) {
            return null;
        }

        MemberDto.Response.ResponseBuilder response = MemberDto.Response.builder();

        response.memberId( member.getMemberId() );
        response.email( member.getEmail() );
        response.password( member.getPassword() );
        response.nickname( member.getNickname() );
        response.mbti( member.getMbti() );
        if ( member.getMemberStatus() != null ) {
            response.memberStatus( member.getMemberStatus().name() );
        }
        response.badge( member.getBadge() );
        response.createdAt( member.getCreatedAt() );
        response.modifiedAt( member.getModifiedAt() );

        return response.build();
    }
}
