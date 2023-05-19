import { useEffect, useState } from 'react';

import axios from 'axios';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Pagination from '../Components/ccc/Pagination';
import useAxios from '../hooks/useAxios';
import { IKeyword } from '../rrr/searchKeywordReducer';
import { RootState } from '../sss/store';

const Container = styled.div`
	min-height: 100vh;
`;

const SearchContainer = styled.div`
	width: 100%;
	height: 100%;
	margin-top: 82px;
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const SearchAPI = styled.div`
	margin-top: 30px;
	width: 90%;
	border: 1px solid #d9d9d9;
	border-radius: 15px;
	padding: 20px;
	display: flex;
	flex-direction: column;
	font-size: 24px;
	font-weight: 700;
	.keyword {
		color: #0db4f3;
	}
`;

const APIContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
`;

const SearchAd = styled.div`
	margin-top: 50px;
	width: 90%;
	border: 1px solid #d9d9d9;
	border-radius: 15px;
	padding: 20px;
	display: flex;
	flex-direction: column;
	font-size: 24px;
	font-weight: 700;
	.keyword {
		color: #0db4f3;
	}
`;

const AdItemContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
`;

const AdItem = styled.div`
	width: 20%;
	height: 300px;
	border: 1px solid #d9d9d9;
	border-radius: 15px;
	/* padding: 10px; */
	margin: 10px;
	.adimg {
		width: 100%;
		height: 70%;
		border-top-right-radius: 15px;
		border-top-left-radius: 15px;
		border-bottom: 1px solid #d9d9d9;
	}
	.adtext {
		width: 100%;
		height: 30%;
		font-weight: 300;
		font-size: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 5px;
	}
`;

const SearchResult = styled.div`
	width: 90%;
	border: 1px solid #d9d9d9;
	border-radius: 15px;
	margin-top: 50px;
	padding: 20px;
	display: flex;
	flex-direction: column;
	font-size: 24px;
	font-weight: 700;
	.keyword {
		color: #0db4f3;
	}
`;

const ResultContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-top: 10px;
`;

const ResultItem = styled.div`
	width: 95%;
	height: 210px;
	border: 1px solid #d9d9d9;
	border-radius: 15px;
	padding: 15px;
	margin: 12px 0;
	display: flex;
	cursor: pointer;
`;

const ResultText = styled.div`
	width: 80%;
	display: flex;
	flex-direction: column;
	.subject {
		margin-right: 20px;
	}
	.content {
		padding: 10px 30px;
		height: 120px;
		font-size: 20px;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.author {
		text-align: end;
	}
`;

const ResultImg = styled.img`
	width: 20%;
	border-radius: 15px;
	margin-left: 20px;
`;

interface tourAPIType {
	firstimage: string;
	title: string;
}

interface postType {
	id: number;
	title: string;
	content: string;
	subject: string;
	nickName: string;
	image: string[];
}

function Search() {
	const keyword = useSelector((state: RootState) => state.search) as IKeyword;
	const [tourResult, setTourResult] = useState([]);
	const [posts, setPosts] = useState([]);
	const [curPage, setCurPage] = useState<number>(1);

	const startIdx = (curPage - 1) * 8;
	const endIdx = startIdx + 8;

	const eventAPIKey = process.env.REACT_APP_TOURAPI_KEY;
	const tourUrl = `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?serviceKey=${eventAPIKey}&numOfRows=5&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&keyword=${keyword.keyword}&contentTypeId=12`;

	const postData = useAxios({
		method: 'get',
		url: `/posts`,
	});

	const handlePostClick = (subject: string, id: number) => {
		if (subject === '여행리뷰') {
			document.location.href = `/tripreview/${id}`;
		} else {
			document.location.href = `/community/${id}`;
		}
	};

	useEffect(() => {
		axios(tourUrl).then((res) => {
			setTourResult(res.data.response.body.items.item);
		});

		if (postData.response) {
			setPosts(postData.response);
		}
	}, [postData.response, tourUrl]);

	const filteredData = posts.filter(
		(el: postType) =>
			el.title.includes(keyword.keyword) ||
			el.content.includes(keyword.keyword),
	);

	return (
		<Container>
			<SearchContainer>
				{tourResult && tourResult.length > 0 && (
					<SearchAPI>
						<div className="title">
							<span className="keyword">{keyword.keyword}</span> 추천 여행지 🏝
						</div>
						<APIContainer>
							{tourResult.map((el: tourAPIType, idx) => (
								<AdItem>
									<img src={el.firstimage} alt="사진" className="adimg" />
									<div className="adtext">{el.title}</div>
								</AdItem>
							))}
						</APIContainer>
					</SearchAPI>
				)}

				{filteredData.length > 0 && (
					<SearchResult>
						<div className="title">
							<span className="keyword">{keyword.keyword}</span>가 포함된 게시글
							💭
						</div>
						<ResultContainer>
							{filteredData.map((post: postType) => (
								<ResultItem
									onClick={() => handlePostClick(post.subject, post.id)}
								>
									<ResultText>
										<div className="resultInfo">
											<span className="subject">[{post.subject}]</span>
											<span className="title">{post.title}</span>
										</div>
										<div className="content">{post.content}</div>
										<span className="author">{post.nickName}</span>
									</ResultText>
									{post.image.length > 0 && (
										<ResultImg
											src={post.image[0]}
											alt="검색결과 사진 미리보기"
										/>
									)}
								</ResultItem>
							))}

							<Pagination
								curPage={curPage}
								setCurPage={setCurPage}
								totalPage={Math.ceil(filteredData.length / 5)}
								totalCount={filteredData.length}
								size={5}
								pageCount={5}
							/>
						</ResultContainer>
					</SearchResult>
				)}
			</SearchContainer>
		</Container>
	);
}

export default Search;
