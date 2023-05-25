import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import { HTMLAttributes, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
/* eslint-disable react/jsx-props-no-spreading */
import Slider from 'react-slick';
import styled from 'styled-components';

import useAxios from '../../hooks/useAxios';
import { Ipost } from '../../type/Ipost';
import useGet from '../../hooks/useGet';

interface SlideItemProps extends HTMLAttributes<HTMLDivElement> {
	image?: string;
}

const SlideContainer = styled(Slider)`
	display: flex;
	flex-direction: column;
	.slick-prev::before {
		color: #0db4f3;
	}
	.slick-next::before {
		color: #0db4f3;
	}
`;

const SlideItem = styled.div<SlideItemProps>`
	height: 510px;
	background-image: url(${(props) => (props.image ? props.image : '')});
	background-position: center;
	background-size: cover;
	color: white;
	font-size: 30px;
	text-align: center;
	justify-content: center;
	> div {
		line-height: 220px;
	}
`;

function ReviewCarousel() {
	// 옵션
	const settings = {
		dots: false,
		infinite: true,
		speed: 100,
		autoplay: true,
		slidesToShow: 1,
		pauseOnHover: true,
	};
	const { id } = useParams();
	const [review, setReview] = useState<Ipost[]>([]);

	const postData = useGet(`/${id}`);

	useEffect(() => {
		if (postData) {
			setReview([postData]);
		}
	}, [postData]);

	return (
		<div>
			{review.length > 0 && (
				<SlideContainer {...settings}>
					{review[0].image.map((el, idx) => (
						<SlideItem image={review[0].image[idx]} />
					))}
				</SlideContainer>
			)}
		</div>
	);
}

export default ReviewCarousel;
