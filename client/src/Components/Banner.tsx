/* eslint-disable react/jsx-props-no-spreading */
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import styled from 'styled-components';

const SlideItem = styled.div`
	width: 90%;
	height: 180px;
	border: 1px solid black;
`;

function Banner() {
	// 옵션
	const settings = {
		dots: false,
		infinite: true,
		speed: 100,
		autoplay: true,
		slidesToShow: 1,
	};

	return (
		<div>
			<Slider {...settings}>
				<SlideItem>축제1</SlideItem>
				<SlideItem>축제2</SlideItem>
				<SlideItem>축제3</SlideItem>
			</Slider>
		</div>
	);
}

export default Banner;
