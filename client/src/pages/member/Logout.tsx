import '../../Global.css';

// eslint-disable-next-line import/no-extraneous-dependencies
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import airplane from '../../assets/airplane.png';
import logo from '../../assets/logo.png';
import { LOGOUT } from '../../reducers/loginReducer';
import { DELETE } from '../../reducers/userInfoReducer';
import { removeCookie } from '../../utils/cookie';
import { getLocalStorage, removeLocalStorage } from '../../utils/LocalStorage';
import { SweetAlert1 } from '../../utils/SweetAlert';

const Main = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.airplane {
		width: 50%;
		height: 100vh;
	}
	.logo {
		width: 130px;
		position: absolute;
		top: 20px;
		left: 20px;
	}
`;
const Content = styled.div`
	width: 50%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: #fafafa;
	div {
		font-size: 40px;
		font-weight: bold;
		color: #393737;
	}
	button {
		margin-top: 30px;
		padding: 10px;
		border-radius: 5px;
		width: 100px;
		border: none;
		background: #0db4f3;
		color: white;
		font-weight: bold;
		font-size: 20px;
		&:hover {
			background: #4ec9ff;
		}
	}
`;
const { Kakao } = window as any;
function Logout() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const logoutClick = async () => {
		const sweetAlert1 = await SweetAlert1(
			'로그아웃',
			'로그아웃하시겠습니까?',
			'로그아웃',
			'취소',
		);
		if (sweetAlert1.isConfirmed) {
			if (getLocalStorage('kakao')) {
				Kakao.Auth.logout();
				removeLocalStorage('kakao');
			}
			if (getLocalStorage('naver')) {
				removeLocalStorage('naver');
			}
			try {
				removeLocalStorage('accessToken');
				removeLocalStorage('empiresAtAccess');
				removeLocalStorage('empiresAtRefresh');
				removeLocalStorage('nickname');
				removeLocalStorage('email');
				removeLocalStorage('code');
				dispatch(LOGOUT());
				dispatch(DELETE());
				removeCookie('refreshToken');
				navigate('/main');
			} catch (error) {
				navigate('/error');
			}
		} else {
			navigate('/logout');
		}
	};

	return (
		<Main>
			<img className="airplane" src={airplane} alt="" />
			<Link to="/main">
				<img className="logo" src={logo} alt="" />
			</Link>
			<Content>
				<div>Log out</div>
				<button onClick={logoutClick}>Log out</button>
			</Content>
		</Main>
	);
}

export default Logout;
