import '../Global.css';

import { useState } from 'react';

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
					margin-bottom: 10px;
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
`;

const UserWriting = styled.div`
	width: 100%;
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

function Mypage() {
	const [select, setSelect] = useState('btn1');
	const userInfoClick = () => {
		const btn1 = document.querySelector('.userInfo')!;
		const btn2 = document.querySelector('.userWrite')!;
		btn1.classList.add('blue');
		btn2.classList.remove('blue');
		setSelect('btn1');
	};
	const userWriteClick = () => {
		const btn1 = document.querySelector('.userInfo')!;
		const btn2 = document.querySelector('.userWrite')!;
		btn2.classList.add('blue');
		btn1.classList.remove('blue');
		setSelect('btn2');
	};

	const displayName = 'hihijin';
	const mbti = 'ISTJ';
	const badge = 'Silver';
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
						뱃지는 작성한 여행리뷰의 수와 추천수에 따라 bronze, silver, gold로
						나눠집니다.
					</div>
				</div>
				<div className="memberDelete">회원 탈퇴하기</div>
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
							<div className="myInfo">{displayName}</div>

							<div>MBTI</div>
							<div className="myInfo">{mbti}</div>

							<div>Badge</div>
							<div className="myInfo">{badge}</div>
							<div className="memberEdit">내정보 수정하기</div>
						</div>
					) : (
						<UserWriting>
							<ul>
								<li>
									<div className="writingHead">[여행고민]</div>
									<div className="writingBody">
										저는 ISTJ인데, ENFP여행메이트 구...
									</div>
									<div>
										<button>Edit</button>
										<button>Delete</button>
									</div>
								</li>
								<li>
									<div className="writingHead">[여행리뷰]</div>
									<div className="writingBody">
										이번에 겹벚꽃보러 경주 다녀왔어요!
									</div>
									<div>
										<button>Edit</button>
										<button>Delete</button>
									</div>
								</li>
								<li>
									<div className="writingHead">[여행리뷰]</div>
									<div className="writingBody">제주도 놀러간 리뷰입니당 V</div>
									<div>
										<button>Edit</button>
										<button>Delete</button>
									</div>
								</li>
							</ul>
						</UserWriting>
					)}
				</div>
			</div>
		</Main>
	);
}

export default Mypage;
