import styled from 'styled-components';
import '../../Global.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai';
import SideBar from '../../Components/Community/SideBar';
import Tags from '../../Components/Community/Tags';
import useAxios from '../../Util/customAxios';
import Pagination from '../../Components/Community/Pagination';

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

const EtcTalkContainer = styled.div`
	height: calc(100vh - 165px);
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

const EtcTalkBody = styled.div`
	margin-top: 35px;
	height: calc(100vh - 260px);
	width: calc(100vw - 400px);
	margin-right: 30px;
	min-height: 610px;
	max-height: 610px;
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

const TagContainer = styled.div`
	height: 100%;
	margin-top: 55px;
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

const PaginationContainer = styled.div`
	margin-top: 10px;
	height: 32px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
`;

function EtcTalk() {
	interface Post {
		id: number;
		subject: string;
		title: string;
		nickName: string;
		voteCount: number;
		createdAt: string;
		content: string;
		img: string[];
	}
	// eslint-disable-next-line prefer-const
	let [posts, setPosts] = useState<Post[]>([]);
	const [curPage, setCurPage] = useState<number>(1);

	const startIdx = (curPage - 1) * 5;
	const endIdx = startIdx + 5;

	const { response } = useAxios({
		method: 'get',
		url: '/posts',
	});

	useEffect(() => {
		if (response) {
			setPosts(response);
		}
	}, [response]);

	posts = posts.filter((el) => el.subject === '잡담');

	return (
		<div className="main">
			<Explain>
				<h1>잡담</h1>
				<div>
					여행과 MBTI 관련 외 여러 대화를 나누고 싶다면 ? <br />
					이 공간에서 여러 사람들과 자유롭게 대화를 나눠보세요
					<br />
					타인에게 예민하거나 안전하지 않은 내용은 지양해주세요
				</div>
			</Explain>
			<EtcTalkContainer>
				<SideBar />
				<div>
					<EtcTalkBody>
						{posts &&
							posts.slice(startIdx, endIdx).map((el) => (
								<Link to={`/community/${el.id}`}>
									<Contentbody>
										<div>
											<Header>
												<div>
													<h3>{`[${el.subject}]`}</h3>
													<h3>{el.title}</h3>
												</div>

												{el.content.length > 70 ? (
													<p>
														{`${el.content
															.substring(0, 175)
															.substring(0, el.content.lastIndexOf(' '))
															.trim()}...`}
													</p>
												) : (
													<p>{el.content}</p>
												)}
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

										{el.img[0] ? (
											<img src={el.img[0]} alt="게시글 사진 미리보기" />
										) : null}
									</Contentbody>
								</Link>
							))}
					</EtcTalkBody>
					<PaginationContainer>
						<Pagination
							curPage={curPage}
							setCurPage={setCurPage}
							totalPage={Math.ceil(posts.length / 5)}
							totalCount={posts.length}
							size={5}
							pageCount={5}
						/>
					</PaginationContainer>
				</div>
				<TagContainer>
					<Tags />
				</TagContainer>
			</EtcTalkContainer>
		</div>
	);
}

export default EtcTalk;
