import axios from 'axios';
import { HTMLAttributes, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface SlideItemProps extends HTMLAttributes<HTMLDivElement> {
	image?: string;
}

type TripInfoType = {
	contentid: number;
	firstimage: string;
	title: string;
	addr1: string;
};

const backgroundImg =
	'https://images.unsplash.com/photo-1601621915196-2621bfb0cd6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1744&q=80';

const HotPlaceContainer = styled.div`
	width: 100%;
	height: 100%;
	margin-top: 82px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const HotPlaceImage = styled.div`
	width: 100%;
	height: 40vh;
	background-image: linear-gradient(
			rgba(255, 255, 255, 0.25),
			rgba(255, 255, 255, 0.25)
		),
		url(${backgroundImg});
	background-position: center;
	background-size: cover;
	display: flex;
	align-items: flex-end;
	@media (max-width: 768px) {
		height: 30vh;
	}
	> span {
		font-size: 50px;
		font-weight: 900;
		color: white;
		margin: 20px;
		@media (max-width: 425px) {
			font-size: 36px;
		}
	}
`;

const HotPlaceItemContainer = styled.div`
	width: 90vw;
	padding: 70px;
	@media (max-width: 768px) {
		padding: 20px;
	}
`;

const HotPlaceItem = styled.div`
	border-bottom: 1px solid black;
	padding: 20px 0;
	display: flex;
	@media (max-width: 425px) {
		display: flex;
		flex-direction: column;
	}
	@media (max-width: 768px) {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
`;

const HotPlaceImg = styled.div<SlideItemProps>`
	width: 300px;
	height: 300px;
	background-image: url(${(props) => (props.image ? props.image : '')});
	background-position: center;
	background-size: cover;
	border-radius: 15px;
	@media (max-width: 768px) {
		width: 80vw;
	}
	@media (max-width: 425px) {
		width: 80vw;
		height: 20vh;
	}
`;

const HotPlaceInfo = styled.div`
	width: 70%;
	margin-left: 20px;
	display: flex;
	flex-direction: column;
	> span {
		margin: 10px;
		font-size: 20px;
		@media (max-width: 768px) {
			width: 80vw;
			margin-left: 0;
		}
	}
	@media (max-width: 768px) {
		margin-left: 0;
	}
	.HotPlaceBold {
		font-size: 28px;
		font-weight: 700;
		@media (max-width: 768px) {
			margin: 20px 0 0 0;
		}
	}
`;

function HotPlace() {
	const [myLocation, setMyLocation] = useState({
		latitude: 37.541,
		longitude: 126.986,
	});
	const navigate = useNavigate();

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			setMyLocation({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			});
		});
	}, []);

	const tourAPIKey = process.env.REACT_APP_TOURAPI_KEY;
	const tourUrl = `https://apis.data.go.kr/B551011/KorService1/locationBasedList1?serviceKey=${tourAPIKey}&numOfRows=5&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=Q&mapX=${myLocation.longitude}&mapY=${myLocation.latitude}&radius=15000&contentTypeId=12`;

	const [tripNumber, setTripNumber] = useState<string[]>();

	useEffect(() => {
		axios(tourUrl)
			.then((response) => {
				const { data } = response;
				const newArr = data.response.body.items.item;
				const tripcode: string[] = [];
				newArr.map((item: { contentid: string }) => {
					return tripcode.push(item.contentid);
				});
				setTripNumber(tripcode);
			})
			.catch(() => {
				navigate('/error');
			});
	}, [navigate, tourUrl]);

	console.log(tripNumber);

	const regionUrl = `https://apis.data.go.kr/B551011/KorService1/locationBasedList1?serviceKey=${tourAPIKey}&numOfRows=5&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=Q&mapX=${myLocation.longitude}&mapY=${myLocation.latitude}&radius=15000&contentTypeId=12`;

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

	return (
		<HotPlaceContainer>
			<HotPlaceImage>
				<span>🔥 핫한 여행지 추천 TOP5</span>
			</HotPlaceImage>
			<HotPlaceItemContainer>
				<HotPlaceItem>
					<HotPlaceImg image="https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=9c991ae8-67f8-4037-a3b3-dd2ed916a161" />
					<HotPlaceInfo>
						<span className="HotPlaceBold">월미 테마파크</span>
						<span>
							자연풍광이 뛰어난 월미도에서 1992년 개장이래 많은 사랑을 받아오던
							마이랜드를 시작으로, 2009년 월미테마파크라는 4000평 규모의 대규모
							시설로 재 탄생하였다. 월미테마파크는 지상 70M높이 하이퍼 샷·드롭
							부터 월미도의 타가다디스코, 2층바이킹, 115M 대관람차 등어트랙션이
							완비되어 있어 우리결혼했어요, 1박 2일, 런닝맨 등 다양한
							방송출연지로 전국적인 유명세를 떨치고 있다. 2,500평 규모 실내
							어린이 놀이체험관 차피패밀리파크와 물놀이 시설 미니후룸라이드,
							물놀이보트, 물공놀이 등 어린이 놀이시설, 4D영상관 까지
							어린아이부터 어른까지 모두가 즐길 수 있는 곳이다.
						</span>
					</HotPlaceInfo>
				</HotPlaceItem>
				<HotPlaceItem>
					<HotPlaceImg image="https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=42c91d42-7f91-4c72-9794-8f93a2662228" />
					<HotPlaceInfo>
						<span className="HotPlaceBold">백야자연휴양림</span>
						<span>
							백야자연휴양림은 충북 음성군 금왕읍 백야리에 위치한
							공립자연휴양림이다. 지정 면적은 37ha이다. 휴양림에는 숙박시설,
							오토캠핑장, 수목원, 목재 문화체험장이 갖춰져 있다. 숙박시설은 총
							29개소, 캠핑사이트는 26개소로 숲나들 e사이트를 통하여 사전예약 후
							이용할 수 있다. 수목원에는 난대식물을 관찰할 수 있는 유리온실,
							자라 모양을 닮은 자라암석원, 여러 종류의 장미를 구경할 수 있는
							장미동산이 있다. 목재 문화체험장은 관람 및 목공예 체험이 가능한
							공간이다.
						</span>
					</HotPlaceInfo>
				</HotPlaceItem>
				<HotPlaceItem>
					<HotPlaceImg image="https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1200,h_630/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/asckwf8sm8ij6bhjxi99/%EB%8C%80%EA%B5%AC%20%EC%9D%B4%EC%9B%94%EB%93%9C%20%EC%9E%90%EC%9C%A0%EC%9D%B4%EC%9A%A9%EA%B6%8C.jpg" />
					<HotPlaceInfo>
						<span className="HotPlaceBold">제주 대포해안</span>
						<span>
							용암이 식어 굳을 때 부피가 줄어들면서 6각형의 돌기둥으로
							갈라지는데, 이러한 수직 방향의 틈을 주상절리라고 한다. 제주도에는
							여러 곳에서 주상절리 지형을 볼 수 있는데, 그 정교함과 아름다움
							면에서 대포 해안의 주상절리를 따라가기 어렵다. 천연기념물로 지정된
							이곳의 주상절리대는 약 25만 년에서 14만 년 전 사이에 녹하지악
							분화구에서 흘러나온 용암이 식으면서 형성된 것으로 추정된다.
							제주올레길 8코스 중 최대볼거리인 대포 해안은 제주 국제컨벤션센터
							앞 해안에서 시작해 대포 주상절리를 거쳐 대포포구까지 이어진다.
							높은 주상절리 절벽에 새하얀 파도가 부딪히는 모습은 그야말로
							예술작품을 방불케 한다.
						</span>
					</HotPlaceInfo>
				</HotPlaceItem>
				<HotPlaceItem>
					<HotPlaceImg image="https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=786b4ca3-8549-47b6-a47e-368aa9b5b8dd" />
					<HotPlaceInfo>
						<span className="HotPlaceBold">정선 화암관광지</span>
						<span>
							정선군 화암면 화암리와 몰운리 일대 화암관광지는 빼어난 자연 경관을
							자랑한다. 화암약수, 거북바위, 화암동굴, 물운대 등 화암8경이
							구비마다 시선을 끈다. 유유자적 여행하다 잠깐씩 멈춰 서서 몸과
							마음의 피로를 씻어낼 만한 여행지가 많다. 그 가운데 1경은
							화암약수다. 화암약수는 탄산이온 성분을 함유하고 있어 탄산수처럼 톡
							쏘는 맛이 특징이다. 나쁜 사람이 마실 때는 약수 안에 구렁이가
							보인다는 전설이 있다. 2경인 거북바위와 3경인 용마소 등이 근처에
							있다. 화암약수 야영장 또한 자연의 품 안에서 쉬어가기에 알맞다.
							인근 그림바위마을은 한적하게 산책하기에 좋다. 화암약수 못지않게
							유명한 곳이 4경에 해당하는 화암동굴이다. 화암동굴은 석회암동굴로
							천연기념물이다. 동굴 입구까지는 모노레일을 타고 이동할 수 있다.
							동굴 내부는 옛 금광의 흔적과 석회암동굴이 공존한다. 동굴 길이는
							1,803m로 돌아보는데 약 1시간 30분이 걸린다.
						</span>
					</HotPlaceInfo>
				</HotPlaceItem>
				<HotPlaceItem>
					<HotPlaceImg image="https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=7319438e-4e09-4fbd-9524-e25420bdd917" />
					<HotPlaceInfo>
						<span className="HotPlaceBold">순창 강천산 군립공원</span>
						<span>
							전북 순창군 팔덕면 청계리 996번지 일대에 위용을 자랑하고 있는
							강천산 왕자봉(해발583.7m)과 광덕산 선녀봉(해발578m)을 비롯하여
							산성산 연대봉(해발603m)을 중심으로 세개의 산 사이로 병풍을
							둘러치듯이 남록과 북록으로 나뉘어 작은 협곡을 이루고 있으며,
							사방이 모두 바위산으로 빼어난 아름다움을 간직한 자랑스러운 산이다.
							골짜기마다 단단한 암반위로 깨끗하고 맑은 물이 샘처럼 솟아
							흐른다하여 강천이라 불렀고 그 주변의 모든 산을 강천산이라 하였다.
							예전에는 용천산(龍泉山)이라 불렀다고 한다. 두 마리의 용이 하늘을
							향해 꼬리를 치며 승천하는 형상이라 지어진 이름이다.
						</span>
					</HotPlaceInfo>
				</HotPlaceItem>
			</HotPlaceItemContainer>
		</HotPlaceContainer>
	);
}

export default HotPlace;
