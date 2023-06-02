import '../../Global.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import { Link } from 'react-router-dom';
import Slider, { Settings } from 'react-slick';
import styled from 'styled-components';

import community1 from '../../assets/community1.png';
import community2 from '../../assets/community2.png';
import logo from '../../assets/logo.png';
import maintab1 from '../../assets/maintab1.png';
import maintab2 from '../../assets/maintab2.png';
import maintab3 from '../../assets/maintab3.png';
import mbti from '../../assets/mbti.png';

const ScrollSnapWrap = styled.div`
	scroll-snap-type: y mandatory;
	height: 100vh;
	overflow-y: scroll;
	scroll-behavior: smooth;
	&::-webkit-scrollbar {
		display: none;
	}
	.page {
		background-image: url('../../assets/airplane1.png');
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
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		&::-webkit-scrollbar {
			display: none;
		}
		background-size: cover;
		background-image: url('../../assets/cloud.png');
	}
	.page3 {
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
		background-image: url('../../assets/cloud.png');
	}
	.logo {
		width: 400px;
		@media (max-width: 580px) {
			width: 200px;
		}
		@media (max-width: 350px) {
			width: 100px;
		}
		animation: opacityAni 3s ease-in-out;
	}
	.section1_text {
		font-size: 50px;
		font-weight: bold;
		color: white;
		margin-top: 50px;
		text-shadow: 3px 7px 5px rgba(0, 0, 0, 0.1);
		width: 550px;
		white-space: nowrap;
		overflow: hidden;
		border-right: 3px solid;
		-webkit-text-stroke: 1px white;
		animation: typing 2s steps(22), blink 0.5s step-end infinite alternate;
		@media (max-width: 580px) {
			font-size: 30px;
		}
		@media (max-width: 350px) {
			font-size: 20px;
		}
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
	.section3_text {
		font-size: 60px;
		font-weight: bold;
		color: #2d2d2d;
		@media (max-width: 528px) {
			font-size: 50px;
		}
		@media (max-width: 425px) {
			font-size: 40px;
		}
		@media (max-width: 320px) {
			font-size: 30px;
		}
	}
	.btn {
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
		@media (max-width: 528px) {
			width: 150px;
			padding: 15px 0;
			border-radius: 15px;
			font-size: 15px;
		}
		@media (max-width: 425px) {
			width: 120px;
			padding: 15px 0;
			border-radius: 13px;
			font-size: 13px;
		}
		@media (max-width: 375px) {
			width: 100px;
			padding: 15px 0;
			border-radius: 10px;
			font-size: 12px;
		}
		@media (max-width: 320px) {
			width: 70px;
			padding: 15px 0;
			border-radius: 10px;
			font-size: 10px;
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
	.btn {
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
		@media (max-width: 580px) {
			width: 30px;
			height: 30px;
		}
		@media (max-width: 350px) {
			width: 20px;
			height: 20px;
		}
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
`;

const SlideContainer = styled(Slider)`
	width: 100%;
	height: 500px;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 100px;
	@media (max-width: 1367px) {
		padding: 0 20px;
	}
	@media (max-width: 375px) {
		padding: 0 10px;
	}
	.slick-prev::before {
		font-size: 30px;
		border: none;
		color: #0db4f3;
		@media (max-width: 585px) {
			font-size: 20px;
			margin-left: 10px;
		}
	}
	.slick-next::before {
		width: 130px;
		font-size: 30px;
		border: none;
		color: #0db4f3;
		@media (max-width: 585px) {
			font-size: 20px;
			margin-left: -50px;
		}
	}
	.slick-slide {
		z-index: 100;
	}
`;

const Container = styled.div`
	width: 90%;
	height: 100vh;
	.service {
		margin: 50px 0;
		color: rgba(0, 0, 0, 0.7);
		width: 100%;
		font-size: 25px;
		padding-bottom: 10px;
		border-bottom: 2px solid rgba(0, 0, 0, 0.1);
		text-align: left;
	}
	.serviceTitle {
		font-size: 40px;
		text-align: left;
		margin-bottom: 50px;
		@media (max-width: 479px) {
			font-size: 30px;
			margin-bottom: 30px;
		}
		span {
			color: #0db4f3;
			-webkit-text-stroke: 1px #0db4f3;
		}
	}
	.horizontal {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		.vertical {
			width: 230px;
			margin-top: 100px;
			text-align: left;
			float: left;
			display: flex;
			flex-direction: column;
			@media (max-width: 1160px) {
				margin-top: 50px;
			}
			@media (max-width: 967px) {
				margin-top: 30px;
				width: 200px;
			}
			@media (max-width: 479px) {
				margin-top: 0px;
			}
			.subtitle {
				text-align: left;
				font-size: 27px;
				margin-bottom: 20px;
				@media (max-width: 967px) {
					font-size: 20px;
				}
				@media (max-width: 479px) {
					font-size: 15px;
				}
				.num {
					text-align: left;
					font-size: 50px;
					color: #0db4f3;
					-webkit-text-stroke: 1px #0db4f3;
				}
			}
			.description {
				font-size: 17px;
				color: #0db4f3;
				@media (max-width: 967px) {
					font-size: 14px;
				}
				@media (max-width: 479px) {
					font-size: 12px;
				}
			}
		}
		.mbti {
			float: right;
			width: 800px;
			@media (max-width: 1337px) {
				width: 700px;
			}
			@media (max-width: 1160px) {
				width: 600px;
			}
			@media (max-width: 937px) {
				width: 500px;
			}
			@media (max-width: 860px) {
				width: 450px;
			}
			@media (max-width: 585px) {
				width: 400px;
			}
			@media (max-width: 479px) {
				width: 300px;
			}
			@media (max-width: 375px) {
				width: 230px;
			}
		}
	}
`;

