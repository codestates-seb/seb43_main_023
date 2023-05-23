import '../../Global.css';

import { FocusEvent, useEffect } from 'react';

import { RiKakaoTalkFill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Api } from '../../apis/customAPI';
import airplane from '../../assets/airplane.png';
import googleIcon from '../../assets/googleIcon.png';
import logo from '../../assets/logo.png';
import { LOGIN } from '../../reducers/loginReducer';
import { UPDATE } from '../../reducers/userInfoReducer';
import { setCookie } from '../../utils/cookie';
import { setLocalStorage } from '../../utils/LocalStorage';
import { SweetAlert2 } from '../../utils/SweetAlert';
import ToastAlert from '../../utils/ToastAlert';

const Main = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	-ms-overflow-style: none;
	::-webkit-scrollbar {
		display: none;
	}
`;

const ImgBox = styled.div`
	overflow: hidden;
	.airplane {
		width: 100%;
		height: 101vh;
		@media (max-width: 768px) {
			display: none;
		}
	}
	.logo {
		width: 130px;
		position: absolute;
		top: 20px;
		left: 20px;
		@media (max-height: 700px) {
			width: 100px;
		}
		@media (max-height: 650px) {
			width: 90px;
		}
	}
`;
const Content = styled.div`
	width: 80%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: #fafafa;
	@media (max-width: 1024px) {
		width: 120%;
	}
	@media (max-height: 760px) {
		margin-top: 30px;
	}
	h1 {
		font-size: 40px;
		font-weight: bold;
		color: #393737;
		@media (max-height: 760px) {
			margin-bottom: -5px;
		}
		@media (max-width: 430px) {
			font-size: 35px;
		}
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
			@media (max-width: 430px) {
				width: 250px;
			}
			@media (max-height: 700px) {
				margin-top: 15px;
			}
		}
		button {
			margin-top: 20px;
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
		margin-top: 11px;
		margin-bottom: -25px;
		@media (max-height: 700px) {
			margin-top: 1px;
			margin-bottom: -15px;
		}
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
		margin: 20px 0 20px 0;
		.line {
			width: 98px;
			border-top: 1px solid #393737;
			margin: 0 10px;
			@media (max-width: 430px) {
				width: 75px;
			}
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
		width: 39px;
		height: 39px;
		background: none;
		margin: 0 5px;
		color: #393737;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 5px;
		font-size: 15px;
		&:hover {
			transform: translateY(-3px);
		}
		span {
			margin-left: 10px;
		}
		.googleIcon {
			width: 25px;
		}
	}
	.googleoauth {
		border: 1px solid rgba(0, 0, 0, 0.1);
		transform: translateY(-3px);
		&:hover {
			transform: translateY(-6px);
		}
	}
	.kakaoBtn {
		background: #fbe300;
		margin-right: 0px;
		transform: translateY(-3px);
		&:hover {
			transform: translateY(-6px);
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
			const loginData = await Api.post('/members/signin', {
				email: el.email.value,
				password: el.password.value,
			});
			const {
				memberId,
				accessToken,
				refreshToken,
				accessTokenExpirationTime,
				refreshTokenExpirationTime,
			} = loginData.data.data;

			const userInfo = await Api.get(`/members/${memberId}`);
			dispatch(
				UPDATE({
					id: userInfo.data.memberId,
					email: userInfo.data.email,
					nickname: userInfo.data.nickname,
					mbti: userInfo.data.mbti,
					img: userInfo.data.img,
					badge: userInfo.data.badge,
				}),
			);
			dispatch(LOGIN({ accessToken: `${accessToken}` }));
			setCookie('refreshToken', refreshToken, {
				path: '/',
				sameSite: 'none',
				secure: true,
			});
			setLocalStorage('accessToken', accessToken);
			setLocalStorage('empiresAtAccess', accessTokenExpirationTime);
			setLocalStorage('empiresAtRefresh', refreshTokenExpirationTime);
			const sweetAlert2 = await SweetAlert2(
				'로그인되었습니다.',
				'메인 페이지로 이동합니다.',
			);
			if (sweetAlert2.isConfirmed) {
				navigate('/main');
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			console.log(err);
			if (err.response.status === 401) {
				ToastAlert('아이디/비밀번호가 다릅니다.');
			} else {
				navigate('/error');
			}
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

	// 구글 oauth
	const oAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_KEY}&
response_type=token&
redirect_uri=http://localhost:3000/accounts/google/login/&
scope=https://www.googleapis.com/auth/userinfo.email`;
	const oAuthHandler = () => {
		window.location.assign(oAuthURL);
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const { naver } = window as any;
	// 네이버 oauth
	useEffect(() => {
		// useEffect로 안하고 onclick하면 로그인배너아이콘 안뜸
		const initializeNaverLogin = () => {
			const naverLogin = new naver.LoginWithNaverId({
				clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
				callbackUrl: process.env.REACT_APP_REDIRECT_URI,
				isPopup: false /* 팝업을 통한 연동처리 여부, true 면 팝업 */,
				loginButton: {
					color: 'green',
					type: 1,
					height: 37,
				} /* 로그인 버튼의 타입을 지정 */,
			});
			naverLogin.init();
		};
		initializeNaverLogin();
	}, [naver.LoginWithNaverId]);

	// 카카오 oauth
	const { Kakao } = window as any;
	const loginWithKakao = () => {
		Kakao.Auth.authorize({
			redirectUri: `${process.env.REACT_APP_KAKAO_REDIRECT_URI}`,
		});
	};

	return (
		<Main>
			<ImgBox>
				<img className="airplane" src={airplane} alt="" />
				<Link to="/main">
					<img className="logo" src={logo} alt="" />
				</Link>
			</ImgBox>
			<Content>
				<h1>Log in</h1>
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
						type="password"
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
					<button className="oauth googleoauth" onClick={oAuthHandler}>
						<img className="googleIcon" src={googleIcon} alt="" />
					</button>
					<button className="oauth kakaoBtn" onClick={loginWithKakao}>
						<RiKakaoTalkFill size={32} color="#3b1e1e" />
					</button>
					<button className="oauth">
						<span id="naverIdLogin">Naver</span>
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
