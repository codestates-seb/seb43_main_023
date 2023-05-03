/* eslint-disable react/no-array-index-key */
import styled from 'styled-components';
import Banner from '../Components/Banner';
import Carousel from '../Components/Carousel';
import MainHeader from '../Components/MainHeader';
import '../Global.css';

const MainContainer = styled.div`
	width: 100vw;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
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

const TempNav = styled.div`
	width: 100%;
	height: 71px;
	background-color: rgba(250, 250, 250, 1);
`;

const TempFooter = styled.div`
	width: 100%;
	height: 278px;
	background-color: tomato;
`;

const SlideContainer = styled.div`
	width: 90%;
	height: 270px;
	border: 1px solid black;
	padding: 10px;
`;

const BannerContainer = styled.div`
	width: 90%;
	height: 200px;
	border: 1px solid black;
	margin: 50px 0;
	padding: 10px;
`;

function MainPage() {
	return (
		<MainContainer>
			<TempNav />
			<MainHeader />
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
			<TempFooter />
		</MainContainer>
	);
}

export default MainPage;
