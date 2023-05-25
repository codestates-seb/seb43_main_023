import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

/* eslint-disable react/jsx-props-no-spreading */
import Slider, { Settings } from 'react-slick';
import styled from 'styled-components';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useGet from '../../hooks/useGet';
import { IImageProps } from '../../type/IImageProps';
import { Iposts } from '../../type/Ipost';

const SlideContainer = styled(Slider)`
	padding: 0 18px;
	width: 100%;
	display: flex;
	justify-content: center;
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
	height: 220px;
	margin-bottom: 20px;
	background-color: white;
	text-align: start;
`;

const ReviewImg = styled.div<IImageProps>`
	width: 100%;
	height: 140px;
	background: ${(props) => (props.image ? `url(${props.image})` : '')} center /
		cover no-repeat;
`;

const ReviewTextContainer = styled.div`
	width: 100%;
	height: 80px;
	border: 1px solid rgb(214, 217, 219);
	padding: 5px;

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

const StyledLink = styled(Link)`
	color: black;
	&:link {
		text-decoration: none;
	}
	&:visited {
		color: black;
	}
`;

function CarouselReview() {
	const [filterdReview, setFilterReview] = useState<Iposts>([]);

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

	const settings: Settings = {
		dots: false,
		infinite: true,
		speed: 100,
		autoplay: true,
		slidesToShow: reviewCarouselCount(),
		pauseOnHover: true,
		lazyLoad: 'anticipated',
		responsive: [
			{
				breakpoint: 1025,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 769,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 425,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	};

	const response: any = useGet('?size=100&&subject=여행리뷰&date=1m&page=1');

	useEffect(() => {
		if (response !== null) {
			response.sort(
				(a: { voteCount: number }, b: { voteCount: number }) =>
					b.voteCount - a.voteCount,
			);
			setFilterReview(response.slice(0, 5));
		}
	}, [response]);

	return (
		<div>
			<SlideContainer {...settings}>
				{filterdReview
					? filterdReview.map((item) => (
							<StyledLink
								to={{ pathname: `/tripreview/${item.postId}` }}
								style={{ textDecoration: 'none' }}
							>
								<ReviewContainer>
									<ReviewImg image={item.image[0]} />
									<ReviewTextContainer>
										<div className="title">{item.title}</div>
										<div className="content">{item.content}</div>
										<div className="userInfo">
											<span> {item.member.nickname}</span>
											<span>💙 {item.voteCount}</span>
										</div>
									</ReviewTextContainer>
								</ReviewContainer>
							</StyledLink>
					  ))
					: null}
			</SlideContainer>
		</div>
	);
}

export default CarouselReview;
