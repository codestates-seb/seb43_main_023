import '../../Global.css';

import { useEffect, useState } from 'react';

import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Main = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.introBox {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		padding: 20px 50px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);

		.intro {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;
			.mypage {
				font-size: 30px;
				font-weight: bold;
				margin-bottom: 20px;
			}
			.description {
				font-size: 12px;
				color: rgba(0, 0, 0, 0.5);
			}
		}
		.memberDelete {
			width: 100px;
			font-size: 12px;
			color: rgba(0, 0, 0, 0.2);
			font-weight: bold;
			&:hover {
				cursor: pointer;
				color: rgba(0, 0, 0, 0.5);
			}
		}
	}
	.content {
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
		.menuContent {
			width: 100%;
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
				.memberEdit {
					font-size: 12px;
					color: rgba(0, 0, 0, 0.2);
					font-weight: bold;
					&:hover {
						cursor: pointer;
						color: #0db4f3;
					}
				}
			}
		}
		.userInfo,
		.userWrite {
			font-weight: bold;
			margin: 30px;
			padding-bottom: 5px;
		}
		.blue {
			color: #0db4f3;
			border-bottom: 3px solid #0db4f3;
		}
	}
	.test {
		width: 100%;
		text-align: right;
		text-decoration: none;
		padding: 0 50px;
		margin-top: 30px;
	}
`;

const UserWriting = styled.div`
	width: 100%;
	ul {
		margin-bottom: 250px;
	}
	li {
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding-bottom: 20px;
		margin-bottom: 20px;
		font-weight: bold;
		color: #2d2d2d;
		font-size: 13px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}
	.writingBody {
		width: 300px;
		&:hover {
			cursor: pointer;
			color: #0db4f3;
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

interface Ipost {
	id: number;
	subject: string;
	title: string;
	content?: string;
	nickname: string;
	email: string;
	tag?: null;
	voteCount?: number;
	viewCount?: number;
	createdAt?: string;
	modifiedAt?: string;
}

interface Iuser {
	id: number;
	nickname: string;
	email: string;
	mbti: string;
	badge: null;
}

function Mypage() {
	const navigate = useNavigate();
	const memberId = localStorage.getItem('memberId');

	const [select, setSelect] = useState('btn1');
	const userInfoClick = () => {
		const btn1 = document.querySelector('.userInfo');
		const btn2 = document.querySelector('.userWrite');
		btn1?.classList.add('blue');
		btn2?.classList.remove('blue');
		setSelect('btn1');
	};
	const userWriteClick = () => {
		const btn1 = document.querySelector('.userInfo');
		const btn2 = document.querySelector('.userWrite');
		btn2?.classList.add('blue');
		btn1?.classList.remove('blue');
		setSelect('btn2');
	};

	const [posts, setPosts] = useState<Ipost[]>([
		{
			id: 0,
			subject: '',
			title: '',
			nickname: '',
			email: '',
			content: '',
			tag: null,
			voteCount: 0,
			viewCount: 0,
			createdAt: '',
			modifiedAt: '',
		},
	]);

	const [userInfo, setUserInfo] = useState<Iuser>({
		id: 0,
		nickname: '',
		email: '',
		mbti: '',
		badge: null,
	});

	useEffect(() => {
		async function getData() {
			const userData = await axios.get(
				`http://localhost:4000/members/${memberId}`,
			);
			setUserInfo({
				id: userData.data.id,
				nickname: userData.data.nickname,
				email: userData.data.email,
				mbti: userData.data.mbti,
				badge: userData.data.badge,
			});
		}
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const memberDeleteClick = async () => {
		// alert회원탈퇴메세지, 로그아웃시키고, 메인페이지로 이동, 서버의 members에서 삭제하기
		try {
			await axios.delete(`http://localhost:4000/members/${memberId}`);
			// eslint-disable-next-line no-alert
			alert('탈퇴되었습니다.');
			localStorage.removeItem('accessToken');
			localStorage.removeItem('displayName');
			localStorage.removeItem('mbti');
			localStorage.removeItem('img');
			localStorage.removeItem('memberId');
			navigate('/main');
		} catch (error) {
			navigate('/error');
		}
	};

	useEffect(() => {
		async function getPost() {
			const getData = await axios.get('http://localhost:4000/posts');
			setPosts(
				getData.data.filter(
					(v: { email: string }) => v.email === userInfo.email,
				),
			);
		}
		getPost();
	}, [userInfo.email]);

	const postDeleteClick = async (id: number) => {
		try {
			await axios.delete(`http://localhost:4000/posts/${id}`);
			// eslint-disable-next-line no-alert
			alert('글이 삭제되었습니다.');
			window.location.reload();
		} catch (error) {
			navigate('/error');
		}
	};

	return (
		<Main className="main">
			<div className="introBox">
				<div className="intro">
					<div className="mypage">마이페이지</div>
					<div className="description">
						MBTI와 닉네임은 수정이 가능해요.
						<br />
						MBTI 검사를 원하시면 하단의 링크로 들어가주세요!
						<br />
						내가 쓴 글에서 커뮤니티에 작성한 글들을 볼 수 있어요.
						<br />
						뱃지는 작성한 여행리뷰의 수와 추천수에 따라 초보여행자, 중급여행자,
						고급여행자로 나눠집니다.
					</div>
				</div>
				<button onClick={memberDeleteClick} className="memberDelete">
					회원 탈퇴하기
				</button>
			</div>
			<div className="content">
				<div className="menu">
					<button className="userInfo blue" onClick={userInfoClick}>
						내정보
					</button>
					<button className="userWrite" onClick={userWriteClick}>
						내가 쓴 글
					</button>
				</div>
				<div className="menuContent">
					{select === 'btn1' ? (
						<div className="userInformation">
							<div>DisplayName</div>
							<div className="myInfo myDisplayName">{userInfo.nickname}</div>

							<div>MBTI</div>
							<div className="myInfo myMbti">{userInfo.mbti}</div>

							<div>Badge</div>
							<div className="myInfo">{userInfo.badge}</div>
							<Link to="/useredit">
								<button className="memberEdit">내정보 수정하기</button>
							</Link>
							<Link
								className="memberEdit test"
								to="https://www.16personalities.com/ko/%EB%AC%B4%EB%A3%8C-%EC%84%B1%EA%B2%A9-%EC%9C%A0%ED%98%95-%EA%B2%80%EC%82%AC"
							>
								MBTI 검사하러가기
							</Link>
						</div>
					) : (
						<UserWriting>
							<ul>
								{posts.map((post) => {
									return (
										<li key={post.id}>
											<div className="writingHead">[{post.subject}]</div>
											<div className="writingBody">{post.title}</div>
											<div>
												<button>Edit</button>
												<button onClick={() => postDeleteClick(post.id)}>
													Delete
												</button>
											</div>
										</li>
									);
								})}
							</ul>
						</UserWriting>
					)}
				</div>
			</div>
		</Main>
	);
}

export default Mypage;
