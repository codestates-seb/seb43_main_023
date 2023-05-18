import '../../Global.css';

import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import IntroBox from '../../Components/Member/IntroBox';
import MyReview from '../../Components/Member/MyReview';
import { Iuser, UPDATE } from '../../Reducers/userInfoReducer';
import { RootState } from '../../Store/store';
import { Api } from '../../Util/customAPI';
import useAxios from '../../Util/customAxios';

const Main = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
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
		.memberEdit {
			font-size: 12px;
			color: rgba(0, 0, 0, 0.2);
			font-weight: bold;
			&:hover {
				cursor: pointer;
				color: #0db4f3;
			}
		}
		.badgeAppend {
			margin-top: -20px;
		}
		.badgeHover {
			&:hover {
				cursor: pointer;
			}
		}
		.badgeBox {
			display: flex;
			flex-direction: column;
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
	min-height: 28vh;
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
	postId: number;
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
	image: string[];
}

function Mypage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userInfos = useSelector((state: RootState) => state.user) as Iuser;

	// 마이페이지 각 항목 선택 시 항목 색 변경, 페이지 다르게 렌더링하는 핸들러
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
		setSelect('btn3');
	};

	// 마이페이지의 내가 쓴 글(get요청 시 필요)
	const [posts, setPosts] = useState<Ipost[]>([
		{
			postId: 0,
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
			image: [],
		},
	]);

	// 커뮤니티 내글 get요청(useAxios 사용)
	const { response } = useAxios({
		method: 'get',
		url: '/posts',
	});

	useEffect(() => {
		if (response !== null) {
			setPosts(response);
		}
	}, [response]);

	/*
	// 커뮤니티 내글 get요청(커스텀 axios Api 사용)
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
	*/

	// 마이페이지 내가 쓴 글 삭제 핸들러 +
	// 초보여행자 뱃지가 있고, 삭제 후 글이 5개 미만이 되는 경우 -> 뱃지 null로 업데이트
	const postDeleteClick = (id: number) => {
		Swal.fire({
			icon: 'warning',
			title: '삭제',
			text: `글을 삭제하시겠습니까?`,
			showCancelButton: true,
			confirmButtonText: '삭제',
			cancelButtonText: '취소',
		}).then(async (res) => {
			if (res.isConfirmed) {
				try {
					await Api.delete(`/posts/${id}/${userInfos.id}`);
					if (userInfos.badge !== null && posts.length <= 5) {
						Api.patch(`/members/${userInfos.id}`, {
							nickname: userInfos.nickname,
							mbti: userInfos.mbti,
							img: userInfos.img,
							badge: null,
						});
						dispatch(
							UPDATE({
								nickname: userInfos.nickname,
								mbti: userInfos.mbti,
								img: userInfos.img,
								badge: null,
							}),
						);
					}
					window.location.reload();
				} catch (error) {
					navigate('/error');
				}
			} else {
				navigate('/mypage');
			}
		});
	};

	// 마이페이지 뱃지 호버 시 뱃지 기준 설명 박스가 나오는 핸들러
	const badgeMouseEnter = () => {
		const el = document.querySelector('.badgeAppend');
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
		el?.appendChild(badgeBox);
		badgeBox.appendChild(badgeBox1);
		badgeBox.appendChild(badgeBox2);
		badgeBox.appendChild(badgeBox3);
	};

	// 마이페이지 뱃지 호버했다가 떼면 뱃지 기준 설명 박스가 사라지는 핸들러
	const badgeMouseLeave = () => {
		const badgeBox = document.querySelector('.badgeBox');
		const el = document.querySelector('.badgeAppend');
		el?.removeChild(badgeBox as Element);
	};

	return (
		<Main className="main">
			<IntroBox />
			<Content>
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
				<MenuContent>
					{select === 'btn1' && (
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
					)}
					{select === 'btn2' && (
						<UserWriting>
							<ul>
								{posts
									.filter((v: { email: string }) => v.email === userInfos.email)
									.map((post) => {
										return (
											<li key={post.postId}>
												<div className="writingHead">[{post.subject}]</div>
												<Link
													to={{ pathname: `/community/${post.postId}` }}
													style={{ textDecoration: 'none' }}
												>
													<div className="writingBody">{post.title}</div>
												</Link>
												<div>
													<Link
														to={{
															pathname: `/community/${post.postId}/update`,
														}}
														style={{ textDecoration: 'none' }}
													>
														<button>Edit</button>
													</Link>
													<button onClick={() => postDeleteClick(post.postId)}>
														Delete
													</button>
												</div>
											</li>
										);
									})}
							</ul>
						</UserWriting>
					)}
					{select === 'btn3' && <MyReview />}
				</MenuContent>
			</Content>
		</Main>
	);
}

export default Mypage;
