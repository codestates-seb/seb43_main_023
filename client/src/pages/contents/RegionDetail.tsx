/* eslint-disable react/destructuring-assignment */
/* eslint-disable radix */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BsCloudFog } from 'react-icons/bs';
import {
	TiWeatherCloudy,
	TiWeatherDownpour,
	TiWeatherShower,
	TiWeatherSnow,
	TiWeatherStormy,
	TiWeatherSunny,
} from 'react-icons/ti';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Modal from '../../Components/mainpage/Modal';
import { IImageProps } from '../../type/IImageProps';
import { TripInfoType } from '../../type/ITripInfo';

interface IRegionData {
	id: number;
	name: string;
	fullName: string;
	cityName: string;
	areaCode: number;
	header: string;
	thumbnail: string;
	regionIntro: string;
}

const RegionDetailContainer = styled.div`
	width: 100vw;
	height: 100%;
	margin-top: 82px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const RegionDetailImage = styled.div<IImageProps>`
	width: 100%;
	height: 40vh;
	display: flex;
	align-items: flex-end;
	> span {
		font-size: 50px;
		font-weight: 900;
		color: white;
		margin: 20px;
	}
	&::before {
		background: ${(props) => (props.image ? `url(${props.image})` : `url('')`)}
			center / cover no-repeat;
		content: '';
		position: absolute;
		left: 0;
		width: 100%;
		height: 460px;
		opacity: 0.7;
		z-index: -1;
	}
	@media (max-width: 768px) {
		height: 30vh;
	}
`;

const RegionInfo = styled.div`
	width: 90%;
	margin: 70px;
	display: flex;
	@media (max-width: 768px) {
		display: flex;
		flex-direction: column;
	}
`;

const RegionInfoImg = styled.div<IImageProps>`
	width: 40%;
	background: ${(props) => (props.image ? `url(${props.image})` : `url('')`)}
		center / cover no-repeat;
	@media (max-width: 768px) {
		width: 100%;
		height: 250px;
		margin-bottom: 20px;
	}
`;

const RegionInfoText = styled.div`
	width: 60%;
	padding-left: 20px;
	font-size: 20px;
	@media (max-width: 768px) {
		width: 100%;
	}
	.notice {
		margin-top: 20px;
		font-size: 18px;
		color: #adadad;
	}
`;

const RegionTitle = styled.div`
	width: 90%;
	font-size: 20px;
	font-weight: 700;
	text-align: start;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.source {
		font-size: 16px;
		color: #adadad;
	}
`;

const RegionRecItemContainer = styled.div`
	width: 90%;
	padding: 20px 70px 70px 70px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	@media (max-width: 1024px) {
		padding: 20px;
		justify-content: center;
	}
`;

const RegionRecItem = styled.div`
	width: 280px;
	height: 350px;
	border-radius: 20px 20px 0 0;
	margin: 20px;
`;

const RegionItemImg = styled.div<IImageProps>`
	height: 270px;
	background-image: url(${(props) => (props.image ? props.image : '')});
	background-position: center;
	background-size: cover;
	border: 1px solid #adadad;
	border-radius: 15px 15px 0 0;
`;

const RegionItemText = styled.div`
	padding: 10px;
	font-size: 18px;
	border: 1px solid #adadad;
	color: #adadad;
	> span {
		font-size: 20px;
		color: black;
	}
`;

const Weather = styled.div`
	width: 100%;
	padding: 5px;
`;

const WeatherTitle = styled.div`
	display: flex;
	align-content: center;
	font-size: 24px;
	font-weight: 700;
	> span {
		color: tomato;
		margin-left: 10px;
	}
`;

const WeatherDetail = styled.div`
	font-size: 18px;
	color: #767676;
	> span {
		font-size: 20px;
		font-weight: 700;
		color: black;
		margin-right: 5px;
	}
