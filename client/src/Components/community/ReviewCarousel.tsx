import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import { HTMLAttributes, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
/* eslint-disable react/jsx-props-no-spreading */
import Slider from 'react-slick';
import styled from 'styled-components';

// eslint-disable-next-line import/no-extraneous-dependencies
import AWS from 'aws-sdk';
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
	const [imageDataBucket, setImageDataBucket] = useState<string[]>([]);
	const [imageData, setImageData] = useState<string[]>([]);
	const [review, setReview] = useState<Ipost[]>([]);
	const bucketName = 'imageupload-practice';

	AWS.config.update({
		region: process.env.REACT_APP_REGION,
		accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
		secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY_ID,
	});

	const postData = useGet(`/${id}`);

	useEffect(() => {
		if (postData) {
			setReview([postData]);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [postData]);

	useEffect(() => {
		const s3 = new AWS.S3();
		if (review && review.length > 0) {
			const getImagesFromBucket = async () => {
				const imageKeys = review[0].image;

				try {
					const urls = await Promise.all(
						imageKeys.map((key) => {
							const params = { Bucket: bucketName, Key: key };
							return s3.getSignedUrlPromise('getObject', params);
						}),
					);
					setImageDataBucket(urls);
				} catch (error) {
					console.error('Error retrieving images from bucket:', error);
				}
			};

			const checkImagesExistence = async () => {
				const imageExistsPromises = review[0].image.map(async (key) => {
					const params = { Bucket: bucketName, Key: key };
					try {
						await s3.headObject(params).promise();
						return true;
					} catch (error: any) {
						if (error.code === 'NotFound') {
							return false;
						}
						throw error;
					}
				});

				const imageExistence = await Promise.all(imageExistsPromises);
				const allImagesExist = imageExistence.every((exists) => exists);

				if (allImagesExist) {
					getImagesFromBucket();
				} else {
					setImageData(review[0].image);
				}
			};

			checkImagesExistence();
		}
	}, [review]);

	return (
		<div>
			{review.length > 0 && (
				<SlideContainer {...settings}>
					{imageDataBucket.length > 0
						? imageDataBucket.map((el, idx) => (
								<SlideItem image={imageDataBucket[idx]} />
						  ))
						: imageData.map((el, idx) => <SlideItem image={imageData[idx]} />)}
				</SlideContainer>
			)}
		</div>
	);
}

export default ReviewCarousel;
