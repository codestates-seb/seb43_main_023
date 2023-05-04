/* eslint-disable react/jsx-props-no-spreading */
import { HTMLAttributes } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import styled from 'styled-components';

interface SlideItemProps extends HTMLAttributes<HTMLDivElement> {
	image?: string;
}

const SlideContainer = styled(Slider)`
	.slick-prev::before {
		color: #0db4f3;
	}
	.slick-next::before {
		color: #0db4f3;
	}
	.slick-slide {
		padding: 0 40px;
	}
`;

const SlideItem = styled.div<SlideItemProps>`
	width: 100%;
	height: 180px;
	background-image: url(${(props) => (props.image ? props.image : '')});
	background-position: center;
	background-size: cover;
	color: white;
	border-radius: 15px;
	font-size: 30px;
	font-weight: 700;
	text-align: center;
	justify-content: center;
	> div {
		line-height: 180px;
	}
`;

function Banner() {
	// 옵션
	const settings = {
		dots: false,
		infinite: true,
		fade: true,
		speed: 100,
		autoplay: true,
		slidesToShow: 1,
	};

	return (
		<div>
			<SlideContainer {...settings}>
				<SlideItem image="https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1773&q=80">
					<div>부산 6월 광안리 불꽃축제</div>
				</SlideItem>
				<SlideItem image="https://images.unsplash.com/photo-1581938165093-050aeb5ef218?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80">
					<div>곡성 세계장미축제</div>
				</SlideItem>
				<SlideItem image="https://images.unsplash.com/photo-1626903896356-06b7ca2810fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80">
					<div>담양 대나무축제</div>
				</SlideItem>
			</SlideContainer>
		</div>
	);
}

export default Banner;
