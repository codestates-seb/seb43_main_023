/* eslint-disable react/no-array-index-key */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Banner from '../Components/Banner';
import Carousel from '../Components/Carousel';
import CarouselHotPlace from '../Components/CarouselHotPlace';
import MainHeader from '../Components/MainHeader';
import UserHeader from '../Components/UserHeader';

const MainContainer = styled.div`
	width: 100vw;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const MainTab = styled.div`
	width: 90%;
	height: 70px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px;
`;

const MainTabButton = styled.div`
	text-align: center;
	font-size: 24px;
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
	text-align: end;
	font-weight: 600;
	> span {
		color: #0db4f3;
	}
`;

const BannerContainer = styled.div`
	width: 90%;
	height: 200px;
	margin: 50px 0;
	padding: 10px;
`;

function MainPage() {
	const [isLogin, setIsLogin] = useState(false);
	const [currentTab, setCurrentTab] = useState(0);

	console.log(currentTab);

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
				return <CarouselHotPlace />;
			default:
				return <Carousel />;
		}
	};

	const moveToPage = () => {
		switch (currentTab) {
			case 0:
				return (
					<Link to="/">
						<span>전체보기</span>
					</Link>
				);
			case 1:
				return (
					<Link to="/hotplace">
						<span>전체보기</span>
					</Link>
				);
			case 2:
				return (
					<Link to="/hotreview">
						<span>전체보기</span>
					</Link>
				);
			default:
				return <span>전체보기</span>;
		}
	};

	return (
		<MainContainer>
			{isLogin ? <UserHeader /> : <MainHeader />}
			<MainTab>
				<MainTabButton onClick={() => handleTabClick(0)}>
					지역별 추천 여행 명소
				</MainTabButton>
				<MainTabButton onClick={() => handleTabClick(1)}>
					국내 핫한 여행 명소
				</MainTabButton>
				<MainTabButton onClick={() => handleTabClick(2)}>
					인기 여행 리뷰글
				</MainTabButton>
				<Link to="/community">
					<MainTabButton>커뮤니티</MainTabButton>
				</Link>
			</MainTab>
			<MainContentsContainer>
				<SlideContainer>
					{renderCarousel()}
					{moveToPage()}
				</SlideContainer>
				<BannerContainer>
					<Banner />
				</BannerContainer>
			</MainContentsContainer>
		</MainContainer>
	);
}

export default MainPage;
