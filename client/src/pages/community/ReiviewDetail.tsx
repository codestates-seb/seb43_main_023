import '../../Global.css';

import { useEffect, useState } from 'react';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Viewer } from '@toast-ui/react-editor';

import { Api } from '../../apis/customAPI';
import { SweetAlert1, SweetAlert2 } from '../../Components/common/SweetAlert';
import Answers from '../../Components/community/Answers';
import MapApi from '../../Components/community/MapApi';
import ReviewCarousel from '../../Components/community/ReviewCarousel';
import useAxios from '../../hooks/useAxios';
import { RootState } from '../../store/Store';
import { Ipost } from '../../type/Ipost';
import { Iuser } from '../../type/Iuser';

const ReviewContainer = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-top: 170px;
`;

const ReviewBody = styled.div`
	padding-top: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: fit-content;
	margin-bottom: 60px;

	> div {
		display: flex;
	}
`;

const ImgContainer = styled.div`
	height: 100%;
	width: 25.3vw;
`;

const ContentContainer = styled.div`
	margin-left: 30px;
	height: 100%;
	width: 56.5vw;
`;

const Writer = styled.div`
	min-height: 60px;
	padding: 10px;
	display: flex;
	align-items: center;

	> div {
		width: 40px;
		height: 40px;
		background-color: antiquewhite;
		margin-right: 10px;
		border-radius: 100%;
	}

	> span {
		font-size: 13px;
		color: gray;
		padding-left: 5px;
		padding-top: 5px;
	}
`;

const Title = styled.h3`
	min-height: 40px;
	padding: 10px;
	padding-bottom: 0;
	margin-left: 10px;
`;

const Content = styled.div`
	min-height: 285px;
	padding: 20px;
	overflow: scroll;
`;

const Vote = styled.div`
	min-height: 40px;
	padding: 10px;
	display: flex;
	align-items: center;

	> span {
		padding-top: 3px;
		margin-left: 5px;
	}
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

const MapContainer = styled.div`
	margin-top: 20px;
	height: fit-content;
	display: flex;
	justify-content: center;
`;

const Map = styled.div`
	width: calc(100vw - 229px);
`;

const AnswerContainer = styled.div`
	width: calc(100vw - 229px);
	margin-top: 30px;
	height: fit-content;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

function ReviewDetail() {
	const navigate = useNavigate();

	const { id } = useParams();
	const [review, setReview] = useState<Ipost[]>([]);
	const [isLike, setIsLike] = useState<boolean>(false);

	const userInfos = useSelector((state: RootState) => state.user) as Iuser;

	const postData = useAxios({
		method: 'get',
		url: `/posts/${id}`,
	});

	const handleLike = () => {
		setIsLike(!isLike);

		try {
			Api.patch(`/posts/${id}/vote/${userInfos.id}`, {})
				.then(() => Api.get(`/posts/${id}`))
				.then((res) => setReview([res.data]));
		} catch (error) {
			navigate('/error');
		}
	};

	const handleDisLike = () => {
		setIsLike(!isLike);

		try {
			Api.patch(`/posts/${id}/vote/${userInfos.id}`, {})
				.then(() => Api.get(`/posts/${id}`))
				.then((res) => setReview([res.data]));
		} catch (error) {
			navigate('/error');
		}
	};

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
						navigate('/tripreview');
					}
				});
			} catch (error) {
				navigate('/error');
			}
		}
	};

	useEffect(() => {
		if (postData.response) {
			setReview([postData.response]);
		}
	}, [postData.response]);

	console.log(postData.response);

	return (
		<div className="main">
			<ReviewContainer>
				<ReviewBody>
					{review &&
						review.map((el) => (
							<div>
								<ImgContainer>
									<ReviewCarousel />
								</ImgContainer>

								<ContentContainer>
									<Writer>
										<div />
										{el.member.nickname} <span>@{el.member.mbti}</span>
									</Writer>
									<Title>{el.title}</Title>
									<Content>
										<Viewer initialValue={el.content || ''} />
									</Content>
									<Vote>
										{isLike && el.postId === Number(id) ? (
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
									<TagContainer>
										<span># 태그</span>

										<div>
											<div>{el.tag && el.tag.map((t) => <Tag>{t}</Tag>)}</div>

											{el.member.nickname === userInfos.nickname ? (
												<div>
													<Link to={`/tripreview/${id}/update`}>
														<BsPencilSquare color="gray" />
													</Link>
													<BsTrash onClick={deletePost} color="gray" />
												</div>
											) : null}
										</div>
									</TagContainer>
								</ContentContainer>
							</div>
						))}
					<MapContainer>
						<Map>
							<MapApi />
						</Map>
					</MapContainer>

					<AnswerContainer>
						<Answers />
					</AnswerContainer>
				</ReviewBody>
			</ReviewContainer>
		</div>
	);
}

export default ReviewDetail;
