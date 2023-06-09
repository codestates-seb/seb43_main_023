/* eslint-disable react/jsx-props-no-spreading */
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IImageProps } from '../../type/IImageProps';
import { TripInfoType } from '../../type/ITripInfo';

const SlideContainer = styled(Slider)`
	padding: 0 10px;
	height: 210px;
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
		padding: 0 30px;
	}
`;

const SlideItem = styled.div<IImageProps>`
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

function CarouselNearbyPlace() {
	const [myLocation, setMyLocation] = useState({
		latitude: 0,
		longitude: 0,
	});
	const navigate = useNavigate();

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

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			setMyLocation({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			});
		});
	}, []);

	const tourAPIKey = process.env.REACT_APP_TOURAPI_KEY;
	const tourUrl = `https://apis.data.go.kr/B551011/KorService1/locationBasedList1?serviceKey=${tourAPIKey}&numOfRows=8&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=Q&mapX=${myLocation.longitude}&mapY=${myLocation.latitude}&radius=10000&contentTypeId=12`;

	const [tripInfo, setTripInfo] = useState([]);

	useEffect(() => {
		axios(tourUrl)
			.then((response) => {
				const { data } = response;
				setTripInfo(data.response.body.items.item);
			})
			.catch(() => {
				navigate('/error');
			});
	}, [navigate, tourUrl]);

	return (
		<div>
			<SlideContainer {...settings}>
				{tripInfo
					? tripInfo.map((item: TripInfoType) => {
							return (
								<SlideItem image={item.firstimage}>
									<div>{item.title}</div>
								</SlideItem>
							);
					  })
					: null}
			</SlideContainer>
		</div>
	);
}

export default CarouselNearbyPlace;
