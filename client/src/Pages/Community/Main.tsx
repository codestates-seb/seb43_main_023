import styled from 'styled-components';
import '../../Global.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
	height: calc(100vh - 470px);
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

const ContentHeader = styled.div`
	display: flex;
	padding-top: 10px;
	padding-bottom: 10px;
	font-weight: 600;
	font-size: 13px;

	> div:nth-child(1) {
		width: 90px;
		display: flex;
		justify-content: center;
	}

	> div:nth-child(2) {
		flex-grow: 2;
		display: flex;
		justify-content: center;
	}

	> div:nth-child(3) {
		width: 60px;
		display: flex;
		justify-content: center;
	}

	> div:nth-child(4) {
		width: 60px;
		display: flex;
		justify-content: center;
	}

	> div:nth-child(5) {
		width: 60px;
		display: flex;
		justify-content: center;
	}
`;

const Contentbody = styled.div`
	display: flex;
	padding-top: 10px;
	padding-bottom: 10px;
	font-weight: 350;
	font-size: 13px;

	&:hover {
		color: #0db4f3;
	}

	> div:nth-child(1) {
		width: 90px;
		display: flex;
		justify-content: center;
	}

	> div:nth-child(2) {
		width: 750px;
		margin-right: 50px;

		> p {
			display: block;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}
	}

	> div:nth-child(3) {
		width: 60px;
		display: flex;
		justify-content: center;
	}

	> div:nth-child(4) {
		width: 60px;
		display: flex;
		justify-content: center;
	}

	> div:nth-child(5) {
		width: 60px;
		display: flex;
		justify-content: center;
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
		postId: number;
		subject: string;
		title: string;
		nickName: string;
		voteCount: number;
		createdAt: string;
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
		.sort((a, b) => b.postId - a.postId);

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
					<ContentHeader>
						<div>말머리</div>
						<div>제목</div>
						<div>닉네임</div>
						<div>추천</div>
						<div>작성시간</div>
					</ContentHeader>

					{posts &&
						posts.map((el) => (
							<Link to={`/community/${el.postId}`}>
								<Contentbody>
									<div>{`[${el.subject}]`}</div>
									<div>{el.title}</div>
									<div>{el.nickName}</div>
									<div>{el.voteCount}</div>
									<div>16:15</div>
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
