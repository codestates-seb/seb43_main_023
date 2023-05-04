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
                new Post(1L,"말머리1","제목1","내용1",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"testNick1",null),
                new Post(2L,"말머리2","제목2","내용2",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"testNick1",null),
                new Post(3L,"말머리3","제목3","내용3",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"testNick1",null),
                new Post(4L,"말머리4","제목4","내용4",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"testNick1",null),
                new Post(5L,"말머리5","제목5","내용5",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"testNick1",null),
                new Post(6L,"말머리6","제목6","내용6",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"testNick1",null),
                new Post(7L,"말머리7","제목7","내용7",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"testNick1",null),
                new Post(8L,"말머리8","제목8","내용8",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"testNick1",null),
                new Post(9L,"말머리9","제목9","내용9",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"testNick1",null),
                new Post(10L,"말머리10","제목10","내용10",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"testNick1",null),
                new Post(11L,"말머리11","제목11","내용11",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"testNick1",null),
                new Post(12L,"말머리12","제목12","내용12",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"testNick1",null),
                new Post(13L,"말머리13","제목13","내용13",0,0,LocalDateTime.now(),LocalDateTime.now(),2L,"testNick2",null)
        );
        postRepository.saveAll(posts);
    }

}
