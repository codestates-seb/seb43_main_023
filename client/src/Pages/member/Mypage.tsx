import '../../Global.css';

import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { LOGOUT } from '../../Reducers/loginReducer';
import { DELETE, Iuser } from '../../Reducers/userInfoReducer';
import { RootState } from '../../Store/store';
import { Api } from '../../Util/customAPI';

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
				.badgeAppend{
					margin-top: -20px;
				}
				.badgeHover {
					&:hover{
						cursor: pointer;
					}
				}
				.badgeBox {
					display: flex;
					flex-direction column;
					justify-content: center;
					align-items: center;
					width: 190px;
					border: 1px solid rgba(0, 0, 0, 0.07);
					box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.02);
					color: #2d2d2d;
					padding: 0 10px;
					padding-top: 20px;
					.badgeEl {
						font-size: 11px;
						color: rgba(0, 0, 0, 0.5);
					}
				}
			}
		}
		.userInfo,
		.userWrite,
		.userReview {
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
		color: #2d2d2d;
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

function Mypage() {
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const userInfos = useSelector((state: RootState) => state.user) as Iuser;

	const [select, setSelect] = useState('btn1');
	const userInfoClick = () => {
		const btn1 = document.querySelector('.userInfo');
		const btn2 = document.querySelector('.userWrite');
		const btn3 = document.querySelector('.userReview');
		btn1?.classList.add('blue');
		btn2?.classList.remove('blue');
		btn3?.classList.remove('blue');
		setSelect('btn1');
	};
	const userWriteClick = () => {
		const btn1 = document.querySelector('.userInfo');
		const btn2 = document.querySelector('.userWrite');
		const btn3 = document.querySelector('.userReview');
		btn1?.classList.remove('blue');
		btn2?.classList.add('blue');
		btn3?.classList.remove('blue');
		setSelect('btn2');
	};
	const userReviewClick = () => {
		const btn1 = document.querySelector('.userInfo');
		const btn2 = document.querySelector('.userWrite');
		const btn3 = document.querySelector('.userReview');
		btn1?.classList.remove('blue');
		btn2?.classList.remove('blue');
		btn3?.classList.add('blue');
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

	const memberDeleteClick = async () => {
		// alert회원탈퇴메세지, 로그아웃시키고, 메인페이지로 이동, 서버의 members에서 삭제하기
		try {
			await Api.delete(`/members/${userInfos.id}`);
			// eslint-disable-next-line no-alert
			alert('탈퇴되었습니다.');
			dispatch(DELETE());
			dispatch(LOGOUT());
			navigate('/main');
		} catch (error) {
			navigate('/error');
		}
	};

	useEffect(() => {
		async function getPost() {
			const getData = await Api.get('/posts');
			setPosts(
				getData.data.filter(
					(v: { email: string }) => v.email === userInfos.email,
				),
			);
		}
		getPost();
	}, [userInfos.email]);

	const postDeleteClick = async (id: number) => {
		try {
			await Api.delete(`/posts/${id}`);
			// eslint-disable-next-line no-alert
			alert('글이 삭제되었습니다.');
			window.location.reload();
		} catch (error) {
			navigate('/error');
		}
	};

	const badgeMouseEnter = () => {
		const el = document.querySelector('.badgeAppend')!;
		const badgeBox = document.createElement('div');
		const badgeBox1 = document.createElement('div');
		const badgeBox2 = document.createElement('div');
		const badgeBox3 = document.createElement('div');
		badgeBox1.textContent = '초보여행자 : 커뮤니티 글 5개 이상 작성';
		badgeBox2.textContent =
			'중급여행자 : 커뮤니티 글 20개 이상 작성, 사이트 자체 기준 충족';
		badgeBox3.textContent =
			'고급여행자 : 커뮤니티 글 50개 이상 작성, 사이트 자체 기준 충족';
		badgeBox.classList.add('badgeBox');
		badgeBox1.classList.add('badgeEl');
		badgeBox2.classList.add('badgeEl');
		badgeBox3.classList.add('badgeEl');
		el.appendChild(badgeBox);
		badgeBox.appendChild(badgeBox1);
		badgeBox.appendChild(badgeBox2);
		badgeBox.appendChild(badgeBox3);
	};

	const badgeMouseLeave = () => {
		const badgeBox = document.querySelector('.badgeBox')!;
		const el = document.querySelector('.badgeAppend')!;
		el.removeChild(badgeBox);
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
					<button className="userReview" onClick={userReviewClick}>
						여행 리뷰
					</button>
				</div>
				<div className="menuContent">
					{select === 'btn1' ? (
						<div className="userInformation">
							<div>DisplayName</div>
							<div className="myInfo myDisplayName">{userInfos.nickname}</div>
							<div>MBTI</div>
							<div className="myInfo myMbti">{userInfos.mbti}</div>
							<div
								className="badgeHover"
								onMouseEnter={badgeMouseEnter}
								onMouseLeave={badgeMouseLeave}
							>
								Badge
							</div>
							<div className="myInfo">{userInfos.badge}</div>
							<div className="badgeAppend" />
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
											<Link
												to={{ pathname: `/community/${post.id}` }}
												style={{ textDecoration: 'none' }}
											>
												<div className="writingBody">{post.title}</div>
											</Link>
											<div>
												<Link
													to={{ pathname: `/community/${post.id}/update` }}
													style={{ textDecoration: 'none' }}
												>
													<button>Edit</button>
												</Link>
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
