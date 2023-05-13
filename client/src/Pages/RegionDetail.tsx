/* eslint-disable radix */
import axios from 'axios';
import { HTMLAttributes, useEffect, useState } from 'react';
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

interface SlideItemProps extends HTMLAttributes<HTMLDivElement> {
	image?: string;
}

const backgroundImg =
	'https://a.cdn-hotels.com/gdcs/production117/d150/1049d859-3926-4a0d-8ae2-d7e227f902c2.jpg?impolicy=fcrop&w=800&h=533&q=medium';

const RegionDetailContainer = styled.div`
	width: 100vw;
	height: 100%;
	margin-top: 71px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const RegionDetailImage = styled.div`
	width: 100%;
	height: 460px;
	background-image: linear-gradient(
			rgba(255, 255, 255, 0.25),
			rgba(255, 255, 255, 0.25)
		),
		url(${backgroundImg});
	background-position: center;
	background-size: cover;
	display: flex;
	align-items: flex-end;
	> span {
		font-size: 50px;
		font-weight: 900;
		color: white;
		margin: 20px;
	}
`;

const RegionInfo = styled.div`
	width: 90%;
	height: 230px;
	margin: 70px;
	display: flex;
`;

const RegionInfoImg = styled.div`
	width: 40%;
	background: url('https://korean.visitseoul.net/comm/getImage?srvcId=MEDIA&parentSn=22376&fileTy=MEDIA&fileNo=2')
		no-repeat center / cover;
`;

const RegionInfoText = styled.div`
	width: 60%;
	padding-left: 20px;
	font-size: 18px;
`;

const RegionTitle = styled.div`
	width: 90%;
	font-size: 20px;
	font-weight: 700;
	text-align: start;
`;

const RegionRecItemContainer = styled.div`
	width: 90%;
	padding: 20px 70px 70px 70px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
`;

const RegionRecItem = styled.div`
	width: 280px;
	height: 350px;
	border-radius: 20px 20px 0 0;
	margin: 20px;
`;

const RegionItemImg = styled.div<SlideItemProps>`
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
	const navigate = useNavigate();
	const [weatherData, setWeatherData] = useState<any>({
		temp: '',
		id: 0,
		temp_max: 0,
		temp_min: 0,
	});

	const cityName = 'Seoul';
	const apiKey = process.env.REACT_APP_WEATHER_KEY;
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

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
	const tourUrl = `http://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=${tourAPIKey}&pageNo=1&numOfRows=6&MobileApp=AppTest&MobileOS=ETC&arrange=Q&contentTypeId=12&areaCode=1&_type=json`;

	const [tripInfo, serTripInfo] = useState([]);

	useEffect(() => {
		axios(tourUrl)
			.then((response) => {
				const { data } = response;
				serTripInfo(data.response.body.items.item);
			})
			.catch(() => {
				navigate('/error');
			});
	}, [navigate, tourUrl]);

	return (
		<RegionDetailContainer>
			<RegionDetailImage>
				<span>서울 추천 여행 명소</span>
			</RegionDetailImage>
			<RegionInfo>
				<RegionInfoImg />
				<RegionInfoText>
					<Weather>
						<WeatherTitle>
							서울특별시 <span>{selectIcon()}</span>
						</WeatherTitle>
						<WeatherDetail>
							<span>{(weatherData.temp - 273.15).toFixed(1)}°C</span>
							최고: {(weatherData.temp_max - 273.15).toFixed(1)}°C / 최저:{' '}
							{(weatherData.temp_min - 273.15).toFixed(1)}°C
						</WeatherDetail>
					</Weather>
					서울은 대한민국의 수도로서 정치, 경제, 사회, 문화의 중심지이다. 서울의
					면적은 605㎢로서 도쿄의 23개 특별구와 비슷하며, 싱가포르와 뉴욕시보다
					다소 작은 크기이다. 서울은 외사산과 내사산에 둘러싸인 분지의 지형이다.
					그리고 수계로서 청계천, 중랑천, 홍제천, 안양천, 탄천 등의 지천이
					한강으로 흘러가고 있다. <br /> 20세기 중반 들어 오늘날의 발전을
					시작하였지만, 20세기 후반 들어 폭발적인 성장을 거듭하여 대도시로
					성장하였다. 이에 따라, 현재 서울은 대중교통, 도로, 상하수도 등
					도시기반시설도 상당한 수준에 와 있으며, 최근에는 세계의 각종
					도시경쟁력 평가에서도 두각을 나타내고 있다.
				</RegionInfoText>
			</RegionInfo>
			<RegionTitle>📍서울의 명소</RegionTitle>
			<RegionRecItemContainer>
				{tripInfo
					? tripInfo.map((item: any) => {
							return (
								<RegionRecItem key={item.contentid}>
									<RegionItemImg image={item.firstimage} />
									<RegionItemText>
										<span>{item.title}</span>
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
