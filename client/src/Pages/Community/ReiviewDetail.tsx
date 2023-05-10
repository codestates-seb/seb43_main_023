import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../Global.css';
import styled from 'styled-components';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import ReviewCarousel from '../../Components/Community/ReviewCarousel';
import MapApi from '../../Components/Community/MapApi';
import Answers from '../../Components/Community/Answers';

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
	interface Review {
		postId: number;
		title: string;
		content: string;
		nickName: string;
		img: string[];
		viewCount: number;
		voteCount: number;
		createdAt: string;
	}
	const { id } = useParams();
	const [review, setReview] = useState<Review[]>([]);

	useEffect(() => {
		axios
			.get(`http://localhost:4000/posts/${id}`)
			.then((res) => setReview([res.data]));
	}, [id]);

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
									<Content>{el.content}</Content>
									<Vote>
										<AiOutlineHeart color="#646464" size={21} />
										<span>
											{el.voteCount}
											명이 해당 게시글을 좋아합니다.
										</span>
									</Vote>
									<TagContainer>
										<span># 태그</span>

										<div>
											<div>
												<Tag>ESFJ</Tag>
												<Tag>1인</Tag>
												<Tag>힐링여행</Tag>
											</div>

											<div>
												<BsPencilSquare />
												<BsTrash />
											</div>
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
