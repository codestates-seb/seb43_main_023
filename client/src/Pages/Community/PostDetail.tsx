import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../../Global.css';
import styled from 'styled-components';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import Swal from 'sweetalert2';
import Answers from '../../Components/Community/Answers';

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
			display: flex;
			justify-content: center;
			align-items: center;

			> span {
				margin-right: 20px;
			}

			> div {
				width: 35px;
				display: flex;
				justify-content: space-between;
			}
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

	interface Answer {
		author: string;
		content: string;
		id: number;
		vote: number;
	}

	const { id } = useParams();
	const [post, setPost] = useState<Post[]>([]);
	const displayName = localStorage.getItem('displayName');

	const deletePost = () => {
		Swal.fire({
			title: '정말로 삭제하시겠습니까 ?',
			text: '다신 되돌릴 수 없습니다',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#0db4f3',
			cancelButtonColor: '#f37676',
			confirmButtonText: 'Delete',
		}).then((result) => {
			if (result.isConfirmed) {
				axios
					.delete(`http://localhost:4000/posts/${id}`)
					.then(() =>
						Swal.fire({
							title: 'Deleted!',
							text: '삭제되었습니다',
							icon: 'success',
							confirmButtonColor: '#0db4f3',
						}),
					)
					// eslint-disable-next-line no-return-assign
					.then(() => (document.location.href = '/community'));
			}
		});
	};

	useEffect(() => {
		axios.get(`http://localhost:4000/posts/${id}`).then((res) => {
			setPost([res.data]);
		});
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
												<span>
													추천 {el.voteCount} | 조회 {el.viewCount} | 댓글 수
												</span>

												{displayName === el.nickName ? (
													<div>
														<Link to={`/community/${id}/update`}>
															<BsPencilSquare color="gray" />
														</Link>
														<BsTrash onClick={deletePost} />
													</div>
												) : null}
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
									<Answers />
								</div>
							</>
						))}
				</PostBody>
			</PostContainer>
		</div>
	);
}

export default PostDetail;
