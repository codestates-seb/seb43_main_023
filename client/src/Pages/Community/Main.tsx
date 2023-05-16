import styled from 'styled-components';
import '../../Global.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai';
import SideBar from '../../Components/Community/SideBar';
import Tags from '../../Components/Community/Tags';
import useAxios from '../../Util/customAxios';

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
	height: calc(100vh - 220px);
	display: flex;

	a {
		text-decoration: none;
		color: black;
	}
`;

const ContentContainer = styled.div`
	height: calc(100vh - 400px);
	width: calc(100vw - 400px);
	margin-right: 30px;
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
		width: 850px;
		margin-left: 8px;
	}

	> img {
		// 사진 부분
		/* width: 190px;
		height: 87px; */
		width: 100px;
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
		> h3:nth-child(1) {
			margin-right: 10px;
		}
	}

	> p {
		padding: 10px 0;
		height: 50px;
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

const Pagination = styled.div`
	background-color: rgb(200, 202, 204);
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

	const { response } = useAxios({
		method: 'get',
		url: '/posts',
	});

	useEffect(() => {
		if (response) {
			setPosts(response);
		}
	}, [response]);

	posts = posts
		.filter((el) => el.subject === '여행고민')
		.sort((a, b) => b.id - a.id);

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

				<ContentContainer>
					{posts &&
						posts.map((el) => (
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

					<Pagination>페 이 지 네 이 션 자 리</Pagination>
				</ContentContainer>

				<TagContainer>
					<Tags />
				</TagContainer>
			</Body>
		</div>
	);
}

export default Main;
