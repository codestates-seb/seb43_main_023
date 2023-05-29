import '../../Global.css';

import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { LOGOUT } from '../../reducers/loginReducer';
import { removeCookie } from '../../utils/cookie';
import { removeLocalStorage } from '../../utils/LocalStorage';
import { SweetAlert1 } from '../../utils/SweetAlert';

const Main = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	padding: 20px 50px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.2);
	@media (max-width: 430px) {
		flex-direction: column;
		justify-content: baseline;
		align-items: flex-start;
	}
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
			&:hover {
				color: #0db4f3;
			}
		}
		.description {
			font-size: 12px;
			color: rgba(0, 0, 0, 0.5);
		}
	}
	.memberDelete {
		width: 100px;
		font-size: 15px;
		color: rgba(0, 0, 0, 0.3);
		font-weight: bold;
		&:hover {
			cursor: pointer;
			color: rgba(0, 0, 0, 0.5);
		}
		@media (max-width: 430px) {
			width: auto;
			margin-top: 10px;
		}
	}
`;

function ManagerBox() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// 회원 탈퇴 핸들러
	const memberDeleteClick = async () => {
		const sweetAlert1 = await SweetAlert1(
			'로그아웃',
			'관리자 님 로그아웃 하시겠습니까?',
			'확인',
			'취소',
		);
		if (sweetAlert1.isConfirmed) {
			try {
				removeLocalStorage('accessToken');
				removeLocalStorage('empiresAtAccess');
				removeLocalStorage('empiresAtRefresh');
				dispatch(LOGOUT());
				removeCookie('refreshToken');
				navigate('/main');
			} catch (error) {
				navigate('/error');
			}
		}
	};
	return (
		<Main>
			<div className="intro">
				<Link
					to={{ pathname: '/manager' }}
					style={{ textDecoration: 'none', color: '#2d2d2d' }}
				>
					<div className="mypage">관리자 페이지</div>
				</Link>
				<div className="description">
					초급 여행자 : 글 5개이상, 댓글 5개 이상
					<br />
					중급 여행자 : 글 30개 이상, 추천수 10개 이상, 댓글 30개이상
					<br />
					고급 여행자 : 글 50개 이상, 추천수 30개 이상, 댓글 100개이상
					<br />
					닉네임 클릭하면 유저의 글 작성목록 페이지로 이동합니다.
					<br />
					give Badge버튼을 클릭하면 유저에게 뱃지를 부여합니다.
				</div>
			</div>
			<button onClick={memberDeleteClick} className="memberDelete">
				관리자 로그아웃
			</button>
		</Main>
	);
}

export default ManagerBox;
