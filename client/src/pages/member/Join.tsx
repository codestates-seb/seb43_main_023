import '../../Global.css';

import { FocusEvent, useEffect, useState } from 'react';

import { RiKakaoTalkFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Api } from '../../apis/customAPI';
import airplane from '../../assets/airplane.png';
import googleIcon from '../../assets/googleIcon.png';
import logo from '../../assets/logo.png';
import { SweetAlert2 } from '../../utils/SweetAlert';
import ToastAlert from '../../utils/ToastAlert';

const Main = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center
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
		@media (max-width: 430px) {
			width: 80px;
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
		.check {
			color: red;
			font-size: 10px;
			margin-top: 10px;
			margin-bottom: -10px;
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

function Join() {
	const navigate = useNavigate();

	const [mbtiValid, setMbtiValid] = useState(true);
	const [emailValid, setEmailValid] = useState(true);
	const [passwordCheck, setpasswordCheck] = useState(true);
	const [passwordValid, setPasswordValid] = useState(true);

	const EMAIL_REGEX =
		/([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	const PASSWORD_REGEX = /(?=.*\d)(?=.*[a-z]).{8,}/;

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

	function isMatch(password1: string, password2: string) {
		if (password1 === password2) {
			return true;
		}
		return false;
	}

	async function joinSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const el = e.target as HTMLFormElement;
		try {
			if (!EMAIL_REGEX.test(el.email.value)) {
				setEmailValid(false);
				setMbtiValid(true);
				setPasswordValid(true);
				setpasswordCheck(true);
			} else if (
				MBTI_REGEX.find((v) => v === el.mbti.value.toUpperCase()) === undefined
			) {
				setMbtiValid(false);
				setEmailValid(true);
				setPasswordValid(true);
				setpasswordCheck(true);
			} else if (!PASSWORD_REGEX.test(el.password.value)) {
				setPasswordValid(false);
				setEmailValid(true);
				setMbtiValid(true);
				setpasswordCheck(true);
			} else if (!isMatch(el.passwordCheck.value, el.password.value)) {
				setpasswordCheck(false);
				setEmailValid(true);
				setMbtiValid(true);
				setPasswordValid(true);
			} else {
				setEmailValid(true);
				setMbtiValid(true);
				setPasswordValid(true);
				setpasswordCheck(true);

				// 전체 멤버 중 같은 이메일이 있다면 경고창, 없다면 회원가입 가능
				const allMember = await Api.get('/members');
				console.log(allMember.data);
				if (
					allMember.data.find(
						(v: { email: string }) => v.email === el.email.value,
					)
				) {
					ToastAlert('이미 가입한 이메일입니다.');
				} else if (
					// 전체 멤버 중 같은 닉네임이 있다면 경고창, 없다면 회원가입 가능
					allMember.data.find(
						(v: { nickname: string }) => v.nickname === el.displayName.value,
					)
				) {
					ToastAlert('이미 사용중인 닉네임입니다.');
				} else {
					const mbtiImg = await Api.get(
						`/mbtiInfo/${el.mbti.value.toUpperCase()}`,
					);
					await Api.post('/members/signup', {
						nickname: el.displayName.value,
						mbti: el.mbti.value.toUpperCase(),
						email: el.email.value,
						password: el.password.value,
						img: mbtiImg.data.img,
					});
					const sweetAlert2 = await SweetAlert2(
						'회원가입이 완료되었습니다.',
						'로그인 페이지로 이동합니다.',
					);
					if (sweetAlert2.isConfirmed) {
						navigate('/login');
					}
				}
			}
		} catch (err) {
			navigate('/error');
		}
	}

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
redirect_uri=https://whatsyourmbti.click/accounts/google/login/&
scope=https://www.googleapis.com/auth/userinfo.email`;
	const oAuthHandler = () => {
		console.log(oAuthURL);
		window.location.assign(oAuthURL);
	};

	// 네이버 oauth
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const { naver } = window as any;
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
	// 방법1 : code가 있는 url로 redirect, 현재 정보 선택!
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
				<h1>Sign Up</h1>
				<form onSubmit={(e) => joinSubmit(e)}>
					<div className="keyUp hide">DisplayName</div>
					<input
						onFocus={(e) => displayNameKeyFocus(e)}
						onBlur={(e) => displayNameKeyBlur(e)}
						name="displayName"
						type="text"
						placeholder="Displayname"
						required
					/>
					<div className="check" />
					<div className="keyUp hide">MBTI</div>
					<input
						onFocus={(e) => displayNameKeyFocus(e)}
						onBlur={(e) => displayNameKeyBlur(e)}
						name="mbti"
						type="text"
						placeholder="MBTI"
						required
					/>
					<div className="check">
						{!mbtiValid && 'MBTI 형식으로 입력해주세요 ex.ISTJ'}
					</div>
					<div className="keyUp hide">Email</div>
					<input
						onFocus={(e) => displayNameKeyFocus(e)}
						onBlur={(e) => displayNameKeyBlur(e)}
						name="email"
						type="text"
						placeholder="Email"
						required
					/>
					<div className="check">
						{!emailValid && '이메일 형식으로 입력해주세요'}
					</div>
					<div className="keyUp hide">Password</div>
					<input
						onFocus={(e) => displayNameKeyFocus(e)}
						onBlur={(e) => displayNameKeyBlur(e)}
						name="password"
						type="password"
						placeholder="Password"
						required
					/>
					<div className="check">
						{!passwordValid &&
							'비밀번호 형식은 영문+숫자 포함 8글자(특수문자제외)입니다'}
					</div>
					<div className="keyUp hide">Password확인</div>
					<input
						onFocus={(e) => displayNameKeyFocus(e)}
						onBlur={(e) => displayNameKeyBlur(e)}
						name="passwordCheck"
						type="password"
						placeholder="Password확인"
						required
					/>
					<div className="check">
						{!passwordCheck && '비밀번호가 일치하지 않습니다'}
					</div>
					<button type="submit">Sign up</button>
				</form>
				<div className="lineBox">
					<span className="line" />
					Or Sign up with
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
				<span className="gotoJoin">이미 회원가입을 하셨나요?</span>
				<Link to="/login">
					<button className="gotoJoinBtn">Login</button>
				</Link>
			</Content>
		</Main>
	);
}

export default Join;
