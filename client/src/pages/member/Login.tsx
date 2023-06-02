import '../../Global.css';

import { FocusEvent } from 'react';

import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Api } from '../../apis/customAPI';
import ImgBox from '../../Components/member/ImgBox';
import OauthBox from '../../Components/member/OauthBox';
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
	.gotoJoin {
		color: rgba(0, 0, 0, 0.5);
		margin-top: 20px;
		font-size: 15px;
	}
	.gotoJoinBtn {
		color: #0db4f3;
		font-size: 15px;
		margin-top: 7px;
		&:hover {
			color: #4ec9ff;
		}
	}
`;

const Linebox = styled.div`
	color: #393737;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 13px;
	margin: 20px 0 20px 0;
	span {
		width: 98px;
		border-top: 1px solid #393737;
		margin: 0 10px;
		@media (max-width: 430px) {
			width: 75px;
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
			const allMember = await Api.get('/members');
			const findMember = allMember.data.find(
				(v: { email: string }) => v.email === el.email.value,
			);
			// 전체 멤버 중 같은 관리자이메일로 로그인한 경우 관리자페이지로 이동
			if (el.email.value === 'admin@gmail.com') {
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
					'관리자가 접속했습니다.',
					'관리자 페이지로 이동합니다.',
				);
				if (sweetAlert2.isConfirmed) {
					navigate('/manager');
				}
				return;
			}
			// 전체 멤버 중 같은 이메일이 없다면 로그인 불가능
			if (!findMember) {
				ToastAlert('가입한 이메일이 아닙니다');
			}
			// 전체 멤버 중 같은 이메일이 있다면 로그인 가능
			else if (findMember) {
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
			}
		} catch (err: any) {
			// 전체 멤버 중 같은 이메일이 있는데도 불구하고 에러 => 비밀번호가 틀림 경고창
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

	return (
		<Main>
			<ImgBox />
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
				<Linebox>
					<span />
					Or Sign in with
					<span />
				</Linebox>
				<OauthBox />
				<span className="gotoJoin">아직 회원가입을 안하셨나요?</span>
				<Link to="/join">
					<button className="gotoJoinBtn">Sign up</button>
				</Link>
			</Content>
		</Main>
	);
}

export default Login;
