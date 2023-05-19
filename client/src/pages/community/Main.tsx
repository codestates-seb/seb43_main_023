import '../../Global.css';

import { useEffect, useState } from 'react';

import { AiFillHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Pagination from '../../Components/ccc/Pagination';
import SideBar from '../../Components/ccc/SideBar';
import Tags from '../../Components/ccc/Tags';
import useAxios from '../../hooks/useAxios';

const Explain = styled.div`
	margin-top: 85px;
	height: 130px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-left: 20px;
	margin-bottom: 40px;
	padding: 30px;
	line-height: 1.5rem;

	> h1 {
		margin-top: 20px;
		margin-bottom: 10px;
	}

	> div {
		color: #595959;
		font-size: 14px;
		padding-bottom: 10px;
		border-bottom: 1px solid rgb(214, 217, 219);
	}
`;

const Body = styled.div`
	height: 1000px;
	display: flex;

	a {
		text-decoration: none;
		color: black;
	}

	> div {
		display: flex;
		flex-direction: column;
	}
`;

const ContentContainer = styled.div`
	height: calc(100vh - 400px);
	width: calc(100vw - 400px);
	margin-right: 30px;
	height: fit-content;
	/* min-height: 1000px;
	max-height: 1000px; */
`;

const Contentbody = styled.div`
	display: flex;
	padding-top: 10px;
	padding-bottom: 10px;
	font-weight: 350;
	font-size: 13px;
	border-bottom: 1px solid rgb(214, 217, 219);

	&:hover {
		color: #0db4f3;
	}
	> div:nth-child(1) {
		display: flex;
		flex-direction: column;
		margin-right: 20px;
		width: 860px;
		margin-left: 8px;
	}

	> img {
		// 사진 부분
		width: 150px;
		height: 100px;
		max-width: 100%;
		display: flex;
		justify-content: center;
		object-fit: cover;
	}
`;

const Header = styled.div`
	padding: 5px;

	> div {
		display: flex;
		-webkit-text-stroke: 0.4px black;
		font-size: 15px;
		> h3:nth-child(1) {
			margin-right: 10px;
		}
	}

	> p {
		padding: 10px 0;
		height: 50px;
		-webkit-text-stroke: 0.1px black;
	}
`;

const Info = styled.div`
	display: flex;
	padding: 5px;

	div {
		margin-right: 15px;
	}

	> div:nth-child(4) {
		width: 30px;
		display: flex;
		justify-content: flex-start;
		align-items: center;

		> p {
			margin-left: 5px;
		}
	}
`;

const PaginationContainer = styled.div`
	margin-top: 10px;
	height: 32px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
`;

const TagContainer = styled.div`
	height: calc(100vh - 400px);
	width: 230px;
	margin-right: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	> div:last-child {
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

function Main() {
	interface Post {
		postId: number;
		subject: string;
		title: string;
		nickName: string;
		voteCount: number;
		createdAt: string;
		content: string;
		image: string[];
		tag: string[];
	}

	// eslint-disable-next-line prefer-const
	const [posts, setPosts] = useState<Post[]>([]);
	const [curPage, setCurPage] = useState<number>(1);

	const startIdx = (curPage - 1) * 8;
	const endIdx = startIdx + 8;

	const { response } = useAxios({
		method: 'get',
		url: '/posts?subject=여행고민&page=1',
	});

	useEffect(() => {
		if (response) {
			setPosts(response);
		}
	}, [response]);

	return (
		<div className="main">
			<Explain>
				<h1>커뮤니티</h1>
				<div>
					나와 같은 MBTI를 가진 사람들은 어떤 여행을 갔는지 궁금한가요? <br />
					여행메이트가 없으세요? MBTI과몰입러라구요? 여러 잡담을 나누고 싶나요?
					<br />
					커뮤니티 각 탭을 누르며 둘러보세요!
				</div>
			</Explain>

			<Body>
				<SideBar />

				<div>
					<ContentContainer>
						{posts &&
							posts
								.sort((a, b) => b.postId - a.postId)
								.slice(startIdx, endIdx)
								.map((el) => (
									<Link to={`/community/${el.postId}`}>
										<Contentbody>
											<div>
												<Header>
													<div>
														<h3>{`[${el.subject}]`}</h3>
														<h3>{el.title}</h3>
													</div>
													{/* 
													{el.content.length > 70 ? (
														<p>
															{`${el.content
																.substring(0, 175)
																.substring(0, el.content.lastIndexOf(' '))
																.trim()}...`}
														</p>
													) : (
														<p>{el.content}</p>
													)} */}
												</Header>

												<Info>
													<div>{el.nickName}</div>
													<div>16:15</div>
													<div>조회 20</div>
													<div>
														<AiFillHeart color="#fe6464" />
														<p> {el.voteCount}</p>
													</div>
												</Info>
											</div>

											{el.image[0] ? (
												<img src={el.image[0]} alt="게시글 사진 미리보기" />
											) : null}
										</Contentbody>
									</Link>
								))}
					</ContentContainer>

					<PaginationContainer>
						<Pagination
							curPage={curPage}
							setCurPage={setCurPage}
							totalPage={Math.ceil(posts.length / 8)}
							totalCount={posts.length}
							size={8}
							pageCount={5}
						/>
					</PaginationContainer>
				</div>

				<TagContainer>
					<Tags />
				</TagContainer>
			</Body>
		</div>
	);
}

export default Main;