`;

function RegionDetail() {
	const regionData: IRegionData[] = [
		{
			id: 1,
			name: '서울',
			fullName: '서울특별시',
			cityName: 'Seoul',
			areaCode: 1,
			header:
				'https://a.cdn-hotels.com/gdcs/production117/d150/1049d859-3926-4a0d-8ae2-d7e227f902c2.jpg?impolicy=fcrop&w=800&h=533&q=medium',
			thumbnail:
				'https://images.unsplash.com/photo-1506816561089-5cc37b3aa9b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1875&q=80',
			regionIntro:
				'서울은 대한민국의 수도로서 정치, 경제, 사회, 문화의 중심지이다. 서울의 면적은 605㎢로서 도쿄의 23개 특별구와 비슷하며, 싱가포르와 뉴욕시보다 다소 작은 크기이다. 서울은 외사산과 내사산에 둘러싸인 분지의 지형이다. 그리고 수계로서 청계천, 중랑천, 홍제천, 안양천, 탄천 등의 지천이 한강으로 흘러가고 있다. 20세기 중반 들어 오늘날의 발전을 시작하였지만, 20세기 후반 들어 폭발적인 성장을 거듭하여 대도시로 성장하였다. 이에 따라, 현재 서울은 대중교통, 도로, 상하수도 등 도시기반시설도 상당한 수준에 와 있으며, 최근에는 세계의 각종 도시경쟁력 평가에서도 두각을 나타내고 있다.',
		},
		{
			id: 2,
			name: '제주',
			fullName: '제주특별자치도',
			cityName: 'Jeju-do',
			areaCode: 39,
			header:
				'https://images.unsplash.com/photo-1579169825453-8d4b4653cc2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
			thumbnail:
				'https://images.unsplash.com/photo-1562680829-7927493f7a50?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
			regionIntro:
				'제주도는 대한민국의 남해에 위치한 섬이자 대한민국에서 가장 큰 섬이다. 섬의 면적은 1,846㎢인데 이는 남한 면적의 1.83%에 해당한다. 2020년 기준 주민등록 인구는 약 67만 명으로 대한민국의 섬 중에서 가장 인구가 많다. 제주도는 중앙의 한라산을 중심으로 완만한 경사를 이루어 동서 73 km, 남북 31km의 타원형 모양을 하고 있으며, 2002년 12월 16일 유네스코가 기후 및 생물 다양성의 생태계적 가치를 인정하여 제주도를 생물권보전지역을 지정하였다',
		},
		{
			id: 3,
			name: '강원',
			fullName: '강원도',
			cityName: 'Gangwon-do',
			areaCode: 32,
			header:
				'https://images.unsplash.com/photo-1676705910596-10a68dccbe8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
			thumbnail:
				'https://images.unsplash.com/photo-1662360373919-49c32e988fc9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1975&q=80',
			regionIntro:
				'강원도는 우리나라 중부지방의 동반부를 차지하며, 중서부의 서울특별시 및 경기도와 같이 한반도의 중앙에 있다. 강원도 총면적은 20,569㎢로 전국토의 약 12％에 해당되어 함경북도와 평안북도에 이어 세번째로 큰 도이다. 그러나 휴전선 이남 우리의 행정력이 미치는 지역은 16,873㎢로 전국의 약 17％를 차지하고 있어서 경상북도에 이어 두번째로 큰 도이다.',
		},
		{
			id: 4,
			name: '경기',
			fullName: '경기도',
			cityName: 'Gyeonggi-do',
			areaCode: 31,
			header:
				'https://images.unsplash.com/photo-1607165398235-5f43c715f57b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1718&q=80',
			thumbnail:
				'https://images.unsplash.com/photo-1612708345011-a49a57be15df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
			regionIntro:
				'경기도는 동북아시아에 길게 뻗은 한반도의 서부 중앙 지역이다. 수도 서울과 인천을 둘러싸고 있어 수도권을 하나로 연결하는 지하철 등 수도권 대중 교통망 이용이 용이하다. 북동부의 산악지역에서 남서쪽 해안지역에 이르는 천혜의 자연조건과 한민족의 정체성을 형성해 온 역사와 문화를 배경으로 경기도는 세계에 자랑하는 풍부한 관광자원을 보유하고 있다.',
		},
		{
			id: 5,
			name: '부산',
			fullName: '부산광역시',
			cityName: 'Busan',
			areaCode: 6,
			header:
				'https://images.unsplash.com/photo-1638591751482-1a7d27fcea15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80',
			thumbnail:
				'https://images.unsplash.com/photo-1609137929473-680b60780d64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
			regionIntro:
				'대한민국의 제2의 도시이자 최대의 해양(항구) 도시이며, 부산항을 중심으로 해상 무역과 물류 산업이 발달하였다. 일본과는 대한해협과 대마도를 사이에 두고 마주하고 있다. 부산이라는 이름 자체도 가마솥을 닮은 산이 많아 지어졌을 정도로 도심 안에 산이 많고, 산을 경계로 여러 생활권으로 도시가 분리되어 있다.',
		},
		{
			id: 6,
			name: '울산',
			fullName: '울산광역시',
			cityName: 'Ulsan',
			areaCode: 7,
			header:
				'https://images.unsplash.com/photo-1654061394903-fd141e2c97bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
			thumbnail:
				'https://images.unsplash.com/photo-1659844813400-cfafd13c2141?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
			regionIntro:
				'울산은 대한민국의 남동쪽에 위치한 대한민국에서 7번째로 큰 광역 도시이다. 정부가 지정한 산업특구로서 국내 최대 규모의 자동차, 화학, 조선, 정유 산업 등이 있는 대한민국 최대 경제 중심지 중 하나이다. 지리적으로 남동쪽 해안에 접해 있어 아름다운 해변과 따뜻한 기후가 자랑거리이며, 도심 속에 자연이 한껏 어우러진 아름다운 도시이다.',
		},
		{
			id: 7,
			name: '대구',
			fullName: '대구광역시',
			cityName: 'Daegu',
			areaCode: 4,
			header:
				'https://images.unsplash.com/photo-1549898395-045c8fa2883b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
			thumbnail:
				'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=36cd6f2b-274a-45c5-ba89-df6ca5c1dcf3',
			regionIntro:
				'한국의 3대 도시 중 하나인 대구는 인구 243만, 884㎢의 면적을 가지며, 전국 7대 도시 중 1인 공원 면적을 가장 많이 가지고 있는 환경도시이다. 남쪽으로는 비슬 산과 대덕산, 북쪽으로는 팔공산이 둘러싸고 있으며, 금호강과 낙동강이 도시를 지나며 자연과 도시가 공존하는 환경을 만들고 있다.',
		},
		{
			id: 8,
			name: '대전',
			fullName: '대전광역시',
			cityName: 'Daejeon',
			areaCode: 3,
			header:
				'http://newsimg.hankookilbo.com/2016/10/21/201610211159329181_1.jpg',
			thumbnail:
				'https://images.unsplash.com/photo-1526199119161-4be1e3368d52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
			regionIntro:
				'대전은 대한민국 5대 도시 중 하나이며, 국토의 중심부에 위치하고 있다. 5개 구 79개 동으로 이루어진 광역시로서 인구는 150만명이고, 면적은 540㎢에 달한다. 중부지역에 위치하여 기후가 온난하다. 한국과학기술의 메카라고 할 수 있으며, 한국과학기술원(KAIST), 한국항공우주연구원(KARI) 등 1,400여개 기관이 입주하고 있다.',
		},
		{
			id: 9,
			name: '인천',
			fullName: '인천광역시',
			cityName: 'Incheon',
			areaCode: 2,
			header:
				'https://images.unsplash.com/photo-1634131431002-8fe857eb64a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
			thumbnail:
				'https://images.unsplash.com/photo-1446733993804-c62a351c7239?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
			regionIntro:
				'인천은 한반도 한가운데 위치하고 있으며, 대륙성 기후에 속하면서도 해안에 위치하여 다른 내륙지방보다는 해양성 기후의 특성도 일부 가지고 있어 기온의 연교차가 적은 편이다. 인천의 해안은 리아스식 해안(rias coast)으로 해안선이 길고 복잡하며 섬이 많다. 인천에는 모두 168개의 섬이 있으며, 이중 128개가 사람이 살지 않는 무인도이다.',
		},
		{
			id: 10,
			name: '광주',
			fullName: '광주광역시',
			cityName: 'Gwangju',
			areaCode: 5,
			header:
				'https://images.unsplash.com/photo-1593419522318-81b7c346a3e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2854&q=80',
			thumbnail:
				'https://images.unsplash.com/photo-1593419521850-c2dd6cf28a4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2059&q=80',
			regionIntro:
				'한반도의 서남단에 있는 대한민국에서 다섯 번 째로 큰 도시이다. 시의 동부에 무등산 국립공원이 있고, 도심에 광주천이 흐른다. 호남지방의 경제, 행정, 교육, 문화의 중심도시로서, 고등법원, 지방 국세청 등 광주·전라지역을 관할하는 관공서와 기업의 지역본부 및 자회사 등이 밀집한 호남권 거점도시이다.',
		},
		{
			id: 11,
			name: '경남',
			fullName: '경상남도',
			cityName: 'Gyeongsangnam-do',
			areaCode: 36,
			header:
				'https://images.unsplash.com/photo-1529528070131-eda9f3e90919?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
			thumbnail:
				'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=cda1ab4f-a328-49aa-9bbe-ed3156ed054f',
			regionIntro:
				'우리나라에서 가장 아름다운 섬과 바다, 명산이 있는 곳으로 해인사를 비롯한 수많은 명찰(名刹)이 깊은 산중에 자리하고, 지리산과 황매산 등 살아생전 꼭 한 번 올라볼 만한 명산도 많다. 거제와 남해 등에는 크고 작은 섬이 약 400여 개에 이르는데 이는 경남 전체 면적의 약 8.5%에 달한다. 또 위도 상 일본의 교토와 나고야, 지중해의 키프로스, 미국의 오클라호마와 비슷한 연중 온화한 날씨를 보인다.',
		},
		{
			id: 12,
			name: '경북',
			fullName: '경상북도',
			cityName: 'Gyeongsangbuk-do',
			areaCode: 35,
			header:
				'https://images.unsplash.com/photo-1669764372822-3cb8476d4f47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80',
			thumbnail:
				'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=d87d0222-10d0-4e1e-bad8-993a331a9243',
			regionIntro:
				'찬란한 신라 천년의 불교문화와 신비의 가야문화 그리고 선비정신의 유교문화 등 민족 문화의 본산지이자 한국 문화의 얼굴이다. 대체로 산지가 많고 고도가 높은 편이며, 풍부한 문화자원과 천혜의 관광자원, 지역의 높은 문화적 역량을 바탕으로 전통과 현대가 어우러지는 세계적인 문화ㆍ관광중심지로 가꾸어 나가고 있다',
		},
		{
			id: 13,
			name: '전남',
			fullName: '전라남도',
			cityName: 'Jeollanam-do',
			areaCode: 38,
			header:
				'https://cdn.gjdream.com/news/photo/202101/605746_205437_2251.jpg',
			thumbnail:
				'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=1feb5c5a-fe09-449d-a27b-a3dee077e752',
			regionIntro:
				'전라남도는 우리나라의 서남부에 위치한 도이다. 서쪽과 남쪽은 바다를 끼고 있으며, 우리나라의 대표적인 리아스식 해안을 이룬다. 역사적으로 전남 도민들은 애국심이 강하며, 1592년 임진왜란 당시 전남 다도해에서 거북선을 이용하여 일본 해군을 물리친 이순신 장군의 승리를 도왔고, 의병, 승병 활동으로 나라를 지켜낸 선조들에 대한 긍지가 높다.',
		},
		{
			id: 14,
			name: '전북',
			fullName: '전라북도',
			cityName: 'Jeollabuk-do',
			areaCode: 37,
			header:
				'https://images.unsplash.com/photo-1653329315898-afe70b1335ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
			thumbnail:
				'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=d3bdd1b8-0601-4a9e-a10b-6a9bc80371de',
			regionIntro:
				'한반도 서남부에 위치해있는 전북은 100m 내외의 낮은 준평야가 익산·김제·정읍시에 넓게 펼쳐져 있어 호남평야의 중심지가 되고 있으며 쌀의 주산지로 한국농업의 상징이기도 하다. 사시사철 변하는 아름다운 자연환경 산과 들, 바다 향기가 가득한 맛깔스런 음식, 자연과 사람이 한데 어우러지는 다양한 축제가 열리는 도시로도 유명하다.',
		},
		{
			id: 15,
			name: '충남',
			fullName: '충청남도',
			cityName: 'Chungcheongnam-do',
			areaCode: 34,
			header:
				'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=3896ab79-c334-4752-b73d-59bc431d0c8a',
			thumbnail:
				'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=d82b6c23-2f8e-4a08-b88b-18074b33af60',
			regionIntro:
				'한반도의 중앙부 서쪽에 위치하는 지역으로서 기후상으로는 사계절이 뚜렷하고, 기온이 온화한 중위도 온대 계절풍 기후대에 속해 대체로 온화한 편이나, 겨울에는 북서풍을 막을만한 지형적 장애물이 적어 같은 위도상의 동해안보다 추우며, 서북부 해안지대는 적설량이 많은 것이 특징이다.',
		},
		{
			id: 16,
			name: '충북',
			fullName: '충청북도',
			cityName: 'Chungcheongbuk-do',
			areaCode: 33,
			header: 'http://noms.templestay.com/images/TiImage/H/L/9569.png',
			thumbnail:
				'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=3b42e0d7-9266-4c24-8327-5407d3702e18',
			regionIntro:
				'위도상으로는 중위도에 속하며 우리나라에서 바다에 접하지 않은 유일한 내륙도이다. 때문에 여름은 고온다습하고 겨울은 한랭건조한 온대온순기후로서 계절의 변화가 뚜렷할 뿐만 아니라 농산물이 풍부하고 품종도 다양하다. 남한강과 금강이 흐르고 있으며, 토지가 비옥하고 낮은 평야가 많이 있다. ',
		},
	];

	const { id } = useParams();

	const selectedRegion = regionData.filter((e) => e.id === Number(id));

	const navigate = useNavigate();
	const [weatherData, setWeatherData] = useState<any>({
		temp: '',
		id: 0,
		temp_max: 0,
		temp_min: 0,
	});

	const apiKey = process.env.REACT_APP_WEATHER_KEY;
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${selectedRegion[0].cityName}&appid=${apiKey}`;

	useEffect(() => {
		setTimeout(() => {
			axios(url)
				.then((response) => {
					const { data } = response;
					setWeatherData({
						temp: data.main.temp,
						id: data.weather[0].id,
						temp_max: data.main.temp_max,
						temp_min: data.main.temp_min,
					});
				})
				.catch(() => {
					navigate('/error');
				});
		}, 500);
	}, [navigate, url]);

	const selectIcon = () => {
		const iconId =
			weatherData.id === 800 ? 0 : (parseInt(weatherData.id) / 100).toFixed(0);
		switch (iconId) {
			case '0':
				return <TiWeatherSunny />;
			case '2':
				return <TiWeatherStormy />;
			case '3':
				return <TiWeatherShower />;
			case '5':
				return <TiWeatherDownpour />;
			case '6':
				return <TiWeatherSnow />;
			case '7':
				return <BsCloudFog />;
			case '8':
				return <TiWeatherCloudy />;
			default:
				return <TiWeatherSunny />;
		}
	};
	const tourAPIKey = process.env.REACT_APP_TOURAPI_KEY;
	const tourUrl = `https://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=${tourAPIKey}&pageNo=1&numOfRows=6&MobileApp=AppTest&MobileOS=ETC&arrange=Q&contentTypeId=12&areaCode=${selectedRegion[0].areaCode}&_type=json`;

	const [tripInfo, setTripInfo] = useState([]);

	useEffect(() => {
		axios(tourUrl)
			.then((response) => {
				const { data } = response;
				setTripInfo(data.response.body.items.item);
			})
			.catch(() => {
				navigate('/error');
			});
	}, [navigate, tourUrl]);

	const [isOpen, setIsOpen] = useState(false);
	const [tourText, setTourText] = useState('');

	const handleClick = (e: number) => {
		const infoUrl = `https://apis.data.go.kr/B551011/KorService1/detailCommon1?serviceKey=xxX98WzuruiLkUpHRO1aF2fTMT2LMrHfz62vItLgl901peg7v8IerpFAaTlujQijG7UMxbtM0oudo6wO3gN5%2BA%3D%3D&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${e}&overviewYN=Y`;
		axios(infoUrl)
			.then((response) => {
				const { data } = response;
				const intro = data.response.body.items.item[0].overview;
				setIsOpen(true);
				setTourText(intro);
			})
			.catch(() => {
				navigate('/error');
			});
	};

	return (
		<RegionDetailContainer>
			<Modal text={tourText} isOpen={isOpen} setIsOpen={setIsOpen} />
			<RegionDetailImage image={selectedRegion[0].header}>
				<span>{selectedRegion[0].name} 여행 추천 명소</span>
			</RegionDetailImage>
			<RegionInfo>
				<RegionInfoImg image={selectedRegion[0].thumbnail} />
				<RegionInfoText>
					<Weather>
						<WeatherTitle>
							{selectedRegion[0].fullName} <span>{selectIcon()}</span>
						</WeatherTitle>
						<WeatherDetail>
							<span>{(weatherData.temp - 273.15).toFixed(1)}°C</span>
							최고: {(weatherData.temp_max - 273.15).toFixed(1)}°C / 최저:{' '}
							{(weatherData.temp_min - 273.15).toFixed(1)}°C
						</WeatherDetail>
					</Weather>
					{selectedRegion[0].regionIntro}
					<div className="notice">
						여행지를 클릭하면 여행지에 대한 자세한 설명을 볼 수 있습니다.
					</div>
				</RegionInfoText>
			</RegionInfo>
			<RegionTitle>
				<span>📍{selectedRegion[0].name}의 명소</span>
				<span className="source">(자료출처 : 한국관광공사)</span>
			</RegionTitle>
			<RegionRecItemContainer>
				{tripInfo
					? tripInfo.map((item: TripInfoType) => {
							return (
								<RegionRecItem
									onClick={() => handleClick(item.contentid)}
									key={item.contentid}
								>
									<RegionItemImg image={item.firstimage} />
									<RegionItemText>
										<span>{item.title}</span>
										<div>{item.addr1}</div>
									</RegionItemText>
								</RegionRecItem>
							);
					  })
					: null}
			</RegionRecItemContainer>
		</RegionDetailContainer>
	);
}

export default RegionDetail;
