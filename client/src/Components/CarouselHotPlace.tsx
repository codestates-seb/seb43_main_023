/* eslint-disable react/jsx-props-no-spreading */
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import { HTMLAttributes } from 'react';
import styled from 'styled-components';

interface SlideItemProps extends HTMLAttributes<HTMLDivElement> {
	image?: string;
}

const SlideContainer = styled(Slider)`
	padding: 0 10px;
	display: flex;
	margin-bottom: 20px;
	.slick-prev::before {
		color: #0db4f3;
	}
	.slick-next::before {
		color: #0db4f3;
	}
	.slick-slide {
		padding: 0 30px;
	}
`;

const SlideItem = styled.div<SlideItemProps>`
	width: 220px;
	height: 220px;
	background: ${(props) => (props.image ? `url(${props.image})` : '')} center /
		cover no-repeat;
	color: white;
	font-size: 30px;
	font-weight: 700;
	border-radius: 15px;
	text-align: center;
	justify-content: center;
	> div {
		line-height: 220px;
	}
`;

function CarouselHotPlace() {
	// 옵션
	const settings: Settings = {
		dots: false,
		infinite: true,
		speed: 100,
		autoplay: true,
		slidesToShow: 4,
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

	return (
		<div>
			<SlideContainer {...settings}>
				<SlideItem image="https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=9c991ae8-67f8-4037-a3b3-dd2ed916a161">
					<div>월미테마파크</div>
				</SlideItem>
				<SlideItem image="https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=42c91d42-7f91-4c72-9794-8f93a2662228">
					<div>백야자연휴양림</div>
				</SlideItem>
				<SlideItem image="https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=a1ffcd56-ba0f-4171-a4a2-3111da89ec8c">
					<div>대포해안</div>
				</SlideItem>
				<SlideItem image="https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=786b4ca3-8549-47b6-a47e-368aa9b5b8dd">
					<div>화암관광지</div>
				</SlideItem>
				<SlideItem image="https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=7319438e-4e09-4fbd-9524-e25420bdd917">
					<div>강천산 군립공원</div>
				</SlideItem>
			</SlideContainer>
		</div>
	);
}

export default CarouselHotPlace;
