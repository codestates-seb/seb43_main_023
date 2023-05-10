import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

/* eslint-disable react/jsx-props-no-spreading */
import Slider from 'react-slick';
import styled from 'styled-components';

import axios from 'axios';
import { HTMLAttributes, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

const SlideContainer = styled(Slider)`
	padding: 0 18px;
	display: flex;
	margin-bottom: 20px;
	.slick-prev::before {
		color: #0db4f3;
	}
	.slick-next::before {
		color: #0db4f3;
	}
	.slick-slide {
		padding: 0 20px;
	}
`;

const ReviewContainer = styled.div`
	border: 1px solid rgb(214, 217, 219);
	height: 270px;
	width: 210px;
	margin-bottom: 20px;
	margin-right: 45px;
	background-color: white;
	text-align: start;
`;

const ReviewImg = styled.div<SlideItemProps>`
	width: 100%;
	height: 180px;
	background: ${(props) => (props.image ? `url(${props.image})` : '')} center /
		cover no-repeat;
`;

const ReviewTextContainer = styled.div`
	width: 100%;
	height: 90px;
	border: 1px solid rgb(214, 217, 219);
	padding: 10px;

	.title {
		font-size: 17px;
		font-weight: 700;
	}
	.content {
		font-size: 14px;
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin: 5px 0;
	}
	.userInfo {
		display: flex;
		justify-content: space-between;
		font-size: 14px;
	}
`;

function CarouselReview() {
	const [filterdReview, setFilterReview] = useState<IReview[]>([]);
	const navigate = useNavigate();

	const reviewCarouselCount = () => {
		switch (filterdReview.length) {
			case 0:
				return 0;
			case 1:
				return 1;
			case 2:
				return 1;
			case 3:
				return 2;
			default:
				return 3;
		}
	};

	const settings = {
		dots: false,
		infinite: true,
		speed: 100,
		autoplay: true,
		slidesToShow: reviewCarouselCount(),
		pauseOnHover: true,
	};

	useEffect(() => {
		setTimeout(() => {
			axios(`http://localhost:4000/posts`)
				.then((response) => {
					const { data } = response;
					const newData = data.filter(
						(item: { subject: string }) => item.subject === '여행리뷰',
					);
					newData.sort(
						(a: { voteCount: number }, b: { voteCount: number }) =>
							b.voteCount - a.voteCount,
					);
					setFilterReview(newData.slice(0, 5));
				})
				.catch(() => {
					navigate('/error');
				});
		}, 500);
	}, [navigate]);

	return (
		<div>
			<SlideContainer {...settings}>
				{filterdReview
					? filterdReview.map((item) => (
							<ReviewContainer>
								<ReviewImg image={item.img[0]} />
								<ReviewTextContainer>
									<div className="title">{item.title}</div>
									<div className="content">{item.content}</div>
									<div className="userInfo">
										<span>{item.nickName}</span>
										<span>💙 {item.voteCount}</span>
									</div>
								</ReviewTextContainer>
							</ReviewContainer>
					  ))
					: null}
			</SlideContainer>
		</div>
	);
}

export default CarouselReview;
