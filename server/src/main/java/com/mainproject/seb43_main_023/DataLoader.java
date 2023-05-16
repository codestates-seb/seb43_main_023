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
        List<Member> members = Arrays.asList(
        new Member(1L,"test1@gmail.com","1234","testNick1","INFP",null,null,null, Member.MemberStatus.MEMBER_ACTIVE),
        new Member(2L,"test2@gmail.com","1234","testNick2","INFP",null,null, null,Member.MemberStatus.MEMBER_ACTIVE)
        );
        memberRepository.saveAll(members);
        List<Post> posts = Arrays.asList(
                new Post(1L,"여행리뷰","여행리뷰제목1","내용1",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null,null),
                new Post(2L,"여행리뷰","여행사진제목2","내용2",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null,null),
                new Post(3L,"여행추천","여행추천제목3","내용3",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null,null),
                new Post(4L,"여행추천","여행인기제목4","내용4",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null,null),
                new Post(5L,"여행추천","여행제목5","내용5",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null,null),
                new Post(6L,"MBTI","MBTI제목6","내용6",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null,null),
                new Post(7L,"MBTI","MBTI제목7","내용7",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null,null),
                new Post(8L,"MBTI","MBTI제목8","내용8",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null,null),
                new Post(9L,"잡담","잡담사진9","내용9",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null,null),
                new Post(10L,"잡담","잡담사진10","내용10",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null,null),
                new Post(11L,"잡담","잡담여행11","내용11",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null,null),
                new Post(12L,"잡담","잡담여행12","내용12",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null,null),
                new Post(13L,"잡담","잡담MBTI13","내용13",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null,null),
                new Post(14L,"여행리뷰","여행사진제목2","내용2",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null,null),
                new Post(15L,"여행추천","여행추천제목3","내용3",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null,null),
                new Post(16L,"여행추천","여행인기제목4","내용4",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null,null),
                new Post(17L,"여행추천","여행제목5","내용5",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null,null),
                new Post(18L,"MBTI","MBTI제목6","내용6",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null,null),
                new Post(19L,"MBTI","MBTI제목7","내용7",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null,null),
                new Post(20L,"MBTI","MBTI제목8","내용8",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null,null),
                new Post(21L,"잡담","잡담사진9","내용9",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null,null),
                new Post(22L,"잡담","잡담사진10","내용10",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null,null),
                new Post(23L,"잡담","잡담여행11","내용11",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null,null),
                new Post(24L,"잡담","잡담여행12","내용12",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null,null),
                new Post(25L,"잡담","잡담MBTI13","내용13",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null,null),
                new Post(26L,"여행리뷰","여행사진제목2","내용2",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null,null),
                new Post(27L,"여행추천","여행추천제목3","내용3",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null,null),
                new Post(28L,"여행추천","여행인기제목4","내용4",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null,null),
                new Post(29L,"여행추천","여행제목5","내용5",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null,null),
                new Post(30L,"MBTI","MBTI제목6","내용6",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null,null),
                new Post(31L,"MBTI","MBTI제목7","내용7",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null,null),
                new Post(31L,"MBTI","MBTI제목8","내용8",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null,null),
                new Post(32L,"잡담","잡담사진9","내용9",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null,null),
                new Post(33L,"잡담","잡담사진10","내용10",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null,null),
                new Post(34L,"잡담","잡담여행11","내용11",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null,null),
                new Post(35L,"잡담","잡담여행12","내용12",0,0,LocalDateTime.now(),LocalDateTime.now(),1L,"test1@gmail.com","testNick1",null,null),
                new Post(36L,"잡담","잡담MBTI13","내용13",0,0,LocalDateTime.now(),LocalDateTime.now(),2L,"test2@gmail.com","testNick2",null,null)
        );
        postRepository.saveAll(posts);
        List<Comment> comments = Arrays.asList(
                new Comment(1L,"댓글1234",0,1,1,null),
                new Comment(2L,"댓글2",0,2,2,null),
                new Comment(3L,"댓글1234",0,1,1,null),
                new Comment(4L,"댓글1234",0,1,1,null),
                new Comment(5L,"댓글1234",0,1,1,null),
                new Comment(6L,"댓글1234",0,1,1,null),
                new Comment(7L,"댓글1234",0,1,1,null),
                new Comment(8L,"댓글1234",0,1,1,null),
                new Comment(9L,"댓글1234",0,1,1,null),
                new Comment(10L,"댓글1234",0,1,1,null),
                new Comment(11L,"댓글1234",0,1,1,null),
                new Comment(12L,"댓글1234",0,1,1,null),
                new Comment(13L,"댓글1234",0,1,1,null),
                new Comment(14L,"댓글1234",0,1,1,null),
                new Comment(15L,"댓글1234",0,1,1,null),
                new Comment(16L,"댓글1234",0,1,1,null),
                new Comment(17L,"댓글1234",0,1,1,null),
                new Comment(18L,"댓글1234",0,1,1,null),
                new Comment(19L,"댓글1234",0,1,1,null),
                new Comment(20L,"댓글1234",0,1,1,null),
                new Comment(21L,"댓글1234",0,1,1,null),
                new Comment(22L,"댓글1234",0,1,1,null),
                new Comment(23L,"댓글1234",0,1,1,null),
                new Comment(24L,"댓글1234",0,1,1,null),
                new Comment(25L,"댓글1234",0,1,1,null),
                new Comment(26L,"댓글1234",0,1,1,null),
                new Comment(27L,"댓글1234",0,1,1,null),
                new Comment(28L,"댓글1234",0,1,1,null),
                new Comment(29L,"댓글1234",0,1,1,null),
                new Comment(30L,"댓글1234",0,1,1,null),
                new Comment(31L,"댓글1234",0,1,1,null),
                new Comment(32L,"댓글1234",0,1,1,null),
                new Comment(33L,"댓글1234",0,1,1,null),
                new Comment(34L,"댓글1234",0,1,1,null)


        );
        commentRepository.saveAll(comments);
    }

}
