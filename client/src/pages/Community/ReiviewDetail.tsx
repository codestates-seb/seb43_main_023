import '../../Global.css';

import { useEffect, useState } from 'react';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import { Viewer } from '@toast-ui/react-editor';

import Answers from '../../Components/Community/Answers';
import MapApi from '../../Components/Community/MapApi';
import ReviewCarousel from '../../Components/Community/ReviewCarousel';
import { Iuser } from '../../reducers/userInfoReducer';
import { RootState } from '../../store/Store';
import { Api } from '../../util/customAPI';
import useAxios from '../../util/customAxios';

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

interface Review {
	id: number;
	title: string;
	content: string;
	nickName: string;
	img: string[];
	viewCount: number;
	voteCount: number;
	createdAt: string;
	tag: string[];
}

function ReviewDetail() {
	const navigate = useNavigate();

	const { id } = useParams();
	const [review, setReview] = useState<Review[]>([]);
	const [isLike, setIsLike] = useState<boolean>(false);

	const userInfos = useSelector((state: RootState) => state.user) as Iuser;

	const postData = useAxios({
		method: 'get',
		url: `/posts/${id}`,
	});

	const handleLike = () => {
		setIsLike(!isLike);

		const reviewVote = review[0].voteCount;

		try {
			Api.patch(`/posts/${id}`, {
				voteCount: reviewVote + 1,
			})
				.then(() => Api.get(`/posts/${id}`))
				.then((res) => setReview([res.data]));
		} catch (error) {
			navigate('/error');
		}
	};

	const handleDisLike = () => {
		setIsLike(!isLike);

		const reviewVote = review[0].voteCount;

		try {
			Api.patch(`/posts/${id}`, {
				voteCount: reviewVote - 1,
			})
				.then(() => Api.get(`/posts/${id}`))
				.then((res) => setReview([res.data]));
		} catch (error) {
			navigate('/error');
		}
	};

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
						)
						// eslint-disable-next-line no-return-assign
						.then(() => (document.location.href = '/tripreview'));
				} catch (error) {
					navigate('/error');
				}
			}
		});
	};

	useEffect(() => {
		if (postData.response) {
			setReview([postData.response]);
		}
	}, [postData.response]);

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
										{el.nickName}
									</Writer>
									<Title>{el.title}</Title>
									<Content>
										<Viewer initialValue={el.content || ''} />
									</Content>
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
									<TagContainer>
										<span># 태그</span>

										<div>
											<div>
												{el.tag.map((t) => (
													<Tag>{t}</Tag>
												))}
											</div>

											{el.nickName === userInfos.nickname ? (
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
