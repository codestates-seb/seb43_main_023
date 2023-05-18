import '../Global.css';

import { Link } from 'react-router-dom';
import styled from 'styled-components';

import logo from '../Assets/logo.png';

const ScrollSnapWrap = styled.div`
	scroll-snap-type: y mandatory;
	height: 100vh;
	overflow-y: scroll;
	scroll-behavior: smooth;
	&::-webkit-scrollbar {
		display: none;
	}
	.page {
		background-image: url('/assets/airplane1.png');
		background-repeat: no-repeat;
		width: 100vw;
		height: 100vh;
		background-size: cover;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		&::-webkit-scrollbar {
			display: none;
		}
	}
	.page2 {
		background-image: url('/assets/cloud.png');
	}
	.logo {
		width: 27%;
	}
	.section1_text {
		font-size: 50px;
		font-weight: bold;
		color: white;
		margin-top: 50px;
		text-shadow: 3px 7px 5px rgba(0, 0, 0, 0.1);
		width: 700px;
		animation: typing 2s steps(22), blink 0.5s step-end infinite alternate;
		white-space: nowrap;
		overflow: hidden;
		border-right: 3px solid;
		-webkit-text-stroke: 1px white;
	}
	@keyframes typing {
		from {
			width: 0;
		}
	}

	@keyframes blink {
		50% {
			border-color: transparent;
		}
	}
	.section2_text {
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		font-size: 30px;
		font-weight: bold;
		color: #2d2d2d;
		margin: 40px 0;
	}
	.title1 {
		color: white;
		font-size: 80px;
		-webkit-text-stroke: 3px white;
	}
	.title1_line {
		color: rgba(0, 0, 0, 0);
		-webkit-text-stroke: 3px white;
	}
	.title2 {
		color: #0db4f3;
		font-size: 80px;
		-webkit-text-stroke: 3px #0db4f3;
	}
	.title2_line {
		color: rgba(0, 0, 0, 0);
		-webkit-text-stroke: 3px #0db4f3;
	}
	.section3_text {
		font-size: 60px;
		font-weight: bold;
		color: #2d2d2d;
	}
	button {
		margin-top: 50px;
		width: 200px;
		border: 2px solid white;
		padding: 20px;
		border-radius: 20px;
		font-size: 20px;
		font-weight: bold;
		color: #2d2d2d;
		&:hover {
			color: white;
			background: #4ec9ff;
			border: none;
		}
	}
	.button2 {
		position: absolute;
		left: 60%;
	}
`;

const SnapDiv = styled.div`
	scroll-snap-align: start;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
	text-align: center;
	button {
		margin: 100px 30px;
	}
	.arrow {
		margin-bottom: -150px;
		margin-top: 100px;
	}
	.arrow2 {
		margin-top: -50px;
		margin-bottom: 20px;
	}
	.arrow > span {
		display: block;
		width: 40px;
		height: 40px;
		border-left: 6px solid rgba(255, 255, 255, 0.6);
		border-bottom: 6px solid rgba(255, 255, 255, 0.6);
		border-radius: 5px;
		-webkit-transform: rotate(-45deg);
		transform: rotate(-45deg);
		-webkit-animation: sdb 2s infinite;
		animation: sdb 2s infinite;
		opacity: 0;
		box-sizing: border-box;
		margin-bottom: 10px;
	}
	.arrow > span:nth-of-type(1) {
		-webkit-animation-delay: 0s;
		animation-delay: 0s;
	}
	.arrow > span:nth-of-type(2) {
		-webkit-animation-delay: 0.15s;
		animation-delay: 0.15s;
	}
	.arrow > span:nth-of-type(3) {
		-webkit-animation-delay: 0.3s;
		animation-delay: 0.3s;
	}
	@-webkit-keyframes sdb {
		0% {
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	@keyframes sdb {
		0% {
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	.flow-text > span {
		margin: 0 20px;
	}
	.flow-text {
		width: 100%;
		display: flex;
		flex: 0 0 auto;
		white-space: nowrap;
		overflow: hidden;
	}
	.flow-text:hover .flow-wrap {
		animation-play-state: paused;
		cursor: pointer;
	}
	.flow-text:hover .flow-wrap2 {
		animation-play-state: paused;
		cursor: pointer;
	}
	.flow-wrap {
		animation: textLoop 5s linear infinite;
	}
	.flow-wrap2 {
		animation: textLoop2 5s linear infinite;
	}

	@keyframes textLoop {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-230%);
		}
	}
	@keyframes textLoop2 {
		0% {
			transform: translateX(-222%);
		}
		100% {
			transform: translateX(0%);
		}
	}
`;

function Landing() {
	return (
		<ScrollSnapWrap>
			<SnapDiv className="page">
				<img className="logo" src={logo} alt="" />
				<div className="section1_text">MBTI 기반 여행지 추천 사이트</div>
				<div className="arrow">
					<span />
					<span />
					<span />
				</div>
			</SnapDiv>
			<SnapDiv className="page page2">
				<div className="section2_text title1 flow-container">
					<div className="flow-text">
						<span className="flow-wrap title1_line">SERVICE</span>
						<span className="flow-wrap">SERVICE</span>
						<span className="flow-wrap title1_line">SERVICE</span>
						<span className="flow-wrap">SERVICE</span>
						<span className="flow-wrap title1_line">SERVICE</span>
						<span className="flow-wrap">SERVICE</span>
						<span className="flow-wrap title1_line">SERVICE</span>
						<span className="flow-wrap">SERVICE</span>
						<span className="flow-wrap title1_line">SERVICE</span>
						<span className="flow-wrap">SERVICE</span>
					</div>
				</div>
				<div className="section2_text">
					<span>
						당신에게
						<br />꼭 맞는
						<br />
						여행지 추천
					</span>
					<span>
						현재 국내
						<br />
						핫한
						<br />
						여행명소
					</span>
					<span>
						각 지역별
						<br />
						추천
						<br />
						여행명소
					</span>
					<span>
						인기
						<br />
						여행
						<br />
						리뷰글
					</span>
				</div>
				<div className="section2_text title2 flow-container">
					<div className="flow-text">
						<span className="flow-wrap2 title2_line">COMMUNITY</span>
						<span className="flow-wrap2">COMMUNITY</span>
						<span className="flow-wrap2 title2_line">COMMUNITY</span>
						<span className="flow-wrap2">COMMUNITY</span>
						<span className="flow-wrap2 title2_line">COMMUNITY</span>
						<span className="flow-wrap2">COMMUNITY</span>
					</div>
				</div>
				<div className="section2_text">
					<span>
						다른사람들의
						<br />
						여행리뷰
						<br />
						구경하기
					</span>
					<span>
						내가 다녀온
						<br />
						여행리뷰
						<br />
						공유하기
					</span>
					<span>
						MBTI
						<br />
						이야기
					</span>
					<span>
						여행메이트
						<br />
						구하기
					</span>
					<span>
						여행코스
						<br />
						추천받기
					</span>
				</div>
				<div className="arrow arrow2">
					<span />
					<span />
					<span />
				</div>
			</SnapDiv>
			<SnapDiv className="page page2">
				<div className="section3_text">
					로그인하고
					<br /> 나에게 맞는 여행지를 <br />
					추천받아보세요!
				</div>
				<div className="btnBox">
					<Link to="/login" style={{ textDecoration: 'none' }}>
						<button>로그인 하러가기</button>
					</Link>
					<Link to="/main" style={{ textDecoration: 'none' }}>
						<button>둘러보기</button>
					</Link>
				</div>
			</SnapDiv>
		</ScrollSnapWrap>
	);
}

export default Landing;
