import '../Global.css';

import axios from 'axios';
import { AiOutlineGoogle } from 'react-icons/ai';
import { SiNaver } from 'react-icons/si';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import airplane from '../Assets/airplane.png';
import logo from '../Assets/logo.png';

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
	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		input,
		button {
			margin-top: 30px;
			padding: 10px;
			border-radius: 5px;
			width: 300px;
			outline: none;
			border: 1px solid rgba(0, 0, 0, 0.2);
			&::placeholder {
				color: rgba(0, 0, 0, 0.3);
			}
		}
		button {
			border: none;
			background: #0db4f3;
			color: white;
			font-weight: bold;
			font-size: 20px;
			&:hover {
				background: #4ec9ff;
			}
		}
	}
	.lineBox {
		color: #393737;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 13px;
		margin: 30px 0;
		.line {
			width: 90px;
			border-top: 1px solid #393737;
			margin: 0 10px;
		}
	}
	.oauthBox {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.oauth {
		width: 100px;
		height: 50px;
		background: none;
		border: 1px solid rgba(0, 0, 0, 0.1);
		margin: 0 5px;
		color: #393737;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 5px;
		&:hover {
			background: rgba(0, 0, 0, 0.04);
			border: none;
		}
		span {
			margin-left: 10px;
		}
	}
`;

function Login() {
	const navigate = useNavigate();
	const joinSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const el = e.target as HTMLFormElement;
		try {
			const userInfo = await axios.get('http://localhost:4000/members/1');
			if (
				el.email.value !== userInfo.data.email ||
				el.password.value !== userInfo.data.password
			) {
				// eslint-disable-next-line no-alert
				alert('아이디 or 비밀번호가 다릅니다.');
				window.location.reload();
			} else {
				// eslint-disable-next-line no-alert
				alert('로그인 되었습니다.');
				localStorage.setItem('accessToken', 'token');
				localStorage.setItem('displayName', userInfo.data.nickname);
				localStorage.setItem('mbti', userInfo.data.mbti);
				localStorage.setItem('img', userInfo.data.img);
				localStorage.setItem('memberId', userInfo.data.id);
				navigate('/');
			}
		} catch (error) {
			navigate('/error');
		}
	};

	return (
		<Main>
			<img className="airplane" src={airplane} alt="" />
			<Link to="/">
				<img className="logo" src={logo} alt="" />
			</Link>
			<Content>
				<div>Log in</div>
				<form onSubmit={(e) => joinSubmit(e)}>
					<input name="email" type="text" placeholder="Email" required />
					<input name="password" type="text" placeholder="Password" required />
					<button type="submit">Log in</button>
				</form>
				<div className="lineBox">
					<span className="line" />
					Or Log in with
					<span className="line" />
				</div>
				<div className="oauthBox">
					<button className="oauth">
						<AiOutlineGoogle color="#393737" size="20px" />
						<span>Google</span>
					</button>
					<button className="oauth">
						<SiNaver color="#03c157" size="15px" />
						<span>Naver</span>
					</button>
				</div>
			</Content>
		</Main>
	);
}

export default Login;
