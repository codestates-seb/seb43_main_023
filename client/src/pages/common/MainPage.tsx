/* eslint-disable react/no-array-index-key */
import { useState } from 'react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Banner from '../../Components/mainpage/Banner';
import Carousel from '../../Components/mainpage/Carousel';
import CarouselHotPlace from '../../Components/mainpage/CarouselNearbyPlace';
import CarouselReview from '../../Components/mainpage/CarouselReview';
import MainHeader from '../../Components/mainpage/MainHeader';
import UserHeader from '../../Components/mainpage/UserHeader';
import { RootState } from '../../store/Store';
import { Ilogin } from '../../type/Ilogin';

const MainContainer = styled.div`
	width: 100vw;
	display: flex;
	flex-direction: column;
	align-items: center;
	scroll-behavior: smooth;
	scroll-snap-type: y mandatory;
	scroll-padding-top: 10px;
	overflow-y: scroll;
	&::-webkit-scrollbar {
		width: 0;
		background: transparent;
	}
`;

const MainTab = styled.div`
	width: 90%;
	height: 66px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px;
	@media (max-width: 768px) {
		flex-direction: column;
		flex-wrap: wrap;
		height: 180px;
		justify-content: center;
	}
	@media (max-width: 425px) {
		flex-wrap: nowrap;
	}
`;

const MainTabButton = styled.div`
	text-align: center;
	font-size: 24px;
	padding: 10px;
	border-radius: 50px;
	margin-top: 20px;
	&:hover {
		color: rgb(250, 250, 250);
		background-color: #0db4f3;
		transition: all 0.3s linear;
	}
	@media (max-width: 720px) {
		font-size: 20px;
	}
	@media (max-width: 425px) {
		padding: 5px;
		margin-top: 10px;
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
	.linkButton {
		text-align: end;
	}
	@media (max-width: 768px) {
		margin: 20px 0;
	}
`;

const SlideContainer = styled.div`
	width: 85%;
	text-align: right;
	font-weight: 600;
	> span {
		color: #0db4f3;
	}
`;

const BannerContainer = styled.div`
	width: 85.5%;
	margin: 50px 0;
	padding: 0px;
`;
const ButtonContainer = styled.div`
	width: 85%;
	display: flex;
	padding-right: 50px;
	justify-content: flex-end;
	scroll-snap-align: start;
`;

const StyledLink = styled(Link)`
	color: black;
	&:visited {
		color: black;
	}
`;

function MainPage() {
	const [currentTab, setCurrentTab] = useState(0);
	const login = useSelector((state: RootState) => state.login) as Ilogin;

	const handleTabClick = (index: number) => {
		setCurrentTab(index);
	};

	const renderCarousel = () => {
		switch (currentTab) {
			case 0:
				return <Carousel />;
			case 1:
				return <CarouselHotPlace />;
			case 2:
				return <CarouselReview />;
			default:
				return <Carousel />;
		}
	};

	const moveToPage = () => {
		switch (currentTab) {
			case 0:
				return (
					<StyledLink to="/regionrec" style={{ textDecoration: 'none' }}>
						<div className="linkButton">전체보기</div>
					</StyledLink>
				);
			case 1:
				return (
					<StyledLink to="/hotplace" style={{ textDecoration: 'none' }}>
						<div className="linkButton">전체보기</div>
					</StyledLink>
				);
			case 2:
				return (
					<StyledLink to="/hotreview" style={{ textDecoration: 'none' }}>
						<div className="linkButton">전체보기</div>
					</StyledLink>
				);
			default:
				return <div>전체보기</div>;
		}
	};

	return (
		<MainContainer>
			{login.isLogin ? <UserHeader /> : <MainHeader />}
			<MainTab>
				<MainTabButton onClick={() => handleTabClick(0)}>
					🗺️ 지역별 추천 여행 명소
				</MainTabButton>
				<MainTabButton onClick={() => handleTabClick(1)}>
					🧭 우리 동네 여행 명소
				</MainTabButton>
				<MainTabButton onClick={() => handleTabClick(2)}>
					🔥 인기 여행 리뷰글
				</MainTabButton>
				<StyledLink to="/community" style={{ textDecoration: 'none' }}>
					<MainTabButton>💬 커뮤니티</MainTabButton>
				</StyledLink>
			</MainTab>
			<MainContentsContainer>
				<SlideContainer>{renderCarousel()}</SlideContainer>
				<ButtonContainer>{moveToPage()}</ButtonContainer>
				<BannerContainer>
					<Banner />
				</BannerContainer>
			</MainContentsContainer>
		</MainContainer>
	);
}

export default MainPage;
