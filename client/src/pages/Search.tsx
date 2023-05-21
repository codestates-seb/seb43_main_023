import axios from 'axios';
import { MouseEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IoIosArrowForward } from 'react-icons/io';
import styled from 'styled-components';
import { RootState } from '../store/Store';
import { IKeyword } from '../reducers/searchKeywordReducer';
import useAxios from '../hooks/useAxios';
import Pagination from '../Components/Community/Pagination';

const TopBarContainer = styled.div`
	width: 90%;
	box-shadow: 0 4px 4px -4px rgb(214, 217, 219);
`;

const UL = styled.ul`
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	font-weight: 600;
	font-size: 18px;
	box-shadow: 0 4px 4px -4px rgb(214, 217, 219);

	.clicked {
		border-bottom: 3px solid #0db4f3;
	}

	> li {
		padding: 10px 0;
		width: 100px;
		display: flex;
		justify-content: center;
		color: black;

		&:hover {
			border-bottom: 3px solid #0db4f3;
			cursor: pointer;
		}

		a {
			color: inherit;
			text-decoration: none;
		}
	}
`;

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
	border-radius: 15px;
	padding: 20px;
	display: flex;
	flex-direction: column;
	font-size: 24px;
	font-weight: 700;
	margin-bottom: 20px;

	.keyword {
		color: #0db4f3;
	}

	> div {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		.all {
			font-size: 14px;
			margin-right: 20px;
			color: #a8a8a8;
		}
	}
`;

const APIContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	margin-bottom: 10px;
`;

const APIContainerSlice = styled.div`
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
	cursor: pointer;

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
	margin-top: 30px;
	width: 90%;
	border-radius: 15px;
	padding: 20px;
	display: flex;
	flex-direction: column;
	font-size: 24px;
	font-weight: 700;
	.keyword {
		color: #0db4f3;
	}

	> div {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		.all {
			font-size: 14px;
			margin-right: 20px;
			color: gray;
		}
	}
`;

const ResultContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const ResultItem = styled.div`
	width: 98%;
	height: 190px;
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

const NotResult = styled.div`
	margin: 40px 0;
	line-height: 40px;

	> div:nth-child(4) {
		font-size: 20px;
		display: flex;
		justify-content: flex-end;
		text-decoration: underline;
		align-items: center;

		&:hover {
			color: #0db4f3;
		}
	}

	.keyword {
		color: #0db4f3;
	}
`;

const CreateBtn = styled.div`
	cursor: pointer;
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
	img: string[];
}

