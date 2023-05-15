import '../../Global.css';

import { FocusEvent } from 'react';

import { AiOutlineGoogle } from 'react-icons/ai';
import { SiNaver } from 'react-icons/si';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import airplane from '../../Assets/airplane.png';
import logo from '../../Assets/logo.png';
import { LOGIN } from '../../Reducers/loginReducer';
import { UPDATE } from '../../Reducers/userInfoReducer';
import { setCookie } from '../../Util/cookie';
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
	.keyUp {
		font-size: 12px;
		width: 98%;
		color: #0db4f3;
		text-align: left;
		margin-top: 12px;
		margin-bottom: -25px;
	}
	.hide {
		display: none;
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
	.gotoJoin {
		color: rgba(0, 0, 0, 0.2);
		margin-top: 20px;
		font-size: 13px;
	}
	.gotoJoinBtn {
		color: #0db4f3;
		font-size: 13px;
		margin-top: 7px;
		&:hover {
			color: #4ec9ff;
		}
	}
`;

const OauthBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	.oauth {
		width: 80px;
		height: 40px;
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
		.google {
			margin-left: 5px;
		}
	}
`;

function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const joinSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const el = e.target as HTMLFormElement;
		try {
			/* 
			// 서버 연결하면 사용할 코드
			const loginData = await Api.post('http://localhost:4000/auth/login', {
				email: el.email.value,
				password: el.password.value
			});
			const memberId = loginData.response.data.memberId;
			const accessToken = loginData.response.data.accessToken
			const refreshToken = loginData.response.data.refreshToken
			const empiresAtAccess = loginData.response.data.accessTokenExpirationTime;
			const empiresAtRefresh = loginData.response.data.refreshTokenExpirationTime;
			axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
			*/
			const memberId = 1;
			const token = { accessToken: 'token' };
			const accessToken = 'token';
			const refreshToken = 'token2';

			const userInfo = await Api.get(`/members/${memberId}`);
			if (
				el.email.value !== userInfo.data.email ||
				el.password.value !== userInfo.data.password
			) {
				const Toast = Swal.mixin({
					toast: true,
					position: 'top',
					showConfirmButton: false,
					timer: 3000,
					timerProgressBar: true,
					didOpen: (toast: {
						addEventListener: (arg0: string, arg1: () => void) => void;
					}) => {
						toast.addEventListener('mouseenter', Swal.stopTimer);
						toast.addEventListener('mouseleave', Swal.resumeTimer);
					},
				});
				Toast.fire({
					icon: 'warning',
					title: '아이디/비밀번호가 다릅니다.',
				});
			} else {
				dispatch(
					UPDATE({
						id: userInfo.data.id,
						email: userInfo.data.email,
						nickname: userInfo.data.nickname,
						mbti: userInfo.data.mbti,
						img: userInfo.data.img,
						badge: userInfo.data.badge,
					}),
				);
				dispatch(LOGIN(token));
				setCookie('refreshToken', refreshToken, {
					path: '/',
					sameSite: 'none',
					secure: true,
				});
				localStorage.setItem('accessToken', accessToken);
				localStorage.setItem('empiresAtAccess', '1800000');
				localStorage.setItem('empiresAtRefresh', '9900000');
				Swal.fire({
					icon: 'success',
					title: '로그인되었습니다.',
					text: '메인 페이지로 이동합니다.',
				}).then((result) => {
					if (result.isConfirmed) {
						// 만약 모달창에서 confirm 버튼을 눌렀다면
						navigate('/main');
					}
				});
			}
		} catch (error) {
			navigate('/error');
		}
	};

	const displayNameKeyFocus = (e: FocusEvent<HTMLInputElement>) => {
		const keyUp = e.target.previousSibling as HTMLDivElement;
		keyUp?.classList.remove('hide');
	};
	const displayNameKeyBlur = (e: FocusEvent<HTMLInputElement>) => {
		const keyUp = e.target.previousSibling as HTMLDivElement;
		keyUp?.classList.add('hide');
	};

	return (
		<Main>
			<img className="airplane" src={airplane} alt="" />
			<Link to="/main">
				<img className="logo" src={logo} alt="" />
			</Link>
			<Content>
				<div>Log in</div>
				<form onSubmit={(e) => joinSubmit(e)}>
					<div className="keyUp hide">Email</div>
					<input
						onFocus={(e) => displayNameKeyFocus(e)}
						onBlur={(e) => displayNameKeyBlur(e)}
						name="email"
						type="text"
						placeholder="Email"
						required
					/>
					<div className="keyUp hide">Password</div>
					<input
						onFocus={(e) => displayNameKeyFocus(e)}
						onBlur={(e) => displayNameKeyBlur(e)}
						name="password"
						type="text"
						placeholder="Password"
						required
					/>
					<button type="submit">Log in</button>
				</form>
				<div className="lineBox">
					<span className="line" />
					Or Log in with
					<span className="line" />
				</div>
				<OauthBox>
					<button className="oauth">
						<AiOutlineGoogle color="#393737" size="20px" />
						<span className="google">Google</span>
					</button>
					<button className="oauth">
						<SiNaver color="#03c157" size="15px" />
						<span>Naver</span>
					</button>
				</OauthBox>
				<span className="gotoJoin">아직 회원가입을 안하셨나요?</span>
				<Link to="/join">
					<button className="gotoJoinBtn">Sign up</button>
				</Link>
			</Content>
		</Main>
	);
}

export default Login;
