import '../../Global.css';

import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import { Api } from '../../apis/customAPI';
import EditMBTIDropdown from '../../Components/member/EditMBTIDropdown';
import IntroBox from '../../Components/member/IntroBox';
import { UPDATE } from '../../reducers/userInfoReducer';
import { RootState } from '../../store/Store';
import ToastAlert from '../../utils/ToastAlert';

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
			.title {
				margin: 15px;
				font-weight: bold;
				color: #555555;
				font-size: 20px;
			}
			.myInfo {
				font-size: 15px;
				font-weight: 400;
				margin-bottom: 40px;
				color: #555555;
			}
			.check {
				color: red;
				font-size: 10px;
				margin-top: -30px;
			}
			.memberEdit {
				font-size: 15px;
				color: rgba(0, 0, 0, 0.4);
				font-weight: bold;
				&:hover {
					cursor: pointer;
					color: #0db4f3;
				}
			}
			.mbti {
				margin-bottom: 40px;
				width: 150px;
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
const DropDownContainer = styled.div`
	background: none;
	border: none;
`;

function UserEdit() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userInfos = useSelector((state: RootState) => state.user);

	const [editname, setEditName] = useState<string>('');
	const [editmbti, setEditMbti] = useState<string>('');
	const [nameValid, setNameValid] = useState(false);
	const [mbtiValid, setMbtiValid] = useState(false);
	const [subject, setSubject] = useState<string>('');
	const MBTI_REGEX = [
		'ISTP',
		'ISFP',
		'ESTP',
		'ESFP',
		'INFJ',
		'INFP',
		'ENFJ',
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

	const handleSubject = (sub: string) => {
		setSubject(sub);
	};

	const userEditClick = async () => {
		if (editname === '') {
			setNameValid(true);
			setMbtiValid(false);
		}
		if (
			MBTI_REGEX.find((v) => v === subject) === undefined &&
			editname !== ''
		) {
			setMbtiValid(true);
			setNameValid(false);
		}
		if (
			editname !== '' &&
			MBTI_REGEX.find((v) => v === subject) !== undefined
		) {
			const mbtiImg = await Api.get(`/mbtiInfo/${subject}`);
			try {
				// 전체 멤버 중 같은 닉네임이 있다면 경고창, 없다면 수정 가능
				const allMember = await Api.get('/members');
				if (
					allMember.data.find(
						(v: { nickname: string }) => v.nickname === editname,
					)
				) {
					ToastAlert('이미 사용중인 닉네임입니다.');
				} else {
					await Api.patch(`/members/${userInfos.id}`, {
						nickname: editname,
						mbti: subject,
						img: mbtiImg.data.img,
					});
					dispatch(
						UPDATE({
							nickname: editname,
							mbti: subject,
							img: mbtiImg.data.img,
							badge: userInfos.badge,
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
				}
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
						<div className="title">DisplayName</div>
						<div className="myInfo myDisplayName">
							<input
								onChange={(e) => nameInputChange(e)}
								placeholder="displayName"
								type="text"
							/>
						</div>
						<div className="check">{nameValid && '이름을 입력해주세요'}</div>

						<div className="title">MBTI</div>
						<div className="mbti">
							<DropDownContainer className="mbtiInput">
								<EditMBTIDropdown handleSubject={handleSubject} from="upload" />
							</DropDownContainer>
						</div>
						<div className="check">{mbtiValid && 'MBTI를 선택해주세요'}</div>
						<div className="title">Badge</div>
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
