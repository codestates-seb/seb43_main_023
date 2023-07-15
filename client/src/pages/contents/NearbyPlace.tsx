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
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Pagination from '../../Components/community/Pagination';
import Modal from '../../Components/mainpage/Modal';
import { IImageProps } from '../../type/IImageProps';
import { TripInfoType } from '../../type/ITripInfo';

const NearbyPlaceContainer = styled.div`
	width: 100vw;
	height: 100%;
	margin-top: 82px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	@media (min-width: 1920px) {
		margin-left: auto;
		margin-right: auto;
		max-width: 1920px;
	}
`;

const NearbyPlaceDetailImage = styled.div<IImageProps>`
	width: 100%;
	height: 40vh;
	display: flex;
	align-items: flex-end;
	> span {
		font-size: 50px;
		font-weight: 900;
		color: white;
		margin: 20px;
		@media (max-width: 768px) {
			font-size: 38px;
		}
		@media (max-width: 425px) {
			font-size: 30px;
		}
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
		@media (min-width: 1920px) {
			margin-left: auto;
			margin-right: auto;
			max-width: 1920px;
			left: calc((100vw - 1920px) / 2);
		}
	}
	@media (max-width: 768px) {
		height: 30vh;
	}
`;

const NearbyPlaceInfo = styled.div`
	width: 90%;
	margin: 70px;
	display: flex;
	@media (max-width: 768px) {
		display: flex;
		flex-direction: column;
	}
`;

const NearbyPlaceInfoImg = styled.div<IImageProps>`
	width: 40%;
	background: ${(props) => (props.image ? `url(${props.image})` : `url('')`)}
		center / cover no-repeat;
	@media (max-width: 768px) {
		width: 100%;
		height: 250px;
		margin-bottom: 20px;
	}
`;

const NearbyPlaceInfoText = styled.div`
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

const NearbyPlaceTitle = styled.div`
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

const NearbyPlaceRecItemContainer = styled.div`
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

const NearbyPlaceRecItem = styled.div`
	width: 280px;
	height: 350px;
	border-radius: 20px 20px 0 0;
	margin: 20px;
`;

const NearbyPlaceItemImg = styled.div<IImageProps>`
	height: 270px;
	background-image: url(${(props) => (props.image ? props.image : '')});
	background-position: center;
	background-size: cover;
	border: 1px solid #adadad;
	border-radius: 15px 15px 0 0;
`;

const NearbyPlaceItemText = styled.div`
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

const backgroundImg =
	'https://images.unsplash.com/photo-1597026405082-eda9beae7513?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80';
const thumbnail =
	'https://images.unsplash.com/photo-1625603736199-775425d2890a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80';

function NearbyPlace() {
	const navigate = useNavigate();
	const [weatherData, setWeatherData] = useState<any>({
		temp: '',
		id: 0,
		temp_max: 0,
		temp_min: 0,
	});

	const [myLocation, setMyLocation] = useState({
		latitude: 0,
		longitude: 0,
	});

	const [isOpen, setIsOpen] = useState(false);
	const [tourText, setTourText] = useState('');

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			setMyLocation({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			});
		});
	}, []);

	const apiKey = process.env.REACT_APP_WEATHER_KEY;
	const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${myLocation.latitude}&lon=${myLocation.longitude}&appid=${apiKey}`;

	useEffect(() => {
		setTimeout(() => {
			axios(weatherUrl)
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
	}, [navigate, weatherUrl]);

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
	const [curPage, setCurPage] = useState(1);
	const tourUrl = `https://apis.data.go.kr/B551011/KorService1/locationBasedList1?serviceKey=${tourAPIKey}&numOfRows=6&pageNo=${curPage}&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=Q&mapX=${myLocation.longitude}&mapY=${myLocation.latitude}&radius=10000&contentTypeId=12`;

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

	const handleClick = (e: number) => {
		const infoUrl = `https://apis.data.go.kr/B551011/KorService1/detailCommon1?serviceKey=xxX98WzuruiLkUpHRO1aF2fTMT2LMrHfz62vItLgl901peg7v8IerpFAaTlujQijG7UMxbtM0oudo6wO3gN5%2BA%3D%3D&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${e}&overviewYN=Y`;
		axios(infoUrl)
			.then((response) => {
				const { data } = response;
				const intro = data.response.body.items.item[0].overview;
				setIsOpen(true);
				const textReplace = /<br\s*\/?>/gi;
				setTourText(intro.replace(textReplace, ''));
			})
			.catch(() => {
				navigate('/error');
			});
	};

	return (
		<NearbyPlaceContainer>
			{isOpen ? (
				<Modal text={tourText} isOpen={isOpen} setIsOpen={setIsOpen} />
			) : null}
			<NearbyPlaceDetailImage image={backgroundImg}>
				<span>🧭 우리 동네 여행 명소</span>
			</NearbyPlaceDetailImage>
			<NearbyPlaceInfo>
				<NearbyPlaceInfoImg image={thumbnail} />
				<NearbyPlaceInfoText>
					<Weather>
						<WeatherTitle>
							오늘의 날씨 <span>{selectIcon()}</span>
						</WeatherTitle>
						<WeatherDetail>
							<span>{(weatherData.temp - 273.15).toFixed(1)}°C</span>
							최고: {(weatherData.temp_max - 273.15).toFixed(1)}°C / 최저:{' '}
							{(weatherData.temp_min - 273.15).toFixed(1)}°C
						</WeatherDetail>
					</Weather>
					현재 접속중인 위치를 중심으로 반경 10km 이내의 여행지를 추천해드리고
					있습니다.
					<br />
					가까워서 미처 알지 못했던 여행지를 추천 받아, 오늘 바로 떠나보시는건
					어떨까요?
					<div className="notice">
						여행지를 클릭하면 여행지에 대한 자세한 설명을 볼 수 있습니다.
					</div>
				</NearbyPlaceInfoText>
			</NearbyPlaceInfo>
			<NearbyPlaceTitle>
				<span>📍우리 지역 명소</span>
				<span className="source">(자료출처 : 한국관광공사)</span>
			</NearbyPlaceTitle>
			<NearbyPlaceRecItemContainer>
				{tripInfo
					? tripInfo.map((item: TripInfoType) => {
							return (
								<NearbyPlaceRecItem
									onClick={() => handleClick(item.contentid)}
									key={item.contentid}
								>
									<NearbyPlaceItemImg image={item.firstimage} />
									<NearbyPlaceItemText>
										<span>{item.title}</span>
										<div>{item.addr1}</div>
									</NearbyPlaceItemText>
								</NearbyPlaceRecItem>
							);
					  })
					: null}
			</NearbyPlaceRecItemContainer>
			<Pagination
				curPage={curPage}
				setCurPage={setCurPage}
				totalPage={9}
				pageCount={3}
			/>
		</NearbyPlaceContainer>
	);
}

export default NearbyPlace;
