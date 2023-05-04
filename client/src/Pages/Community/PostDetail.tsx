import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../Global.css';
import styled from 'styled-components';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const PostContainer = styled.div`
	height: fit-content;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const PostBody = styled.div`
	margin-top: 20px;

	height: max-content;
	width: 90%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const Title = styled.div`
	border-bottom: 1px solid rgb(214, 217, 219);
	font-size: 30px;

	> div:nth-child(2) {
		padding: 10px 2px;
		font-size: 14px;
		display: flex;
		justify-content: space-between;
		color: gray;

		> div {
		}
	}
`;

const Vote = styled.div`
	margin-top: 50px;
	padding: 10px;
	margin-bottom: 30px;
	border-bottom: 1px solid rgb(214, 217, 219);
	display: flex;
	align-items: center;

	> span {
		padding-top: 3px;
		padding-left: 5px;
	}
`;

const Content = styled.div`
	margin-top: 30px;
	height: 450px;
	overflow-y: scroll;
`;

const Answers = styled.div``;

function PostDetail() {
	interface Post {
		postId: number;
		subject: string;
		title: string;
		content: string;
		nickName: string;
		viewCount: number;
		voteCount: number;
		createdAt: string;
	}
	const { id } = useParams();
	const [post, setPost] = useState<Post[]>([]);
	useEffect(() => {
		axios
			.get(`http://localhost:4000/posts/${id}`)
			.then((res) => setPost([res.data]));
	}, [id]);

	return (
		<div className="main">
			<PostContainer>
				<PostBody>
					{post &&
						post.map((el) => (
							<>
								<div>
									<Title>
										<div>{el.title}</div>
										<div>
											{el.nickName}@infp {el.createdAt}
											<div>
												추천 {el.voteCount} | 조회 {el.viewCount} | 댓글 수
											</div>
										</div>
									</Title>
									<Content>{el.content}</Content>
								</div>

								<div>
									<Vote>
										<AiOutlineHeart color="#646464" size={21} />
										<span>
											{el.voteCount}
											명이 좋아합니다.
										</span>
									</Vote>
									<Answers>댓 글 자 리 따 로 컴 포 넌 트 로 뺄 예 정</Answers>
									<Answers>댓 글 자 리 따 로 컴 포 넌 트 로 뺄 예 정</Answers>
									<Answers>댓 글 자 리 따 로 컴 포 넌 트 로 뺄 예 정</Answers>
									<Answers>댓 글 자 리 따 로 컴 포 넌 트 로 뺄 예 정</Answers>
								</div>
							</>
						))}
				</PostBody>
			</PostContainer>
		</div>
	);
}

export default PostDetail;
