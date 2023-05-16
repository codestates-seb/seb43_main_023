import '../../Global.css';

import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import IntroBox from '../../Components/Member/IntroBox';
import { UPDATE } from '../../Reducers/userInfoReducer';
import { RootState } from '../../Store/store';
import { Api } from '../../Util/customAPI';

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
			.check {
				color: red;
				font-size: 10px;
				margin-top: -30px;
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

	const [editname, setEditName] = useState<string>('');
	const [editmbti, setEditMbti] = useState<string>('');
	const [nameValid, setNameValid] = useState(false);
	const [mbtiValid, setMbtiValid] = useState(false);
	const MBTI_REGEX = [
		'ISTP',
		'ISFP',
		'ESTP',
		'ESFP',
		'INFJ',
		'INFP',
		'ENTJ',
		'ENFP',
		'ISTJ',
		'ISFJ',
		'ESTJ',
		'ESFJ',
		'INTJ',
		'INTP',
		'ENTJ',
		'ENTP',
	];

	const nameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEditName(e.target.value);
	};
	const mbtiInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEditMbti(e.target.value);
	};
	const userEditClick = async () => {
		if (editname === '') {
			setNameValid(true);
			setMbtiValid(false);
		}
		if (
			MBTI_REGEX.find((v) => v === editmbti.toUpperCase()) === undefined &&
			editname !== ''
		) {
			setMbtiValid(true);
			setNameValid(false);
		}
		if (
			editname !== '' &&
			MBTI_REGEX.find((v) => v === editmbti.toUpperCase()) !== undefined
		) {
			const mbtiImgData = await Api.get('/mbtiInfo');
			const mbtiImg = mbtiImgData.data.find(
				(v: { mbti: string }) => v.mbti === editmbti.toUpperCase(),
			).img;
			try {
				await Api.patch(`/members/${userInfos.id}`, {
					nickname: editname,
					mbti: editmbti.toUpperCase(),
					img: mbtiImg,
				});
				dispatch(
					UPDATE({
						nickname: editname,
						mbti: editmbti.toUpperCase(),
						img: mbtiImg,
					}),
				);
				Swal.fire({
					title: '수정완료되었습니다.',
					icon: 'success',
				}).then((result) => {
					if (result.value) {
						navigate('/mypage');
					}
				});
			} catch (error) {
				navigate('/error');
			}
		}
	};

	return (
		<Main className="main">
			<IntroBox />
			<Content>
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
						<div className="check">{nameValid && '이름을 입력해주세요'}</div>

						<div>MBTI</div>
						<div className="myInfo myMbti">
							<input
								onChange={(e) => mbtiInputChange(e)}
								placeholder="mbti"
								type="text"
							/>
						</div>
						<div className="check">
							{mbtiValid && 'MBTI 형식으로 입력해주세요 ex.ISTJ'}
						</div>
						<div>Badge</div>
						<div className="myInfo">{userInfos.badge}</div>
						<button onClick={userEditClick} className="memberEdit">
							내정보 저장하기
						</button>
					</div>
				</div>
			</Content>
		</Main>
	);
}

export default UserEdit;
