import { useEffect, useState } from 'react';

import { AiFillHeart } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Iuser } from '../../Reducers/userInfoReducer';
import { RootState } from '../../Store/store';
import { Api } from '../../Util/customAPI';

const Container = styled.ul`
	width: 95%;
	display: flex;
	justify-content: center;
	align-items: center;
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
	margin: 0 20px 30px 20px;
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

function MyReview() {
	const userInfos = useSelector((state: RootState) => state.user) as Iuser;

	interface ReviewInter {
		email: string;
		id: number;
		subject: string;
		title: string;
		nickName: string;
		voteCount: number;
		createdAt: string;
		tag: string;
		img: string[];
	}

	// eslint-disable-next-line prefer-const
	let [reviews, setReviews] = useState<ReviewInter[]>([]);
	useEffect(() => {
		Api.get('/posts').then((res) => setReviews(res.data));
	}, []);

	reviews = reviews.filter(
		(el) => el.subject === '여행리뷰' && el.email === userInfos.email,
	);

	return (
		<Container>
			{reviews &&
				reviews.map((el) => (
					<li key={el.id}>
						<Link to={`/tripreview/${el.id}`}>
							<ReviewBox>
								<div>
									<img src={el.img[0]} alt="여행리뷰사진" />
								</div>
								<div>{el.title}</div>
								<Writer>
									<div>
										<div>
											<img src={userInfos.img} alt="유저프로필사진" />
										</div>
										<div>{el.nickName}</div>
									</div>

									<div>
										<AiFillHeart color="#F24F1F" size={17} />
										<p>{el.voteCount}</p>
									</div>
								</Writer>
							</ReviewBox>
						</Link>
					</li>
				))}
		</Container>
	);
}

export default MyReview;