function Search() {
	const keyword = useSelector((state: RootState) => state.search) as IKeyword;
	const [tourResult, setTourResult] = useState([]);
	const [posts, setPosts] = useState([]);
	const [curPage, setCurPage] = useState<number>(1);
	const [menu, setMenu] = useState<string>('전체');

	const startIdx = (curPage - 1) * 8;
	const endIdx = startIdx + 8;

	const eventAPIKey = process.env.REACT_APP_TOURAPI_KEY;
	const tourUrl = `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?serviceKey=${eventAPIKey}&numOfRows=20&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&keyword=${keyword.keyword}&contentTypeId=12`;

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

	const handleCreate = () => {
		document.location.href = '/community/create';
	};

	const handleResultClicked = (value: string) => {
		window.open(
			`https://www.google.com/search?q=${value}`,
			'_blank',
			'noopener, noreferrer',
		);
	};

	const handleMenu = (e: MouseEvent<HTMLButtonElement>) => {
		const target = e.target as HTMLButtonElement;
		console.log(target.textContent);
		setMenu(target.textContent!);
	};

	const handleViewAllTour = () => {
		setMenu('여행지 추천');
	};

	const handleViewAllPost = () => {
		setMenu('게시글');
	};

	useEffect(() => {
		axios(tourUrl).then((res) => {
			setTourResult(res.data.response.body.items.item);
		});

		if (postData.response) {
			setPosts(postData.response);
		}
	}, [postData.response, tourUrl]);

	return (
		<Container>
			<SearchContainer>
				<TopBarContainer>
					<UL>
						<li className={menu === '전체' ? 'clicked' : 'btn'}>
							<button onClick={(e) => handleMenu(e)}>전체</button>
						</li>
						<li className={menu === '여행지 추천' ? 'clicked' : 'btn'}>
							<button onClick={(e) => handleMenu(e)}>여행지 추천</button>
						</li>

						<li className={menu === '게시글' ? 'clicked' : 'btn'}>
							<button onClick={(e) => handleMenu(e)}>게시글</button>
						</li>
					</UL>
				</TopBarContainer>
				{tourResult &&
					tourResult.length > 0 &&
					(menu === '전체' || menu === '여행지 추천') && (
						<SearchAPI>
							<div className="title">
								<div>
									<span className="keyword">{keyword.keyword}</span> 추천 여행지
									🏝
								</div>
								<span className="all">
									{menu === '여행지 추천' ? null : (
										<button onClick={handleViewAllTour}>전체보기</button>
									)}
								</span>
							</div>
							{menu === '전체' ? (
								<APIContainerSlice>
									{tourResult.slice(0, 4).map((el: tourAPIType, idx) => (
										<AdItem onClick={() => handleResultClicked(el.title)}>
											<img src={el.firstimage} alt="사진" className="adimg" />
											<div className="adtext">{el.title}</div>
										</AdItem>
									))}
								</APIContainerSlice>
							) : (
								<APIContainer>
									{tourResult.map((el: tourAPIType, idx) => (
										<AdItem onClick={() => handleResultClicked(el.title)}>
											<img src={el.firstimage} alt="사진" className="adimg" />
											<div className="adtext">{el.title}</div>
										</AdItem>
									))}
								</APIContainer>
							)}
						</SearchAPI>
					)}

				{menu === '전체' || menu === '게시글' ? (
					<SearchResult>
						<div className="title">
							<div>
								<span className="keyword">{keyword.keyword}</span>가 포함된
								게시글 💭
							</div>
							<span className="all">
								{menu === '게시글' ? null : (
									<button onClick={handleViewAllPost}>전체보기</button>
								)}
							</span>
						</div>
						{menu === '전체' ? (
							<ResultContainer>
								{posts.filter(
									(el: postType) =>
										el.title.includes(keyword.keyword) ||
										el.content.includes(keyword.keyword),
								).length > 0 ? (
									posts
										.filter(
											(el: postType) =>
												el.title.includes(keyword.keyword) ||
												el.content.includes(keyword.keyword),
										)
										.slice(0, 2)
										.map((post: postType) => (
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
												{post.img.length > 0 && (
													<ResultImg
														src={post.img[0]}
														alt="검색결과 사진 미리보기"
													/>
												)}
											</ResultItem>
										))
								) : (
									<NotResult>
										<div>아직 작성된 게시글이 없어요 </div>
										<div>
											<span className="keyword">{keyword.keyword}</span> 이곳을
											여행하셨거나 여러 도움이 필요하다면, 새로운 글을 작성하러
											가볼까요 ?{' '}
										</div>
										<div>다른 사람들에게 도움이 될지 몰라요 ☺️</div>

										<CreateBtn onClick={handleCreate}>
											작성하러가기 <IoIosArrowForward />{' '}
										</CreateBtn>
									</NotResult>
								)}

								{posts.filter(
									(el: postType) =>
										el.title.includes(keyword.keyword) ||
										el.content.includes(keyword.keyword),
								).length > 0 ? (
									<Pagination
										curPage={curPage}
										setCurPage={setCurPage}
										totalPage={Math.ceil(
											posts.filter(
												(el: postType) =>
													el.title.includes(keyword.keyword) ||
													el.content.includes(keyword.keyword),
											).length / 5,
										)}
										totalCount={
											posts.filter(
												(el: postType) =>
													el.title.includes(keyword.keyword) ||
													el.content.includes(keyword.keyword),
											).length
										}
										size={5}
										pageCount={5}
									/>
								) : null}
							</ResultContainer>
						) : (
							<ResultContainer>
								{posts.filter(
									(el: postType) =>
										el.title.includes(keyword.keyword) ||
										el.content.includes(keyword.keyword),
								).length > 0 ? (
									posts
										.filter(
											(el: postType) =>
												el.title.includes(keyword.keyword) ||
												el.content.includes(keyword.keyword),
										)
										.map((post: postType) => (
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
												{post.img.length > 0 && (
													<ResultImg
														src={post.img[0]}
														alt="검색결과 사진 미리보기"
													/>
												)}
											</ResultItem>
										))
								) : (
									<NotResult>
										<div>아직 작성된 게시글이 없어요 </div>
										<div>
											<span className="keyword">{keyword.keyword}</span> 이곳을
											여행하셨거나 여러 도움이 필요하다면, 새로운 글을 작성하러
											가볼까요 ?{' '}
										</div>
										<div>다른 사람들에게 도움이 될지 몰라요 ☺️</div>

										<CreateBtn onClick={handleCreate}>
											작성하러가기 <IoIosArrowForward />{' '}
										</CreateBtn>
									</NotResult>
								)}

								{posts.filter(
									(el: postType) =>
										el.title.includes(keyword.keyword) ||
										el.content.includes(keyword.keyword),
								).length > 0 ? (
									<Pagination
										curPage={curPage}
										setCurPage={setCurPage}
										totalPage={Math.ceil(
											posts.filter(
												(el: postType) =>
													el.title.includes(keyword.keyword) ||
													el.content.includes(keyword.keyword),
											).length / 5,
										)}
										totalCount={
											posts.filter(
												(el: postType) =>
													el.title.includes(keyword.keyword) ||
													el.content.includes(keyword.keyword),
											).length
										}
										size={5}
										pageCount={5}
									/>
								) : null}
							</ResultContainer>
						)}
					</SearchResult>
				) : null}
			</SearchContainer>
		</Container>
	);
}

export default Search;
