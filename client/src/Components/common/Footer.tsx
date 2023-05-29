import '../../Global.css';

import { useEffect } from 'react';

import { RiKakaoTalkFill } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import logo from '../../assets/logo.png';
import { getLocalStorage } from '../../utils/LocalStorage';
import shareKakao from '../../utils/shareKakaoLink';

const Main = styled.div`
	width: 100%;
	transform: translate3d(0, 0, 0);
	div {
		overflow: hidden;
	}
	:root {
		--gradient-percent: 0%;
	}

	.flex {
		/*Flexbox for containers*/
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
	}
	.waves {
		position: relative;
		width: 100%;
		height: 15vh;
		margin-bottom: -7px;
		/*Fix for safari gap*/
		min-height: 100px;
		max-height: 150px;
	}
	/* Animation */
	.parallax > use {
		animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
	}
	.parallax > use:nth-child(1) {
		animation-delay: -2s;
		animation-duration: 7s;
	}
	.parallax > use:nth-child(2) {
		animation-delay: -3s;
		animation-duration: 10s;
	}
	.parallax > use:nth-child(3) {
		animation-delay: -4s;
		animation-duration: 13s;
	}
	.parallax > use:nth-child(4) {
		animation-delay: -5s;
		animation-duration: 20s;
	}
	@keyframes move-forever {
		0% {
			transform: translate3d(-90px, 0, 0);
		}
		100% {
			transform: translate3d(85px, 0, 0);
		}
	}
	/*Shrinking for mobile*/
	@media (max-width: 768px) {
		.waves {
			height: 40px;
			min-height: 40px;
		}
		.content {
			height: 30vh;
		}
		h1 {
			font-size: 24px;
		}
	}
	border: none;
`;
const Content = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-around;
	align-items: flex-start;
	background: rgba(0, 0, 0, 0.04);
	padding-bottom: 30px;
	div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	span {
		font-size: 14px;
		color: gray;
		font-weight: bold;
		margin-bottom: 10px;
		padding-bottom: 10px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.3);
	}
	img {
		width: 130px;
		margin-bottom: 10px;
		@media (max-width: 600px) {
			width: 100px;
		}
	}
	a {
		text-decoration: none;
		font-size: 14px;
		color: gray;
		font-weight: 400;
	}
	button {
		margin-bottom: 5px;
		color: #2d2d2d;
		font-size: 10px;
		background: none;
		&:hover {
			color: rgba(0, 0, 0, 0.5);
		}
	}
	.space {
		margin-right: 5px;
	}
	.teamDivide {
		display: inline-block;
		justify-content: center;
		align-items: center;
	}
	.team {
		@media (max-width: 370px) {
			display: none;
		}
	}
	.hide {
		display: none;
		border: none;
		@media (max-width: 370px) {
			display: block;
		}
	}
	.teamDivide2 {
		display: inline-block;
		justify-content: center;
		align-items: center;
	}
	.manager {
		border: none;
		@media (max-width: 370px) {
			margin: 0px;
		}
	}
	border: none;
	.kakaoBtn {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
		span {
			font-size: 15px;
			padding: 0px;
			border: none;
			margin: 0;
			margin-right: 5px;
			transform: translateY(3px);
			&:hover {
				color: #0db4f3;
			}
			@media (max-width: 370px) {
				display: none;
			}
		}
	}
`;
function Footer() {
	useEffect((): any => {
		const script = document.createElement('script');
		script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
		script.async = true;
		document.body.appendChild(script);
		return () => document.body.removeChild(script);
	}, []);

	const route = 'https://whatsyourmbti.click';
	const title = 'MBTI기반 여행지 추천 커뮤니티 어플리케이션';

	const locationNow = useLocation();
	if (locationNow.pathname === '/logout') return null;
	if (locationNow.pathname === '/login') return null;
	if (locationNow.pathname === '/join') return null;
	if (locationNow.pathname === '/error') return null;
	if (locationNow.pathname === '/loading') return null;
	if (locationNow.pathname === '/') return null;
	if (locationNow.pathname === '/accounts/google/login/') return null;
	if (locationNow.pathname === '/Api/Member/Oauth') return null;
	if (locationNow.pathname === '/oauth') return null;
	if (locationNow.pathname === `/memberpost/${getLocalStorage('memberId')}`)
		return null;
	if (locationNow.pathname === '/manager') return null;

	const root = document.documentElement;

	window.addEventListener('scroll', () => {
		const y = 1 + (window.scrollY || window.pageYOffset);
		root.style.setProperty('--gradient-percent', `${y * 4}px`);
	});

	return (
		<Main>
			<div>
				<div>
					<svg
						className="waves"
						xmlns="http://www.w3.org/2000/svg"
						xmlnsXlink="http://www.w3.org/1999/xlink"
						viewBox="0 24 150 28"
						preserveAspectRatio="none"
						shapeRendering="auto"
					>
						<defs>
							<path
								id="gentle-wave"
								d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
							/>
						</defs>
						<g className="parallax">
							<use
								xlinkHref="#gentle-wave"
								x="48"
								y="0"
								fill="rgba(0,0,0,0.015)"
							/>
							<use
								xlinkHref="#gentle-wave"
								x="48"
								y="3"
								fill="rgba(0,0,0,0.012)"
							/>
							<use
								xlinkHref="#gentle-wave"
								x="48"
								y="5"
								fill="rgba(0,0,0,0.01)"
							/>
							<use
								xlinkHref="#gentle-wave"
								x="48"
								y="7"
								fill="rgba(0,0,0,0.001)"
							/>
						</g>
					</svg>
				</div>
			</div>
			<Content>
				<div>
					<Link to="/main">
						<img src={logo} alt="" />
					</Link>
					<button className="kakaoBtn" onClick={() => shareKakao(route, title)}>
						<span>공유하기</span>
						<RiKakaoTalkFill size={23} color="#3b1e1e" />
					</button>
					<span className="hide manager">관리자 문의</span>
					<div className="teamDivide2 hide">
						<button className="space2 hide">bda624444@gmail.com</button>
					</div>
				</div>
				<div>
					<span>SERVICE</span>
					<Link to="/regionrec">
						<button>지역별 추천 여행 명소</button>
					</Link>
					<Link to="/hotplace">
						<button>우리 동네 여행명소</button>
					</Link>
					<Link to="/hotreview">
						<button>인기 여행 리뷰</button>
					</Link>
				</div>
				<div>
					<span>COMMUNITY</span>
					<Link to="/tripreview">
						<button>여행리뷰</button>
					</Link>
					<Link to="/community">
						<button>여행고민</button>
					</Link>
					<Link to="/tripmate">
						<button>같이가요</button>
					</Link>
					<Link to="/mbti">
						<button>MBTI</button>
					</Link>
					<Link to="/etctalk">
						<button>잡담</button>
					</Link>
				</div>
				<div className="team">
					<span>관리자 문의</span>
					<div className="teamDivide">
						<button className="space">bda624444@gmail.com</button>
					</div>
				</div>
			</Content>
		</Main>
	);
}

export default Footer;
