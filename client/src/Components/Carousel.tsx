/* eslint-disable react/jsx-props-no-spreading */
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import styled from 'styled-components';

const SlideItem = styled.div`
	width: 250px;
	height: 250px;
	border: 1px solid black;
`;

function Carousel() {
	// 옵션
	const settings = {
		dots: false,
		infinite: true,
		speed: 100,
		autoplay: true,
		slidesToShow: 4,
	};

	return (
		<div>
			<Slider {...settings}>
				<SlideItem>서울</SlideItem>
				<SlideItem>제주</SlideItem>
				<SlideItem>경기</SlideItem>
				<SlideItem>강원</SlideItem>
				<SlideItem>부산</SlideItem>
				<SlideItem>울산</SlideItem>
				<SlideItem>대구</SlideItem>
				<SlideItem>대전</SlideItem>
			</Slider>
		</div>
	);
}

export default Carousel;
