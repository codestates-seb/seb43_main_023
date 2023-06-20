/* eslint-disable react/jsx-props-no-spreading */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import styled from 'styled-components';
import { IImageProps } from '../../type/IImageProps';

const SlideContainer = styled(Slider)`
	width: 100%;
	display: flex;
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

const SlideItem = styled.div<IImageProps>`
	width: 100%;
	height: 400px;
	background: ${(props) => (props.image ? `url(${props.image})` : '')} center /
		cover no-repeat;
	opacity: 0.9;
	color: black;
	border-radius: 15px;
`;

const SlideTextBox = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	text-align: center;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.eventTitle {
		background: rgba(255, 255, 255, 0.7);
		font-size: 30px;
		@media (max-width: 768px) {
			font-size: 20px;
		}
	}
	.eventDate {
		background: rgba(255, 255, 255, 0.7);
		@media (max-width: 768px) {
			font-size: 20px;
		}
	}
`;

function Banner() {
	const settings: Settings = {
		// dots: false,
		// infinite: true,
		// fade: true,
		// speed: 100,
		// autoplay: true,
		// slidesToShow: 4,
		// pauseOnHover: true,
		// lazyLoad: 'anticipated',
		dots: false,
		infinite: true,
		speed: 100,
		autoplay: true,
		slidesToShow: 3,
		pauseOnHover: true,
		lazyLoad: 'anticipated',
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 769,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	};

	const [eventInfo, serEventInfo] = useState([]);
	const navigate = useNavigate();

	const newDate = new Date();
	const startDate = `${newDate.getFullYear()}${
		newDate.getMonth() + 1 < 10
			? `0${newDate.getMonth() + 1}`
			: newDate.getMonth() + 1
	}01`;

	const eventAPIKey = process.env.REACT_APP_TOURAPI_KEY;
	const tourUrl = `https://apis.data.go.kr/B551011/KorService1/searchFestival1?serviceKey=${eventAPIKey}&numOfRows=5&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=R&eventStartDate=${startDate}`;

	useEffect(() => {
		axios(tourUrl)
			.then((response) => {
				const { data } = response;
				serEventInfo(data.response.body.items.item);
			})
			.catch(() => {
				navigate('/error');
			});
	}, [navigate, tourUrl]);

	type EventType = {
		firstimage: string;
		title: string;
		eventstartdate: string;
		eventenddate: string;
	};

	const handleLink = (link: string) => {
		window.open(
			`https://www.google.com/search?q=${link}`,
			'_blank',
			'noopener, noreferrer',
		);
	};

	return (
		<div>
			<SlideContainer {...settings}>
				{eventInfo
					? eventInfo.map((item: EventType) => {
							return (
								<SlideItem
									onClick={() => handleLink(`${item.title}`)}
									image={item.firstimage}
								>
									<SlideTextBox>
										<div className="eventTitle">{item.title}</div>
										<div className="eventDate">
											({item.eventstartdate.substr(4)} ~{' '}
											{item.eventenddate.substr(4)})
										</div>
									</SlideTextBox>
								</SlideItem>
							);
					  })
					: null}
			</SlideContainer>
		</div>
	);
}

export default Banner;
