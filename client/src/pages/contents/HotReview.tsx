import { HTMLAttributes, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import styled from 'styled-components';

import useAxios from '../../hooks/useAxios';

interface SlideItemProps extends HTMLAttributes<HTMLDivElement> {
	image?: string;
}

interface IReview {
	id: number;
	nickName: string;
	subject: string;
	title: string;
	content: string;
	tag?: null | string;
	img: string[];
	voteCount: number;
	viewCount: number;
	createdAt: string;
	modifiedAt: string;
}

const backgroundImg =
	'https://images.unsplash.com/photo-1618237586696-d3690dad22e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80';

const HotReviewContainer = styled.div`
	width: 100vw;
	height: 100%;
	margin-top: 82px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const HotReviewImage = styled.div`
	width: 100%;
	height: 40vh;
	background-image: linear-gradient(
			rgba(255, 255, 255, 0.25),
			rgba(255, 255, 255, 0.25)
		),
		url(${backgroundImg});
	background-position: center;
	background-size: cover;
	display: flex;
	align-items: flex-end;
	@media (max-width: 768px) {
		height: 30vh;
	}
	> span {
		font-size: 50px;
		font-weight: 900;
		color: white;
		margin: 20px;
		@media (max-width: 425px) {
			font-size: 36px;
		}
	}
`;

const HotReviewItemContainer = styled.div`
	width: 90vw;
	padding: 70px;
	@media (max-width: 768px) {
		padding: 20px;
	}
`;

const HotReviewItem = styled.div`
	border-bottom: 1px solid black;
	padding: 20px 0;
	display: flex;
	@media (max-width: 425px) {
		display: flex;
		flex-direction: column;
	}
	@media (max-width: 768px) {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
`;

const HotReviewImg = styled.div<SlideItemProps>`
	width: 300px;
	height: 300px;
	background: ${(props) => (props.image ? `url(${props.image})` : '')} center /
		cover no-repeat;
	border-radius: 15px;
	@media (max-width: 768px) {
		width: 80vw;
	}
	@media (max-width: 425px) {
		width: 80vw;
		height: 20vh;
	}
`;

const HotReviewInfo = styled.div`
	width: 70%;
	margin-left: 20px;
	display: flex;
	flex-direction: column;
	> span {
		margin: 10px;
		font-size: 20px;
		@media (max-width: 768px) {
			width: 80vw;
			margin-left: 0;
		}
	}
	@media (max-width: 768px) {
		margin-left: 0;
	}
	.hotReviewBold {
		font-size: 28px;
		font-weight: 700;
		@media (max-width: 768px) {
			margin: 20px 0 0 0;
		}
	}
	.hotReviewAuthor {
		font-size: 24px;
		font-weight: 700;
		text-align: end;
	}
`;

const StyledLink = styled(Link)`
	color: black;
	&:link {
		text-decoration: none;
	}
	&:visited {
		color: black;
	}
`;

function HotReview() {
	const [filterdReview, setFilterReview] = useState<IReview[]>([]);

	const res: any = useAxios({
		method: 'get',
		url: '/posts',
	}).response;

	useEffect(() => {
		if (res !== null) {
			const newData = res.filter(
				(item: { subject: string }) => item.subject === '여행리뷰',
			);
			newData.sort(
				(a: { voteCount: number }, b: { voteCount: number }) =>
					b.voteCount - a.voteCount,
			);
			setFilterReview(newData.slice(0, 5));
		}
	}, [res]);

	return (
		<HotReviewContainer>
			<HotReviewImage>
				<span>🔥 인기 여행 리뷰 TOP5</span>
			</HotReviewImage>
			<HotReviewItemContainer>
				{filterdReview
					? filterdReview.map((item) => (
							<StyledLink
								to={{ pathname: `/tripreview/${item.id}` }}
								style={{ textDecoration: 'none' }}
							>
								<HotReviewItem key={item.id}>
									<HotReviewImg image={item.img[0]} />
									<HotReviewInfo>
										<span className="hotReviewBold">{item.title}</span>
										<span className="hotReviewBold">💙 {item.voteCount}</span>
										<span>{item.content}</span>
										<span className="hotReviewAuthor">{item.nickName}</span>
									</HotReviewInfo>
								</HotReviewItem>
							</StyledLink>
					  ))
					: null}
			</HotReviewItemContainer>
		</HotReviewContainer>
	);
}

export default HotReview;
