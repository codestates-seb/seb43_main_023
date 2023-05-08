package com.mainproject.seb43_main_023;

import com.mainproject.seb43_main_023.member.entity.Member;
import com.mainproject.seb43_main_023.member.repository.MemberRepository;
import com.mainproject.seb43_main_023.post.entity.Post;
import com.mainproject.seb43_main_023.post.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Component
public class DataLoader {
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private PostRepository postRepository;

    @PostConstruct
    public void init(){
        List<Member> members = Arrays.asList(
        new Member(1L,"test1@gmail.com","1234","testNick1","INFP",null,null, Member.MemberStatus.MEMBER_ACTIVE),
        new Member(2L,"test2@gmail.com","1234","testNick2","INFP",null,null, Member.MemberStatus.MEMBER_ACTIVE)
        );
        memberRepository.saveAll(members);
        List<Post> posts = Arrays.asList(
                new Post(1L,"여행리뷰","제목1","내용1",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null),
                new Post(2L,"여행리뷰","제목2","내용2",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null),
                new Post(3L,"여행추천","제목3","내용3",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null),
                new Post(4L,"여행추천","제목4","내용4",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null),
                new Post(5L,"여행추천","제목5","내용5",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null),
                new Post(6L,"MBTI","제목6","내용6",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null),
                new Post(7L,"MBTI","제목7","내용7",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null),
                new Post(8L,"MBTI","제목8","내용8",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null),
                new Post(9L,"잡담","제목9","내용9",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null),
                new Post(10L,"잡담","제목10","내용10",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null),
                new Post(11L,"잡담","제목11","내용11",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null),
                new Post(12L,"잡담","제목12","내용12",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null),
                new Post(13L,"잡담","제목13","내용13",0,0,LocalDateTime.now(),LocalDateTime.now(),2L,"test2@gmail.com","testNick2",null)
        );
        postRepository.saveAll(posts);
    }

}
