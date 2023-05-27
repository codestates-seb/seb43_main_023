import '../../Global.css';

import { useEffect, useMemo, useState } from 'react';

import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

import ManagerBox from '../../Components/member/ManagerBox';
import useAxios from '../../hooks/useAxios';
import useGet from '../../hooks/useGet';
import { Iposts } from '../../type/Ipost';
import { Imember } from '../../type/Iuser';

const Main = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 50px;
`;

const Content = styled.div`
	width: 100%;
	padding: 20px 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	.menu {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.userInfo,
	.userWrite,
	.userReview {
		font-weight: bold;
		margin: 30px;
		padding-bottom: 5px;
		@media (max-width: 350px) {
			font-size: 13px;
		}
		@media (max-width: 350px) {
			margin: 20px;
		}
	}
	.blue {
		color: #0db4f3;
		border-bottom: 3px solid #0db4f3;
	}
`;

const MenuContent = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	margin-top: 20px;
	.userInformation {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		div {
			margin-bottom: 15px;
			font-weight: bold;
			color: #555555;
			font-size: 20px;
		}
		.myInfo {
			font-size: 15px;
			font-weight: 400;
			margin-bottom: 40px;
		}
	}
`;

const UserWriting = styled.div`
	width: 100%;
	min-height: 28vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	ul {
		width: 100%;
		li {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-weight: bold;
			color: #2d2d2d;
			font-size: 13px;
			border-bottom: 1px solid rgba(0, 0, 0, 0.1);
			padding: 20px 0;
			.writingHead {
				text-align: left;
				padding: 20px 0;
				margin-left: 50px;
				@media (max-width: 555px) {
					margin-left: 30px;
				}
				@media (max-width: 355px) {
					display: none;
				}
			}
			.writingTitle {
				text-align: left;
				color: #2d2d2d;
				&:hover {
					cursor: pointer;
					color: #0db4f3;
				}
				@media (max-width: 555px) {
					margin-right: 30px;
				}
				@media (max-width: 355px) {
					margin: 0 10px;
				}
			}
			.writingContent {
				margin-right: 50px;
				width: 30%;
				text-align: left;
				color: #2d2d2d;
				@media (max-width: 555px) {
					display: none;
				}
			}
		}
	}
	button {
		margin: 0 10px;
		font-size: 12px;
		color: rgba(0, 0, 0, 0.2);
		&:hover {
			cursor: pointer;
			color: #0db4f3;
		}
	}
`;

function MemberPost() {
	const { id } = useParams();
	const [member, setMember] = useState<Imember>({
		memberId: 0,
		nickname: '',
		email: '',
		badge: null,
	});

	// 마이페이지의 내가 쓴 글(get요청 시 필요)
	const [posts, setPosts] = useState<Iposts>([
		{
			postId: 0,
			subject: '',
			title: '',
			content: '',
			tag: [],
			voteCount: 0,
			viewCount: 0,
			postCreatedAt: '',
			postModifiedAt: '',
			image: [],
			member: {
				email: '',
			},
		},
	]);

	// 전체 멤버 get요청(useAxios 사용)
	const { response } = useAxios({
		method: 'get',
		url: `/members/${id}`,
	});

	useEffect(() => {
		if (response !== null) {
			setMember(response);
		}
	}, [id, response]);

	// 커뮤니티 내글 get요청(useAxios 사용)
	const res = useGet(`?size=50&date=6m`);

	useEffect(() => {
		if (res !== null) {
			setPosts(res);
		}
	}, [res]);

	// 내가 쓴 글 filter -> useMemo hook 사용
	const filteredPosts = useMemo(
		() => posts.filter((post) => post.member.email === member.email),
		[member.email, posts],
	);

	return (
		<Main>
			<ManagerBox />
			<Content>
				<div className="menu">
					<button className="userInfo">{member.nickname} 님이 작성한 글</button>
				</div>
				<MenuContent>
					<UserWriting>
						<ul>
							{filteredPosts.map((post) => {
								return (
									<li key={post.postId}>
										<div className="writingHead">[{post.subject}]</div>
										<Link
											to={{ pathname: `/community/${post.postId}` }}
											style={{ textDecoration: 'none' }}
										>
											<div className="writingTitle">{post.title}</div>
										</Link>
										<div className="writingContent">{post.content}</div>
									</li>
								);
							})}
						</ul>
					</UserWriting>
				</MenuContent>
			</Content>
		</Main>
	);
}

export default MemberPost;
