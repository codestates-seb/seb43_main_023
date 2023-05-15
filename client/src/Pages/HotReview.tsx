import { HTMLAttributes, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useAxios from '../Util/customAxios';

interface SlideItemProps extends HTMLAttributes<HTMLDivElement> {
	image?: string;
}

interface IReview {
	postId: number;
	nickName: string;
	subject: string;
	title: string;
	content: string;
	tag?: null | string;
	img: string[];
	voteCount: number;
	viewCount: number;
	createdAt: string;
	modifiedAt: string;
}

const backgroundImg =
	'https://images.unsplash.com/photo-1618237586696-d3690dad22e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80';

const HotReviewContainer = styled.div`
	width: 100vw;
	height: 100%;
	margin-top: 82px;
`;

const HotReviewImage = styled.div`
	width: 100%;
	height: 460px;
	background-image: linear-gradient(
			rgba(255, 255, 255, 0.25),
			rgba(255, 255, 255, 0.25)
		),
		url(${backgroundImg});
	background-position: center;
	background-size: cover;
	display: flex;
	align-items: flex-end;
	> span {
		font-size: 50px;
		font-weight: 900;
		color: white;
		margin: 20px;
	}
`;

const HotReviewItemContainer = styled.div`
	width: 1300px;
	padding: 70px;
`;

const HotReviewItem = styled.div`
	border-bottom: 1px solid black;
	padding: 20px 0;
	display: flex;
`;

const HotReviewImg = styled.div<SlideItemProps>`
	width: 400px;
	height: 400px;
	background: ${(props) => (props.image ? `url(${props.image})` : '')} center /
		cover no-repeat;
	border-radius: 15px;
`;

const HotReviewInfo = styled.div`
	width: 900px;
	margin-left: 20px;
	display: flex;
	flex-direction: column;
	> span {
		margin: 10px;
	}
	.hotReviewBold {
		font-size: 28px;
		font-weight: 700;
	}
	.hotReviewAuthor {
		font-size: 24px;
		font-weight: 700;
		text-align: end;
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

function HotReview() {
	const [filterdReview, setFilterReview] = useState<IReview[]>([]);

	const res: any = useAxios({
		method: 'get',
		url: '/posts',
	}).response;

	useEffect(() => {
		if (res !== null) {
			const newData = res.filter(
				(item: { subject: string }) => item.subject === '여행리뷰',
			);
			newData.sort(
				(a: { voteCount: number }, b: { voteCount: number }) =>
					b.voteCount - a.voteCount,
			);
			setFilterReview(newData.slice(0, 5));
		}
	}, [res]);

	return (
		<HotReviewContainer>
			<HotReviewImage>
				<span>🔥 인기 여행 리뷰 TOP5</span>
			</HotReviewImage>
			<HotReviewItemContainer>
				{filterdReview
					? filterdReview.map((item) => (
							<StyledLink
								to={{ pathname: `/tripreview/${item.postId}` }}
								style={{ textDecoration: 'none' }}
							>
								<HotReviewItem key={item.postId}>
									<HotReviewImg image={item.img[0]} />
									<HotReviewInfo>
										<span className="hotReviewBold">{item.title}</span>
										<span className="hotReviewBold">💙 {item.voteCount}</span>
										<span>{item.content}</span>
										<span className="hotReviewAuthor">{item.nickName}</span>
									</HotReviewInfo>
								</HotReviewItem>
							</StyledLink>
					  ))
					: null}
			</HotReviewItemContainer>
		</HotReviewContainer>
	);
}

export default HotReview;
