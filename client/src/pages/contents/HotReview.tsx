import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import styled from 'styled-components';

import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import useGet from '../../hooks/useGet';
import { IImageProps } from '../../type/IImageProps';
import { Iposts } from '../../type/Ipost';

const backgroundImg =
	'https://images.unsplash.com/photo-1618237586696-d3690dad22e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80';

const HotReviewContainer = styled.div`
	width: 100vw;
	height: 100%;
	margin-top: 82px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	@media (min-width: 1920px) {
		margin-left: auto;
		margin-right: auto;
		max-width: 1920px;
	}
`;

const HotReviewImage = styled.div`
	width: 100%;
	height: 40vh;
	background-image: linear-gradient(
			rgba(255, 255, 255, 0.25),
			rgba(255, 255, 255, 0.25)
		),
		url(${backgroundImg});
	background-position: center;
	background-size: cover;
	display: flex;
	align-items: flex-end;
	@media (max-width: 768px) {
		height: 30vh;
	}
	> span {
		font-size: 50px;
		font-weight: 900;
		color: white;
		margin: 20px;
		@media (max-width: 768px) {
			font-size: 38px;
		}
		@media (max-width: 425px) {
			font-size: 30px;
		}
	}
`;

const HotReviewItemContainer = styled.div`
	width: 90vw;
	padding: 70px;
	@media (max-width: 768px) {
		padding: 20px;
	}
	@media (min-width: 1920px) {
		margin-left: auto;
		margin-right: auto;
		max-width: 1920px;
	}
`;

const HotReviewItem = styled.div`
	border-bottom: 1px solid black;
	padding: 20px 0;
	display: flex;
	@media (max-width: 425px) {
		display: flex;
		flex-direction: column;
	}
	@media (max-width: 768px) {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
`;

const HotReviewImg = styled.div<IImageProps>`
	width: 300px;
	height: 300px;
	background: ${(props) => (props.image ? `url(${props.image})` : '')} center /
		cover no-repeat;
	border-radius: 15px;
	@media (max-width: 768px) {
		width: 80vw;
	}
	@media (max-width: 425px) {
		width: 80vw;
		height: 20vh;
	}
`;

const HotReviewInfo = styled.div`
	width: 90%;
	margin-left: 20px;
	display: flex;
	flex-direction: column;
	font-size: 20px;
	@media (max-width: 768px) {
		margin-left: 10px;
	}
	@media (min-width: 768px) {
		width: 70%;
	}
	.hotReviewBold {
		font-size: 28px;
		font-weight: 700;
		@media (max-width: 768px) {
			margin: 20px 0 0 0;
		}
	}
	.hotReviewText {
		margin: 15px 0px;
	}
	.hotReviewAuthor {
		font-size: 24px;
		font-weight: 700;
		text-align: end;
		margin-top: 20px;
	}
`;

const StyledLink = styled(Link)`
	color: black;
	&:link {
		text-decoration: none;
	}
	&:visited {
		color: black;
	}
`;

const HotReviewNotice = styled.div`
	border-bottom: 1px solid #adadad;
	font-size: 28px;
	padding-bottom: 20px;
	@media (max-width: 768px) {
		font-size: 22px;
	}
`;

function HotReview() {
	const [filterdReview, setFilterReview] = useState<Iposts>([]);

	const response: any = useGet('?size=100&&subject=여행리뷰&date=1m&page=1');

	useEffect(() => {
		if (response !== null) {
			response.sort(
				(a: { voteCount: number }, b: { voteCount: number }) =>
					b.voteCount - a.voteCount,
			);
			setFilterReview(response.slice(0, 5));
		}
	}, [response]);

	return (
		<HotReviewContainer>
			<HotReviewImage>
				<span>🔥 인기 여행 리뷰 TOP5</span>
			</HotReviewImage>
			<HotReviewItemContainer>
				<HotReviewNotice>
					💡 최근 한 달 동안 사용자들에게 가장 인기가 많았던 리뷰들을
					소개합니다!
				</HotReviewNotice>
				{filterdReview ? (
					filterdReview.map((item) => (
						<StyledLink
							to={{ pathname: `/tripreview/${item.postId}` }}
							style={{ textDecoration: 'none' }}
						>
							<HotReviewItem key={item.postId}>
								<HotReviewImg image={item.image[0]} />
								<HotReviewInfo>
									<div className="hotReviewBold">{item.title}</div>
									<div className="hotReviewBold">💙 {item.voteCount}</div>
									{/* <div className="hotReviewText">{item.content}</div> */}
									<Viewer initialValue={item.content} />
									<div className="hotReviewAuthor">
										{item.member.nickname}
										<br />
										{item.postCreatedAt?.slice(0, 10)}
									</div>
								</HotReviewInfo>
							</HotReviewItem>
						</StyledLink>
					))
				) : (
					<div />
				)}
			</HotReviewItemContainer>
		</HotReviewContainer>
	);
}

export default HotReview;
