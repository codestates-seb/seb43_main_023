package com.mainproject.seb43_main_023;

import com.mainproject.seb43_main_023.comment.entity.Comment;
import com.mainproject.seb43_main_023.comment.repository.CommentRepository;
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

/*TODO
 * 데이터배이스 초기값 설정
 * 나중에 지워야함
 */

@Component
public class DataLoader {
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private CommentRepository commentRepository;

    @PostConstruct
    public void init(){
        Member member1 = new Member(1L,"test1@gmail.com","1234","testNick1","INFP",null,null,null, Member.MemberStatus.MEMBER_ACTIVE);
        Member member2 = new Member(2L,"test2@gmail.com","1234","testNick2","INFP",null,null, null,Member.MemberStatus.MEMBER_ACTIVE);
        List<Member> members = Arrays.asList(
        member1,member2
        );
        memberRepository.saveAll(members);
        List<Post> posts = Arrays.asList(
                new Post(1L,"여행리뷰","여행리뷰제목1","내용1",0,0,LocalDateTime.now(),LocalDateTime.now(),null,null,member1,null,null,null),
                new Post(2L,"여행리뷰","여행사진제목2","내용2",0,0,LocalDateTime.now(),LocalDateTime.now(),null,null,member2,null,null,null),
                new Post(3L,"여행추천","여행추천제목3","내용3",0,0,LocalDateTime.now(),LocalDateTime.now(),null,null,member2,null,null,null),
                new Post(4L,"여행추천","여행인기제목4","내용4",0,0,LocalDateTime.now(),LocalDateTime.now(),null,null,member2,null,null,null),
                new Post(5L,"여행추천","여행제목5","내용5",0,0,LocalDateTime.now(),LocalDateTime.now(),null,null,member2,null,null,null),
                new Post(6L,"MBTI","MBTI제목6","내용6",0,0,LocalDateTime.now(),LocalDateTime.now(),null,null,member2,null,null,null),
                new Post(7L,"MBTI","MBTI제목7","내용7",0,0,LocalDateTime.now(),LocalDateTime.now(),null,null,member2,null,null,null),
                new Post(8L,"MBTI","MBTI제목8","내용8",0,0,LocalDateTime.now(),LocalDateTime.now(),null,null,member2,null,null,null)
        );
        postRepository.saveAll(posts);
        List<Comment> comments = Arrays.asList(
                new Comment(1L,"댓글1111",0,"test1",1,1,null),
                new Comment(2L,"댓글1111",0,"test1",1,1,null),
                new Comment(3L,"댓글2222",0,"test2",1,2,null),
                new Comment(4L,"댓글2222",0,"test2",2,2,null),
                new Comment(5L,"댓글2222",0,"test2",3,2,null),
                new Comment(5L,"댓글3333",0,"test3",1,3,null),
                new Comment(6L,"댓글3333",0,"test3",2,3,null),
                new Comment(7L,"댓글3333",0,"test3",3,3,null),
                new Comment(8L,"댓글3333",0,"test3",4,3,null),
                new Comment(9L,"댓글4444",0,"test4",1,4,null),
                new Comment(10L,"댓글4444",0,"test4",2,4,null),
                new Comment(11L,"댓글4444",0,"test4",3,4,null),
                new Comment(12L,"댓글4444",0,"test4",4,4,null),
                new Comment(13L,"댓글4444",0,"test4",5,4,null)
        );
        commentRepository.saveAll(comments);
    }

}
