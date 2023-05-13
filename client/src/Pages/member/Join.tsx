import '../../Global.css';

import { AiOutlineGoogle } from 'react-icons/ai';
import { SiNaver } from 'react-icons/si';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import airplane from '../../Assets/airplane.png';
import logo from '../../Assets/logo.png';
import { Api } from '../../Util/customAPI';

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
`;
const OauthBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

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

function Join() {
	const navigate = useNavigate();
	async function joinSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const el = e.target as HTMLFormElement;
		const id = Math.random();
		try {
			const mbtiImg = await Api.get('/mbtiInfo');
			await Api.post('/members', {
				id,
				nickname: el.displayName.value,
				mbti: el.mbti.value,
				email: el.email.value,
				password: el.password.value,
				img: mbtiImg.data.find(
					(v: { mbti: string }) => v.mbti === el.mbti.value,
				).img,
			});
			// eslint-disable-next-line no-alert
			alert('회원가입이 완료되었습니다.');
			navigate('/login');
		} catch (error) {
			navigate('/error');
		}
	}

	/*
	// 서버 연결하면 바뀔 코드
	function Join() {
	const navigate = useNavigate();
	const joinSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const el = e.target as HTMLFormElement;
		const id = Math.random();
		try {
			const mbtiImg = await Api.get(`http://localhost:4000/mbtiInfo/${el.mbti.value}`);
			await Api.post('http://localhost:4000/members', {
				id,
				nickname: el.displayName.value,
				mbti: el.mbti.value,
				email: el.email.value,
				password: el.password.value,
				img: mbtiImg.img,
				badge: null,
			});
			// eslint-disable-next-line no-alert
			alert('회원가입이 완료되었습니다.');
			navigate('/login');
		} catch (error) {
			navigate('/error');
		}
	};
	*/

	return (
		<Main>
			<img className="airplane" src={airplane} alt="" />
			<Link to="/main">
				<img className="logo" src={logo} alt="" />
			</Link>
			<Content>
				<div>Sign Up</div>
				<form onSubmit={(e) => joinSubmit(e)}>
					<input
						name="displayName"
						type="text"
						placeholder="Displayname"
						required
					/>
					<input name="mbti" type="text" placeholder="MBTI" required />
					<input name="email" type="text" placeholder="Email" required />
					<input name="password" type="text" placeholder="Password" required />
					<button type="submit">Sign up</button>
				</form>
				<div className="lineBox">
					<span className="line" />
					Or Sign up with
					<span className="line" />
				</div>
				<OauthBox>
					<button className="oauth">
						<AiOutlineGoogle color="#393737" size="20px" />
						<span>Google</span>
					</button>
					<button className="oauth">
						<SiNaver color="#03c157" size="15px" />
						<span>Naver</span>
					</button>
				</OauthBox>
			</Content>
		</Main>
	);
}

export default Join;
