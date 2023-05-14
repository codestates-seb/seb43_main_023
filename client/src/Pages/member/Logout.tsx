import '../../Global.css';

// eslint-disable-next-line import/no-extraneous-dependencies
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import airplane from '../../Assets/airplane.png';
import logo from '../../Assets/logo.png';
import { LOGOUT } from '../../Reducers/loginReducer';
import { removeCookie } from '../../Util/cookie';

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

function Logout() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const logoutClick = () => {
		Swal.fire({
			icon: 'warning',
			title: '로그아웃',
			text: '로그아웃하시겠습니까?',
			showCancelButton: true,
			confirmButtonText: '로그아웃',
			cancelButtonText: '취소',
		}).then(async (res) => {
			if (res.isConfirmed) {
				try {
					localStorage.removeItem('accessToken');
					localStorage.removeItem('empiresAtAccess');
					localStorage.removeItem('empiresAtRefresh');
					dispatch(LOGOUT());
					removeCookie('refreshToken');
					navigate('/main');
				} catch (error) {
					navigate('/error');
				}
			} else {
				navigate('/logout');
			}
		});
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
