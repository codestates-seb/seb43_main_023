import styled from 'styled-components';
import '../../Global.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SideBar from '../../Components/Community/SideBar';
import Tags from '../../Components/Community/Tags';

const TripMateContainer = styled.div`
	height: calc(100vh - 300px);
	display: flex;

	a {
		text-decoration: none;
		color: black;
	}
`;

const TripMateBody = styled.div`
	margin-top: 35px;
	height: calc(100vh - 260px);
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
		width: 740px;

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

const Pagination = styled.div`
	background-color: rgb(200, 202, 204);
	margin-top: 10px;
	height: 32px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
`;

function TripMate() {
	interface Post {
		id: number;
		subject: string;
		title: string;
		nickName: string;
		voteCount: number;
		createdAt: string;
	}
	// eslint-disable-next-line prefer-const
	let [posts, setPosts] = useState<Post[]>([]);
	useEffect(() => {
		axios.get('http://localhost:4000/posts').then((res) => setPosts(res.data));
	}, []);

	posts = posts.filter((el) => el.subject === '같이가요');

	return (
		<div className="main">
			<TripMateContainer>
				<SideBar />
				<TripMateBody>
					<ContentHeader>
						<div>말머리</div>
						<div>제목</div>
						<div>닉네임</div>
						<div>추천</div>
						<div>작성시간</div>
					</ContentHeader>

					{posts &&
						posts.map((el) => (
							<Link to={`/community/${el.id}`}>
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
				</TripMateBody>
				<TagContainer>
					<Tags />
				</TagContainer>
			</TripMateContainer>
		</div>
	);
}

export default TripMate;
