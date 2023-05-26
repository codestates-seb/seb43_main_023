import axios from 'axios';
import { MouseEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IoIosArrowForward } from 'react-icons/io';
import styled from 'styled-components';
import notImageResult from '../assets/notImageResult.png';

import '@toast-ui/editor/dist/toastui-editor-viewer.css';
// eslint-disable-next-line import/order
import { Viewer } from '@toast-ui/react-editor';

import { IKeyword } from '../reducers/searchKeywordReducer';
import Pagination from '../Components/community/Pagination';
import { RootState } from '../store/Store';
import useGet from '../hooks/useGet';
import { Ipost } from '../type/Ipost';

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

	.notresult {
		font-size: 14px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: gray;
		padding-bottom: 7px;
		border-bottom: 1px solid #d9d9d9;
	}

	.notimg {
		width: 100%;
		height: 60%;
	}

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
	margin: 15px 0;
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
		font-size: 15px;
		line-height: 23px;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.author {
		text-align: end;
		font-size: 17px;
	}
`;

const ResultImg = styled.img`
	width: 20%;
	border-radius: 15px;
	margin-left: 20px;
`;

const NotResult = styled.div`
	margin: 80px 0;
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

function Search() {
	const keyword = useSelector((state: RootState) => state.search) as IKeyword;
	const [tourResult, setTourResult] = useState([]);
	const [posts, setPosts] = useState<Ipost[]>([]);
	const [curPage, setCurPage] = useState<number>(1);
	const [menu, setMenu] = useState<string>('전체');

	const keywordE = keyword.keyword.slice(0, 1) === 'E';
	const keywordI = keyword.keyword.slice(0, 1) === 'I';

	const containtKeywordInTag = posts
		.filter((el) => el.tag)
		.filter((el) => el.tag.includes(keyword.keyword));

	const containKeywordInInput = posts.filter(
		(el) =>
			el.title.includes(keyword.keyword) ||
			el.content.includes(keyword.keyword),
	);

	const containKeywordInPost =
		containKeywordInInput.concat(containtKeywordInTag);

	const mbtiAuthor = posts.filter((el) => el.member.mbti === keyword.keyword);

	const mbtiAuthorReview = mbtiAuthor.filter((el) => el.subject === '여행리뷰');

	const startIdx = (curPage - 1) * 5;
	const endIdx = startIdx + 5;

	const eventAPIKey = process.env.REACT_APP_TOURAPI_KEY;
	const tourUrl = `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?serviceKey=${eventAPIKey}&numOfRows=20&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&keyword=${keyword.keyword}&contentTypeId=12`;

	const response = useGet('?size=100');

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
		setMenu(target.textContent!);
	};

	const handleViewAllTour = () => {
		setMenu('여행지 추천');
	};

	const handleViewAllPost = () => {
		setMenu('게시글');
	};

	const checkBatchimEnding = (word: string) => {
		if (typeof word !== 'string') return null;

		const lastLetter = word[word.length - 1];
		const uni = lastLetter.charCodeAt(0);

		if (uni < 44032 || uni > 55203) return null;

		return (uni - 44032) % 28 !== 0;
	};

	useEffect(() => {
		axios(tourUrl).then((res) => {
			setTourResult(res.data.response.body.items.item);
		});

		if (response) {
			setPosts(response);
		}
	}, [response, tourUrl]);

	console.log(tourResult);

	console.log(containKeywordInPost);

	return (
		<Container>
			{keyword.keyword ? (
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

					{/* tour api 결과 - mbti 태그 검색이면 나타나지 않음 */}
					{tourResult && tourResult.length > 0 && menu !== '게시글' && (
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
									{tourResult.slice(0, 4).map((el: tourAPIType) => (
										<AdItem onClick={() => handleResultClicked(el.title)}>
											{el.firstimage ? (
												<img src={el.firstimage} alt="사진" className="adimg" />
											) : (
												<>
													<img
														src={notImageResult}
														alt="사진"
														className="notimg"
													/>
													<div className="notresult">
														x 준비된 사진이 없어요
													</div>
												</>
											)}

											<div className="adtext">{el.title}</div>
										</AdItem>
									))}
								</APIContainerSlice>
							) : (
								<APIContainer>
									{tourResult.map((el: tourAPIType) => (
										<AdItem onClick={() => handleResultClicked(el.title)}>
											<img src={el.firstimage} alt="사진" className="adimg" />
											<div className="adtext">{el.title}</div>
										</AdItem>
									))}
								</APIContainer>
							)}
						</SearchAPI>
					)}

					{/* mbti 태그 검색의 경우 */}
					{(keywordE || keywordI) && menu !== '게시글' ? (
						<SearchResult>
							<div className="title">
								<div>
									<span className="keyword">{keyword.keyword}</span>
									{checkBatchimEnding(keyword.keyword) ? '이' : '가'} 여행한 곳
									🌈
								</div>
								<span className="all">
									{/* 여행지 추천 메뉴이거나 결과가 없다면 전체보기 버튼 표시 x */}
									{menu === '여행지 추천' ||
									mbtiAuthorReview.length === 0 ? null : (
										<button onClick={handleViewAllPost}>전체보기</button>
									)}
								</span>
							</div>
							{menu === '전체' ? (
								<ResultContainer>
									{mbtiAuthorReview.length > 0 ? (
										mbtiAuthorReview.slice(0, 2).map((post) => (
											<ResultItem
												onClick={() =>
													handlePostClick(post.subject, post.postId)
												}
											>
												<ResultText>
													<div className="resultInfo">
														<span className="subject">[{post.subject}]</span>
														<span className="title">{post.title}</span>
													</div>
													<Viewer initialValue={post.content} />
													<span className="author">{post.member.nickname}</span>
												</ResultText>
												{post.image.length > 0 && (
													<ResultImg
														src={post.image[0]}
														alt="검색결과 사진 미리보기"
													/>
												)}
											</ResultItem>
										))
									) : (
										<NotResult>
											<div>아직 작성된 여행리뷰가 없어요 </div>
											<div>
												<span className="keyword">{keyword.keyword}</span> 가
												남긴 첫 번째 여행리뷰 주인공이 되어보세요 !
											</div>
											<div>
												나와 같은 mbti 사람들과 공유를 하며 새로운 재미를
												찾을지도 몰라요 ☺️
											</div>

											<CreateBtn onClick={handleCreate}>
												작성하러가기 <IoIosArrowForward />{' '}
											</CreateBtn>
										</NotResult>
									)}
								</ResultContainer>
							) : (
								<ResultContainer>
									{mbtiAuthorReview.length > 0 ? (
										mbtiAuthorReview.slice(startIdx, endIdx).map((post) => (
											<ResultItem
												onClick={() =>
													handlePostClick(post.subject, post.postId)
												}
											>
												<ResultText>
													<div className="resultInfo">
														<span className="subject">[{post.subject}]</span>
														<span className="title">{post.title}</span>
													</div>
													<Viewer initialValue={post.content} />
													<span className="author">{post.member.nickname}</span>
												</ResultText>
												{post.image.length > 0 && (
													<ResultImg
														src={post.image[0]}
														alt="검색결과 사진 미리보기"
													/>
												)}
											</ResultItem>
										))
									) : (
										<NotResult>
											<div>아직 작성된 게시글이 없어요 </div>
											<div>
												<span className="keyword">{keyword.keyword}</span>{' '}
												이곳을 여행하셨거나 여러 도움이 필요하다면, 새로운 글을
												작성하러 가볼까요 ?{' '}
											</div>
											<div>다른 사람들에게도 도움이 될지 몰라요 ☺️</div>

											<CreateBtn onClick={handleCreate}>
												작성하러가기 <IoIosArrowForward />{' '}
											</CreateBtn>
										</NotResult>
									)}

									{mbtiAuthorReview.length > 0 ? (
										<Pagination
											curPage={curPage}
											setCurPage={setCurPage}
											totalPage={Math.ceil(mbtiAuthorReview.length / 5)}
											totalCount={mbtiAuthorReview.length}
											size={5}
											pageCount={5}
										/>
									) : null}
								</ResultContainer>
							)}
						</SearchResult>
					) : null}

					{/* 게시글 결과 */}
					{menu !== '여행지 추천' ? (
						<SearchResult>
							<div className="title">
								<div>
									<span className="keyword">{keyword.keyword}</span>
									{checkBatchimEnding(keyword.keyword) ? '이' : '가'} 포함된
									게시글 💭
								</div>
								<span className="all">
									{menu === '게시글' ||
									containKeywordInPost.length === 0 ? null : (
										<button onClick={handleViewAllPost}>전체보기</button>
									)}
								</span>
							</div>
							{menu === '전체' ? (
								<ResultContainer>
									{containKeywordInInput.length > 0 ? (
										containKeywordInInput.slice(0, 2).map((post) => (
											<ResultItem
												onClick={() =>
													handlePostClick(post.subject, post.postId)
												}
											>
												<ResultText>
													<div className="resultInfo">
														<span className="subject">[{post.subject}]</span>
														<span className="title">{post.title}</span>
													</div>
													<Viewer initialValue={post.content} />
													<span className="author">{post.member.nickname}</span>
												</ResultText>
												{post.image.length > 0 && (
													<ResultImg
														src={post.image[0]}
														alt="검색결과 사진 미리보기"
													/>
												)}
											</ResultItem>
										))
									) : (
										<NotResult>
											<div>아직 작성된 게시글이 없어요 </div>
											<div>
												<span className="keyword">{keyword.keyword}</span>{' '}
												이곳을 여행하셨거나 여러 도움이 필요하다면, 새로운 글을
												작성하러 가볼까요 ?{' '}
											</div>
											<div>다른 사람들에게 도움이 될지 몰라요 ☺️</div>

											<CreateBtn onClick={handleCreate}>
												작성하러가기 <IoIosArrowForward />{' '}
											</CreateBtn>
										</NotResult>
									)}
								</ResultContainer>
							) : (
								<ResultContainer>
									{containKeywordInInput.length > 0 ? (
										containKeywordInInput
											.slice(startIdx, endIdx)
											.map((post) => (
												<ResultItem
													onClick={() =>
														handlePostClick(post.subject, post.postId)
													}
												>
													<ResultText>
														<div className="resultInfo">
															<span className="subject">[{post.subject}]</span>
															<span className="title">{post.title}</span>
														</div>
														<Viewer initialValue={post.content} />
														<span className="author">
															{post.member.nickname}
														</span>
													</ResultText>
													{post.image.length > 0 && (
														<ResultImg
															src={post.image[0]}
															alt="검색결과 사진 미리보기"
														/>
													)}
												</ResultItem>
											))
									) : (
										<NotResult>
											<div>아직 작성된 게시글이 없어요 </div>
											<div>
												<span className="keyword">{keyword.keyword}</span>{' '}
												이곳을 여행하셨거나 여러 도움이 필요하다면, 새로운 글을
												작성하러 가볼까요 ?{' '}
											</div>
											<div>다른 사람들에게도 도움이 될지 몰라요 ☺️</div>

											<CreateBtn onClick={handleCreate}>
												작성하러가기 <IoIosArrowForward />{' '}
											</CreateBtn>
										</NotResult>
									)}

									{containKeywordInInput.length > 0 ? (
										<Pagination
											curPage={curPage}
											setCurPage={setCurPage}
											totalPage={Math.ceil(containKeywordInInput.length / 5)}
											totalCount={containKeywordInInput.length}
											size={5}
											pageCount={5}
										/>
									) : null}
								</ResultContainer>
							)}
						</SearchResult>
					) : null}
				</SearchContainer>
			) : null}
		</Container>
	);
}

export default Search;
