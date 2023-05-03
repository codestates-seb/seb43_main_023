/* eslint-disable react/no-array-index-key */
import { useState } from 'react';
import styled from 'styled-components';
import Banner from '../Components/Banner';
import Carousel from '../Components/Carousel';
import Footer from '../Components/Footer';
import MainHeader from '../Components/MainHeader';
import UserHeader from '../Components/UserHeader';

const MainContainer = styled.div`
	width: 100vw;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #fafafa;
`;

const MainTab = styled.div`
	width: 100%;
	height: 70px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px;
`;

const MainTabButton = styled.span`
	width: 25%;
	text-align: center;
	font-size: 30px;
	padding: 10px;
	border-radius: 15px;
	margin-top: 20px;
	&:hover {
		color: rgb(250, 250, 250);
		background-color: #0db4f3;
		transition: all 0.3s linear;
	}
`;

const MainContentsContainer = styled.div`
	width: 95%;
	height: 650px;
	border-radius: 50px 50px 0 0;
	box-shadow: 0px 2px 11px 1px #999999;
	margin: 20px 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 50px;
`;

const SlideContainer = styled.div`
	width: 90%;
	height: 270px;
`;

const BannerContainer = styled.div`
	width: 90%;
	height: 200px;
	margin: 50px 0;
	padding: 10px;
`;

function MainPage() {
	const [isLogin, setIsLogin] = useState(false);

	return (
		<MainContainer>
			{isLogin ? <UserHeader /> : <MainHeader />}
			<MainTab>
				<MainTabButton>지역별 추천 여행 명소</MainTabButton>
				<MainTabButton>국내 핫한 여행 명소</MainTabButton>
				<MainTabButton>인기 여행 리뷰글</MainTabButton>
				<MainTabButton>커뮤니티</MainTabButton>
			</MainTab>
			<MainContentsContainer>
				<SlideContainer>
					<Carousel />
				</SlideContainer>
				<BannerContainer>
					<Banner />
				</BannerContainer>
			</MainContentsContainer>
			<Footer />
		</MainContainer>
	);
}

export default MainPage;
