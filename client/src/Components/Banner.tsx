/* eslint-disable react/jsx-props-no-spreading */
import axios from 'axios';
import { HTMLAttributes, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
	background: ${(props) => (props.image ? `url(${props.image})` : '')} center /
		cover no-repeat;
	color: white;
	border-radius: 15px;
	font-size: 30px;
	font-weight: 700;
	text-align: center;
	justify-content: center;
	> div {
		line-height: 180px;
		> span {
			font-size: 24px;
		}
	}
`;

function Banner() {
	const settings = {
		dots: false,
		infinite: true,
		fade: true,
		speed: 100,
		autoplay: true,
		slidesToShow: 1,
	};

	const [eventInfo, serEventInfo] = useState([]);
	const navigate = useNavigate();

	const eventAPIKey = process.env.REACT_APP_TOURAPI_KEY;
	const tourUrl = `https://apis.data.go.kr/B551011/KorService1/searchFestival1?serviceKey=${eventAPIKey}&numOfRows=5&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=R&eventStartDate=20230501`;

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

	return (
		<div>
			<SlideContainer {...settings}>
				{eventInfo
					? eventInfo.map((item: any) => {
							return (
								<SlideItem image={item.firstimage}>
									<div>
										{item.title}
										<span>
											({item.eventstartdate.substr(4)} ~{' '}
											{item.eventenddate.substr(4)})
										</span>
									</div>
								</SlideItem>
							);
					  })
					: null}
			</SlideContainer>
		</div>
	);
}

export default Banner;
