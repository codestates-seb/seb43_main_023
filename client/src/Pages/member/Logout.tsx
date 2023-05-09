import '../../Global.css';

import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import airplane from '../../Assets/airplane.png';
import logo from '../../Assets/logo.png';

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
	const navigate = useNavigate();
	const logoutClick = () => {
		// eslint-disable-next-line no-alert
		alert('로그아웃 되었습니다.');
		localStorage.removeItem('accessToken');
		localStorage.removeItem('displayName');
		localStorage.removeItem('mbti');
		localStorage.removeItem('img');
		localStorage.removeItem('memberId');
		navigate('/main');
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
