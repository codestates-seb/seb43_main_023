import '../../Global.css';

import { useEffect } from 'react';

import { RiKakaoTalkFill } from 'react-icons/ri';
import styled from 'styled-components';

import googleIcon from '../../assets/googleIcon.png';

const Main = styled.div`
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
		background: #fee500;
		transform: translateY(-3px);
		&:hover {
			transform: translateY(-6px);
		}
	}
`;

export default function OauthBox() {
	// 구글 oauth
	const oAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_KEY}&response_type=token&redirect_uri=https://whatsyourmbti.click/accounts/google/login/&scope=https://www.googleapis.com/auth/userinfo.email`;
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
				callbackUrl: 'https://whatsyourmbti.click/Api/Member/Oauth',
				isPopup: false,
				loginButton: {
					color: 'green',
					type: 1,
					height: 37,
				},
			});
			naverLogin.init();
		};
		initializeNaverLogin();
	}, [naver.LoginWithNaverId]);

	// 카카오 oauth
	const { Kakao } = window as any;
	const loginWithKakao = () => {
		Kakao.Auth.authorize({
			redirectUri: 'https://whatsyourmbti.click/oauth',
		});
	};

	return (
		<Main>
			<button className="oauth googleoauth" onClick={oAuthHandler}>
				<img className="googleIcon" src={googleIcon} alt="" />
			</button>
			<button className="oauth kakaoBtn" onClick={loginWithKakao}>
				<RiKakaoTalkFill size={32} color="#3b1e1e" />
			</button>
			<button className="oauth">
				<span id="naverIdLogin">Naver</span>
			</button>
		</Main>
	);
}
