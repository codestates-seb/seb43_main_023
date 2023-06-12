import '../../Global.css';

import { useEffect, useState } from 'react';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { Viewer } from '@toast-ui/react-editor';

// eslint-disable-next-line import/no-extraneous-dependencies
import AWS from 'aws-sdk';
import { Api } from '../../apis/customAPI';
import Answers from '../../Components/community/Answers';
import ReviewCarousel from '../../Components/community/ReviewCarousel';
import useAxios from '../../hooks/useAxios';
import { RootState } from '../../store/Store';
import { Ianswer } from '../../type/Ianswer';
import { Ipost } from '../../type/Ipost';
import { Iuser } from '../../type/Iuser';
import { SweetAlert1, SweetAlert2 } from '../../utils/SweetAlert';
import TopBar from '../../Components/community/TopBar';
import ToastAlert from '../../utils/ToastAlert';
import useGet from '../../hooks/useGet';

interface activeT {
	img: string;
}

const TopBarContainer = styled.div`
	width: 90%;
`;

const PostContainer = styled.div`
	height: fit-content;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const PostBody = styled.div`
	margin-top: 20px;
	height: max-content;
	width: 90%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const Title = styled.div<activeT>`
	border-bottom: 1px solid rgb(214, 217, 219);
	font-size: 30px;

	> div:nth-child(2) {
		padding: 10px 2px;
		font-size: 14px;
		display: flex;
		justify-content: space-between;
		color: gray;

		> div:nth-child(1) {
			display: flex;
			align-items: center;

			> div {
				${(props) =>
					props.img &&
					css`
						width: 30px;
						height: 30px;
						background-image: url(${props.img});
						background-size: 105% 127%;
						margin-right: 10px;
						border-radius: 100%;
					`}
			}
		}

		> div:nth-child(2) {
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

	const { id } = useParams();
	const [post, setPost] = useState<Ipost[]>([]);
	const [isLike, setIsLike] = useState<boolean>(false);

	// eslint-disable-next-line prefer-const
	let [answers, setAnswers] = useState<Ianswer[]>([]);

	const bucketName = 'imageupload-practice';

	AWS.config.update({
		region: process.env.REACT_APP_REGION,
		accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
		secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY_ID,
	});

	answers = answers.filter((el) => el.postId === Number(id));

	const userInfos = useSelector((state: RootState) => state.user) as Iuser;

	const postData = useGet(`/${id}`);

	const answerData = useAxios({
		method: 'get',
		url: `/comments/${id}`,
	});

	const deletePost = async () => {
		const sweetAlert1 = await SweetAlert1(
			'정말로 삭제하시겠습니까 ?',
			'다신 되돌릴 수 없습니다',
			'Delete',
			'Cancle',
		);
		if (sweetAlert1.isConfirmed) {
			try {
				Api.delete(`/posts/${id}/${userInfos.id}`).then(async () => {
					const sweetAlert2 = await SweetAlert2('Deleted!', '삭제되었습니다');
					if (sweetAlert2.isConfirmed) {
						navigate('/community');
					}
				});
			} catch (error) {
				navigate('/error');
			}
		}
	};

	const handleLike = (author: string | undefined) => {
		if (userInfos.nickname === author) {
			ToastAlert('자신의 게시글은 좋아요가 불가능해요');
		} else {
			setIsLike(!isLike);

			try {
				Api.patch(`/posts/${id}/vote/${userInfos.id}`, {})
					.then(() => Api.get(`/posts/${id}`))
					.then((res) => setPost([res.data]));
			} catch (error) {
				navigate('/error');
			}
		}
	};

	const handleDisLike = () => {
		setIsLike(false);

		try {
			Api.patch(`/posts/${id}/vote/${userInfos.id}`, {})
				.then(() => Api.get(`/posts/${id}`))
				.then((res) => {
					console.log(res.data);
					setPost([res.data]);
				});
			// document.location.reload();
		} catch (error) {
			navigate('/error');
		}
	};

	useEffect(() => {
		if (postData) {
			setPost([postData]);
		}

		if (answerData.response) {
			setAnswers(answerData.response);
		} else {
			setAnswers([]);
		}
	}, [answerData.response, postData]);

	return (
		<div className="main">
			<PostContainer>
				<TopBarContainer>
					<TopBar />
				</TopBarContainer>
				<PostBody>
					{post &&
						post.map((el) => (
							<>
								<div>
									<Title img={el.member.img || ''}>
										<div>{el.title}</div>
										<div>
											<div>
												<div />
												{el.member.nickname}@{el.member.mbti}{' '}
												{el.postCreatedAt!.slice(0, 10)}
											</div>
											<div>
												<span>
													추천 {el.voteCount} | 조회 {el.viewCount} | 댓글{' '}
													{answers.length}
												</span>

												{userInfos.nickname === el.member.nickname ? (
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
										{el.image.length > 0 ? (
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
										{(isLike && el.postId === Number(id)) ||
										el.voteList?.includes(userInfos.id!) ? (
											<AiFillHeart
												size={21}
												onClick={handleDisLike}
												color="#fe6464"
											/>
										) : (
											<AiOutlineHeart
												color="#646464"
												size={21}
												onClick={() => handleLike(el.member.nickname)}
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
