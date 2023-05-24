import { useEffect, useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import img from '../../assets/jeonju.jpg';
import Pagination from './Pagination';
import { Ipost } from '../../type/Ipost';
import * as style from './CommunityStyle';
import useGet from '../../hooks/useGet';

const Container = styled.div`
	max-height: 1000px;
	height: fit-content;
	margin-left: 30px;
	display: flex;
	overflow: scroll;
	flex-wrap: wrap;

	@media (max-width: 768px) {
		margin-left: 50px;
	}

	@media (max-width: 580px) {
		margin-left: 77px;
	}

	@media (max-width: 480px) {
		margin-left: 30px;
	}

	/* @media (max-width: 1120px) {
		margin-left: 20px;
	}
	@media (max-width: 1117px) {
		margin-left: 65px;
	}

	@media (max-width: 1117px) {
		margin-left: 65px;
	} */

	a {
		text-decoration: none;
		color: black;
	}
`;

const ReviewBox = styled.div`
	border: 1px solid rgb(214, 217, 219);
	height: 270px;
	width: 220px;
	margin-bottom: 20px;
	margin-right: 30px;
	background-color: white;

	@media (max-width: 1024px) {
		margin-right: 40px;
	}

	@media (max-width: 980px) {
		margin-right: 25px;
	}

	@media (max-width: 768px) {
		margin-right: 50px;
	}

	@media (max-width: 580px) {
		width: 190px;
		margin-right: 25px;
	}

	@media (max-width: 480px) {
		width: 140px;
		height: 170px;
		margin-right: 15px;
	}

	> div:nth-child(1) {
		border-bottom: 1px solid rgb(214, 217, 219);
		height: 200px;

		@media (max-width: 480px) {
			height: 120px;
		}

		> img {
			width: 100%;
			height: 100%;
		}
	}

	> div:nth-child(2) {
		padding: 5px;
		font-size: 13px;
		height: 40px;

		@media (max-width: 480px) {
			height: 22px;
		}
	}
`;

const Writer = styled.div`
	height: 30px;
	display: flex;
	justify-content: space-between;
	align-items: center;

	> div:nth-child(1) {
		// 작성자 사진, 이름
		padding: 5px;
		display: flex;
		width: fit-content;
		align-items: center;
		font-size: 12px;

		@media (max-width: 480px) {
			display: none;
		}

		img {
			width: 20px;
			height: 20px;
			border-radius: 100%;
			margin-right: 6px;
		}
	}

	> div:nth-child(2) {
		// 좋아요 부분
		padding-right: 5px;
		color: rgb(200, 202, 204);
		display: flex;
		font-size: 13px;
		align-items: center;

		@media (max-width: 480px) {
			padding-left: 5px;
		}

		> p {
			padding-top: 2px;
			margin-left: 4px;
		}
	}
`;

function Review() {
	// eslint-disable-next-line prefer-const
	const [reviews, setReviews] = useState<Ipost[]>([]);
	const [curPage, setCurPage] = useState<number>(1);

	const startIdx = (curPage - 1) * 12;
	const endIdx = startIdx + 12;

	const response = useGet(`?size=12&subject=여행리뷰&page=${curPage}`);

	useEffect(() => {
		if (response) {
			setReviews(response);
		}
	}, [response]);

	console.log(reviews);

	return (
		<>
			<Container>
				{reviews &&
					reviews.slice(startIdx, endIdx).map((el) => (
						<Link to={`/tripreview/${el.postId}`}>
							<ReviewBox>
								<div>
									<img src={el.image[0]} alt="여행리뷰사진" />
								</div>
								<div>{el.title}</div>
								<Writer>
									<div>
										<div>
											<img src={el.member.img} alt="유저프로필사진" />
										</div>
										<div>{el.member!.nickname}</div>
									</div>

									<div>
										<AiFillHeart color="#F24F1F" size={17} />
										<p>{el.voteCount}</p>
									</div>
								</Writer>
							</ReviewBox>
						</Link>
					))}
			</Container>
			<style.PaginationContainer>
				{reviews.length > 0 ? (
					<Pagination
						curPage={curPage}
						setCurPage={setCurPage}
						totalPage={Math.ceil(reviews.length / 12)}
						totalCount={reviews.length}
						size={12}
						pageCount={5}
					/>
				) : null}
			</style.PaginationContainer>
		</>
	);
}

export default Review;
