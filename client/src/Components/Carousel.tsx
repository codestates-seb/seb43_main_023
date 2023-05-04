/* eslint-disable react/jsx-props-no-spreading */
import Slider from 'react-slick';
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
	.slick-prev::before {
		color: #0db4f3;
	}
	.slick-next::before {
		color: #0db4f3;
	}
`;

const SlideItem = styled.div<SlideItemProps>`
	width: 220px;
	height: 220px;
	background-image: url(${(props) => (props.image ? props.image : '')});
	background-position: center;
	background-size: cover;
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

function Carousel() {
	// 옵션
	const settings = {
		dots: false,
		infinite: true,
		speed: 100,
		autoplay: true,
		slidesToShow: 4,
		pauseOnHover: true,
	};

	return (
		<div>
			<SlideContainer {...settings}>
				<SlideItem image="https://a.cdn-hotels.com/gdcs/production117/d150/1049d859-3926-4a0d-8ae2-d7e227f902c2.jpg?impolicy=fcrop&w=800&h=533&q=medium">
					<div>서울</div>
				</SlideItem>
				<SlideItem image="https://images.unsplash.com/photo-1579169825453-8d4b4653cc2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80">
					<div>제주</div>
				</SlideItem>
				<SlideItem image="https://images.unsplash.com/photo-1676705910596-10a68dccbe8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80">
					<div>강원</div>
				</SlideItem>
				<SlideItem image="https://images.unsplash.com/photo-1607165398235-5f43c715f57b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1718&q=80">
					<div>경기</div>
				</SlideItem>
				<SlideItem image="https://images.unsplash.com/photo-1638591751482-1a7d27fcea15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80">
					<div>부산</div>
				</SlideItem>
				<SlideItem image="https://images.unsplash.com/photo-1654061394903-fd141e2c97bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80">
					<div>울산</div>
				</SlideItem>
				<SlideItem image="https://images.unsplash.com/photo-1549898395-045c8fa2883b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80">
					<div>대구</div>
				</SlideItem>
				<SlideItem image="http://newsimg.hankookilbo.com/2016/10/21/201610211159329181_1.jpg">
					<div>대전</div>
				</SlideItem>

				<SlideItem image="https://images.unsplash.com/photo-1634131431002-8fe857eb64a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80">
					<div>인천</div>
				</SlideItem>
				<SlideItem image="https://images.unsplash.com/photo-1593419522318-81b7c346a3e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2854&q=80">
					<div>광주</div>
				</SlideItem>

				<SlideItem image="https://images.unsplash.com/photo-1529528070131-eda9f3e90919?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80">
					<div>경상남도</div>
				</SlideItem>

				<SlideItem image="https://images.unsplash.com/photo-1669764372822-3cb8476d4f47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80">
					<div>경상북도</div>
				</SlideItem>
				<SlideItem image="https://cdn.gjdream.com/news/photo/202101/605746_205437_2251.jpg">
					<div>전라남도</div>
				</SlideItem>
				<SlideItem image="https://images.unsplash.com/photo-1653329315898-afe70b1335ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80">
					<div>전라북도</div>
				</SlideItem>
				<SlideItem image="https://cdn.imweb.me/thumbnail/20190505/5cce19e7b096e.jpg">
					<div>충청남도</div>
				</SlideItem>
				<SlideItem image="https://t1.daumcdn.net/cfile/tistory/99FFCA4A5C63A9B50D">
					<div>충청북도</div>
				</SlideItem>
			</SlideContainer>
		</div>
	);
}

export default Carousel;
