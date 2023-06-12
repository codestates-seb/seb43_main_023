import { useEffect, useState } from 'react';

import { AiFillHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// eslint-disable-next-line import/no-extraneous-dependencies
import AWS from 'aws-sdk';
import useGet from '../../hooks/useGet';
import { Ipost } from '../../type/Ipost';
import * as style from './CommunityStyle';
import Pagination from './Pagination';

const Container = styled.div`
	max-height: 1000px;
	height: fit-content;
	margin-left: 30px;
	display: flex;
	overflow: scroll;
	flex-wrap: wrap;
	&::-webkit-scrollbar {
		display: none;
	}
	@media (max-width: 768px) {
		margin-left: 50px;
	}

	@media (max-width: 580px) {
		margin-left: 77px;
	}

	@media (max-width: 480px) {
		margin-left: 30px;
	}

	a {
		text-decoration: none;
		color: black;
	}
`;

const ReviewBox = styled.div`
	border: 1px solid rgb(214, 217, 219);
	height: 270px;
	width: 220px;
	margin-bottom: 20px;
	margin-right: 30px;
	background-color: white;

	@media (max-width: 1024px) {
		margin-right: 40px;
	}

	@media (max-width: 980px) {
		margin-right: 25px;
	}
	@media (max-width: 768px) {
		margin-right: 50px;
	}

	@media (max-width: 580px) {
		width: 190px;
		margin-right: 25px;
	}

	@media (max-width: 480px) {
		width: 140px;
		height: 170px;
		margin-right: 15px;
	}

	> div:nth-child(1) {
		border-bottom: 1px solid rgb(214, 217, 219);
		height: 200px;

		@media (max-width: 480px) {
			height: 120px;
		}

		> img {
			width: 100%;
			height: 100%;
		}
	}

	> div:nth-child(2) {
		padding: 5px;
		font-size: 13px;
		height: 40px;

		@media (max-width: 480px) {
			height: 22px;
		}
	}
`;

const Writer = styled.div`
	height: 30px;
	display: flex;
	justify-content: space-between;
	align-items: center;

	> div:nth-child(1) {
		// 작성자 사진, 이름
		padding: 5px;
		display: flex;
		width: fit-content;
		align-items: center;
		font-size: 12px;

		@media (max-width: 480px) {
			display: none;
		}

		img {
			width: 20px;
			height: 20px;
			border-radius: 100%;
			margin-right: 6px;
		}
	}

	> div:nth-child(2) {
		// 좋아요 부분
		padding-right: 5px;
		color: rgb(200, 202, 204);
		display: flex;
		font-size: 13px;
		align-items: center;

		@media (max-width: 480px) {
			padding-left: 5px;
		}

		> p {
			padding-top: 2px;
			margin-left: 4px;
		}
	}
`;

function Review() {
	// eslint-disable-next-line prefer-const
	const [reviews, setReviews] = useState<Ipost[]>([]);
	const [curPage, setCurPage] = useState<number>(1);
	const [imageDataBucket, setImageDataBucket] = useState<string[]>([]);
	const [imageData, setImageData] = useState<string[]>([]);
	const bucketName = 'imageupload-practice';

	AWS.config.update({
		region: process.env.REACT_APP_REGION,
		accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
		secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY_ID,
	});

	const startIdx = (curPage - 1) * 15;
	const endIdx = startIdx + 15;

	const response = useGet(`?size=100&subject=여행리뷰&page=1`);

	useEffect(() => {
		if (response) {
			setReviews(response);
		}
	}, [response]);

	useEffect(() => {
		const s3 = new AWS.S3();
		if (reviews && reviews.length > 0) {
			const getImagesFromBucket = async (image: string | undefined) => {
				const imageKeys = reviews.filter((el) => el.image.length > 0);

				try {
					const urls = await Promise.all(
						imageKeys.map((key) => {
							const params = { Bucket: bucketName, Key: image };
							return s3.getSignedUrlPromise('getObject', params);
						}),
					);
					setImageDataBucket(urls);
				} catch (error) {
					/* empty */
				}
			};

			// eslint-disable-next-line consistent-return
			const checkImagesFromBucket = async () => {
				// eslint-disable-next-line no-restricted-syntax
				for (const post of reviews) {
					// eslint-disable-next-line no-restricted-syntax
					for (const image of post.image) {
						try {
							const params = { Bucket: bucketName, Key: image };
							// eslint-disable-next-line no-await-in-loop
							await s3.headObject(params).promise();
							getImagesFromBucket(image);
							return true;
						} catch (error: any) {
							if (error.code === 'NotFound') {
								return false;
							}
						}
					}
				}
			};

			checkImagesFromBucket();
		}
	}, [reviews]);

	return (
		<>
			<Container>
				{reviews &&
					reviews.slice(startIdx, endIdx).map((el) => (
						<Link to={`/tripreview/${el.postId}`}>
							<ReviewBox>
								<div>
									{imageDataBucket.length > 0 ? (
										<img src={imageDataBucket[0]} alt="게시글 사진 미리보기" />
									) : (
										<img src={el.image[0]} alt="게시글 사진 미리보기" />
									)}
								</div>
								<div>{el.title}</div>
								<Writer>
									<div>
										<div>
											<img src={el.member.img} alt="유저프로필사진" />
										</div>
										<div>{el.member!.nickname}</div>
									</div>

									<div>
										<AiFillHeart color="#F24F1F" size={17} />
										<p>{el.voteCount}</p>
									</div>
								</Writer>
							</ReviewBox>
						</Link>
					))}
			</Container>
			<style.PaginationContainer>
				{reviews.length > 0 ? (
					<Pagination
						curPage={curPage}
						setCurPage={setCurPage}
						totalPage={Math.ceil(reviews.length / 15)}
						totalCount={reviews.length}
						size={15}
						pageCount={5}
					/>
				) : null}
			</style.PaginationContainer>
		</>
	);
}

export default Review;
