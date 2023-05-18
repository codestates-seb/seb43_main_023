import '../../Global.css';

import { useEffect, useState } from 'react';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import { Viewer } from '@toast-ui/react-editor';

import { Api } from '../../apis/customAPI';
import Answers from '../../Components/Community/Answers';
import ReviewCarousel from '../../Components/Community/ReviewCarousel';
import useAxios from '../../hooks/useAxios';
import { Iuser } from '../../reducers/userInfoReducer';
import { RootState } from '../../store/Store';

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
	margin-top: 20px;
	padding: 10px;
	display: flex;
	align-items: center;

	> span {
		padding-top: 3px;
		padding-left: 5px;
	}
`;

const Content = styled.div`
	margin-top: 30px;
	max-height: 600px;
	min-height: 500px;
	overflow-y: scroll;
	display: flex;
`;

const TagContainer = styled.div`
	min-height: 60px;
	padding: 10px;

	> span {
		padding-left: 10px;
		font-size: 14px;
		color: gray;
	}

	> div {
		margin-top: 10px;
		display: flex;
		justify-content: space-between;
		font-size: 13px;

		> div:nth-child(1) {
			display: flex;
			justify-content: center;
			align-items: center;
		}

		> div:nth-child(2) {
			display: flex;
			width: 60px;
			justify-content: space-evenly;
			align-items: center;

			> a {
				margin-top: 4px;
			}
		}
	}
`;

const Tag = styled.div`
	width: max-content;
	padding: 5px 20px;
	margin: 5px;
	border-radius: 30px;
	font-size: 11px;
	background-color: #fcf0ff;
`;

const ImgContainer = styled.div`
	height: 100%;
	width: 25.3vw;
	margin-left: 25px;
`;

const ViewerContainer = styled.div`
	width: 70%;
	padding: 20px;
	max-height: 515px;
	overflow: scroll;
	margin-left: 24px;
`;

function PostDetail() {
	const navigate = useNavigate();
	interface Post {
		id: number;
		subject: string;
		title: string;
		content: string;
		nickName: string;
		viewCount: number;
		voteCount: number;
		createdAt: string;
		tag: string[];
		img: string[];
	}

	interface Answer {
		author: string;
		content: string;
		id: number;
		vote: number;
		postId: number;
	}

	const { id } = useParams();
	const [post, setPost] = useState<Post[]>([]);
	const [isLike, setIsLike] = useState<boolean>(false);

	// eslint-disable-next-line prefer-const
	let [answers, setAnswers] = useState<Answer[]>([]);

	answers = answers.filter((el) => el.postId === Number(id));

	const userInfos = useSelector((state: RootState) => state.user) as Iuser;

	const postData = useAxios({
		method: 'get',
		url: `/posts/${id}`,
	});

	const answerData = useAxios({
		method: 'get',
		url: `/comments`,
	});

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
				try {
					Api.delete(`/posts/${id}`)
						.then(() =>
							Swal.fire({
								title: 'Deleted!',
								text: '삭제되었습니다',
								icon: 'success',
								confirmButtonColor: '#0db4f3',
							}),
						) // eslint-disable-next-line no-return-assign
						.then(() => (document.location.href = '/community'));
				} catch (error) {
					navigate('/error');
				}
			}
		});
	};

	const handleLike = () => {
		setIsLike(!isLike);

		const postVote = post[0].voteCount;

		try {
			Api.patch(`/posts/${id}`, {
				voteCount: postVote + 1,
			})
				.then(() => Api.get(`/posts/${id}`))
				.then((res) => setPost([res.data]));
		} catch (error) {
			navigate('/error');
		}
	};

	const handleDisLike = () => {
		setIsLike(!isLike);

		const postVote = post[0].voteCount;

		try {
			Api.patch(`/posts/${id}`, {
				voteCount: postVote - 1,
			})
				.then(() => Api.get(`/posts/${id}`))
				.then((res) => setPost([res.data]));
		} catch (error) {
			navigate('/error');
		}
	};

	useEffect(() => {
		if (postData.response) {
			setPost([postData.response]);
		}

		if (answerData.response) {
			setAnswers(answerData.response);
		} else {
			setAnswers([]);
		}
	}, [answerData.response, postData.response]);

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
													추천 {el.voteCount} | 조회 {el.viewCount} | 댓글{' '}
													{answers.length}
												</span>

												{userInfos.nickname === el.nickName ? (
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
									<Content>
										{el.img.length > 0 ? (
											<>
												<ImgContainer>
													<ReviewCarousel />
												</ImgContainer>
												<ViewerContainer>
													<Viewer initialValue={el.content || ''} />
												</ViewerContainer>
											</>
										) : (
											<Viewer initialValue={el.content || ''} />
										)}
									</Content>
								</div>

								<div>
									<Vote>
										{isLike && el.id === Number(id) ? (
											<AiFillHeart
												size={21}
												onClick={handleDisLike}
												color="#fe6464"
											/>
										) : (
											<AiOutlineHeart
												color="#646464"
												size={21}
												onClick={handleLike}
											/>
										)}
										<span>
											{el.voteCount}
											명이 좋아합니다.
										</span>
									</Vote>
									{el.tag ? (
										<TagContainer>
											<span># 태그</span>

											<div>
												<div>
													{el.tag.map((t) => (
														<Tag>{t}</Tag>
													))}
												</div>
											</div>
										</TagContainer>
									) : null}

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
