import { useEffect, useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useAxios from '../../Util/customAxios';
import img from '../../assets/jeonju.jpg';
import Pagination from './Pagination';

const Container = styled.div`
	min-height: 600px;
	max-height: 600px;
	margin-left: 35px;
	display: flex;
	overflow: scroll;
	flex-wrap: wrap;

	a {
		text-decoration: none;
		color: black;
	}
`;

const ReviewBox = styled.div`
	border: 1px solid rgb(214, 217, 219);
	height: 270px;
	width: 210px;
	margin-bottom: 20px;
	margin-right: 45px;
	background-color: white;

	> div:nth-child(1) {
		border-bottom: 1px solid rgb(214, 217, 219);
		height: 200px;

		> img {
			width: 100%;
			height: 100%;
		}
	}

	> div:nth-child(2) {
		padding: 5px;
		font-size: 13px;
		height: 40px;
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

		> p {
			padding-top: 2px;
			margin-left: 4px;
		}
	}
`;

const PaginationContainer = styled.div`
	margin-top: 10px;
	height: 32px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
`;

function Review() {
	interface ReviewInter {
		postId: number;
		subject: string;
		title: string;
		nickname: string;
		voteCount: number;
		createdAt: string;
		tag: string;
		image: string[];
	}

	// eslint-disable-next-line prefer-const
	const [reviews, setReviews] = useState<ReviewInter[]>([]);
	const [curPage, setCurPage] = useState<number>(1);

	const startIdx = (curPage - 1) * 8;
	const endIdx = startIdx + 8;

	const { response } = useAxios({
		method: 'get',
		url: '/posts?subject=여행리뷰&page=1',
	});

	useEffect(() => {
		if (response) {
			setReviews(response);
		}
	}, [response]);

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
											<img src={img} alt="유저프로필사진" />
										</div>
										<div>{el.nickname}</div>
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
			<PaginationContainer>
				<Pagination
					curPage={curPage}
					setCurPage={setCurPage}
					totalPage={Math.ceil(reviews.length / 8)}
					totalCount={reviews.length}
					size={8}
					pageCount={5}
				/>
			</PaginationContainer>
		</>
	);
}

export default Review;
