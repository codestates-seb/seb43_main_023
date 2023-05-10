import '../../Global.css';

import { useState } from 'react';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { LOGOUT } from '../../Reducers/loginReducer';
import { DELETE, UPDATE } from '../../Reducers/userInfoReducer';
import { RootState } from '../../Store/store';

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
		.userInfo {
			font-weight: bold;
			margin: 30px;
			padding-bottom: 5px;
		}
		.blue {
			color: #0db4f3;
			border-bottom: 3px solid #0db4f3;
		}
	}
	input {
		padding: 5px;
		outline: none;
		border: 1px solid rgba(0, 0, 0, 0.3);
		border-radius: 5px;
		&::placeholder {
			color: rgba(0, 0, 0, 0.3);
		}
	}
`;

function UserEdit() {
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const userInfos = useSelector((state: RootState) => state.user);

	const memberDeleteClick = async () => {
		// alert회원탈퇴메세지, 로그아웃시키고, 메인페이지로 이동, 서버의 members에서 삭제하기
		try {
			await axios.delete(`http://localhost:4000/members/${userInfos.id}`);
			// eslint-disable-next-line no-alert
			alert('탈퇴되었습니다.');
			dispatch(DELETE());
			dispatch(LOGOUT());
			navigate('/main');
		} catch (error) {
			navigate('/error');
		}
	};

	const [editname, setEditName] = useState<string>('');
	const [editmbti, setEditMbti] = useState<string>('');
	const nameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEditName(e.target.value);
	};
	const mbtiInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEditMbti(e.target.value);
	};
	const userEditClick = async () => {
		try {
			await axios.patch(`http://localhost:4000/members/${userInfos.id}`, {
				nickname: editname,
				mbti: editmbti,
			});
			dispatch(UPDATE({ nickname: editname, mbti: editmbti }));
			// eslint-disable-next-line no-alert
			alert('수정 완료되었습니다.');
			navigate('/mypage');
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
					<button className="userInfo blue">내정보</button>
				</div>
				<div className="menuContent">
					<div className="userInformation">
						<div>DisplayName</div>
						<div className="myInfo myDisplayName">
							<input
								onChange={(e) => nameInputChange(e)}
								placeholder="displayName"
								type="text"
							/>
						</div>

						<div>MBTI</div>
						<div className="myInfo myMbti">
							<input
								onChange={(e) => mbtiInputChange(e)}
								placeholder="mbti"
								type="text"
							/>
						</div>

						<div>Badge</div>
						<div className="myInfo">{userInfos.badge}</div>
						<button onClick={userEditClick} className="memberEdit">
							내정보 저장하기
						</button>
					</div>
				</div>
			</div>
		</Main>
	);
}

export default UserEdit;