function Landing() {
	const settings: Settings = {
		arrows: true,
		dots: false,
		infinite: true,
		autoplaySpeed: 2500,
		autoplay: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		slidesPerRow: 1,
		pauseOnFocus: false,
	};

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
			<SnapDiv className="page2">
				<Container className="container">
					<div className="service">SERVICE</div>
					<div className="serviceTitle">
						<span>너의 MBTI는</span> <br />
						서비스를 소개합니다.
					</div>
					<SlideContainer {...settings}>
						<div className="horizontal">
							<div className="vertical">
								<div className="subtitle">
									<div className="num">1</div>
									당신의 <br />
									MBTI에
									<br /> 꼭 맞는
									<br /> 여행지 추천
								</div>
								<div className="description">
									로그인하고 여행지를 추천받아보세요!
								</div>
							</div>
							<img className="mbti" src={mbti} alt="" />
						</div>
						<div className="horizontal">
							<div className="vertical">
								<div className="subtitle">
									<div className="num">2</div>
									1. 지역별 추천 여행명소 <br /> 2. 우리 동네 여행명소 <br /> 3.
									인기 여행 리뷰
								</div>
								<div className="description">출처. 한국관광공사</div>
							</div>
							<img className="mbti" src={maintab1} alt="" />
						</div>
						<div className="horizontal">
							<div className="vertical">
								<div className="subtitle">
									<div className="num">2</div>
									지역별 추천 여행명소 <br /> 우리 동네 여행명소 <br /> 인기
									여행 리뷰
								</div>
								<div className="description">출처. 한국관광공사</div>
							</div>
							<img className="mbti" src={maintab2} alt="" />
						</div>
						<div className="horizontal">
							<div className="vertical">
								<div className="subtitle">
									<div className="num">2</div>
									지역별 추천 여행명소 <br /> 우리 동네 여행명소 <br /> 인기
									여행 리뷰
								</div>
								<div className="description">출처. 한국관광공사</div>
							</div>
							<img className="mbti" src={maintab3} alt="" />
						</div>
						<div className="horizontal">
							<div className="vertical">
								<div className="subtitle">
									<div className="num">3</div>
									커뮤니티
								</div>
								<div className="description">
									커뮤니티에는 말머리가 있어요!
									<br />
									다른 사람들과 여행리뷰를 공유해요.
									<br />
									여행고민을 나눌 수도 있고
									<br />
									여행메이트를 구할 수도 있어요
									<br />
									MBTI과몰입러라구요?
									<br /> MBTI탭으로 놀러가보세요!
								</div>
							</div>
							<img className="mbti" src={community1} alt="" />
						</div>
						<div className="horizontal">
							<div className="vertical">
								<div className="subtitle">
									<div className="num">3</div>
									커뮤니티
								</div>
								<div className="description">
									커뮤니티에는 말머리가 있어요!
									<br />
									다른 사람들과 여행리뷰를 공유해요.
									<br />
									여행고민을 나눌 수도 있고
									<br />
									여행메이트를 구할 수도 있어요
									<br />
									MBTI과몰입러라구요?
									<br /> MBTI탭으로 놀러가보세요!
								</div>
							</div>
							<img className="mbti" src={community2} alt="" />
						</div>
					</SlideContainer>
				</Container>
			</SnapDiv>
			<SnapDiv className="page3">
				<div className="section3_text">
					로그인하고
					<br /> 나에게 맞는 여행지를 <br />
					추천받아보세요!
				</div>
				<div className="btnBox">
					<Link to="/login" style={{ textDecoration: 'none' }}>
						<button className="btn">로그인 하러가기</button>
					</Link>
					<Link to="/main" style={{ textDecoration: 'none' }}>
						<button className="btn">둘러보기</button>
					</Link>
				</div>
			</SnapDiv>
		</ScrollSnapWrap>
	);
}

export default Landing;
