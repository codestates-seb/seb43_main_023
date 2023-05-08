/* eslint-disable react/no-array-index-key */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Banner from '../Components/Banner';
import Carousel from '../Components/Carousel';
import CarouselHotPlace from '../Components/CarouselHotPlace';
import CarouselReview from '../Components/CarouselReview';
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
	.linkButton {
		text-align: end;
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
	height: 200px;
	margin: 50px 0;
	padding: 0px;
`;
const ButtonContainer = styled.div`
	width: 85%;
	display: flex;
	padding-right: 50px;
	justify-content: flex-end;
`;

function MainPage() {
	const token = localStorage.getItem('accessToken');
	const [currentTab, setCurrentTab] = useState(0);

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
					<Link to="/regionrec">
						<div className="linkButton">전체보기</div>
					</Link>
				);
			case 1:
				return (
					<Link to="/hotplace">
						<div className="linkButton">전체보기</div>
					</Link>
				);
			case 2:
				return (
					<Link to="/hotreview">
						<div className="linkButton">전체보기</div>
					</Link>
				);
			default:
				return <div>전체보기</div>;
		}
	};

	return (
		<MainContainer>
			{token ? <UserHeader /> : <MainHeader />}
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
