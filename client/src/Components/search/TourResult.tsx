import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { RootState } from '../../store/Store';
import { IKeyword } from '../../reducers/searchKeywordReducer';
import notImageResult from '../../assets/notImageResult.png';
import { ISearchMenu } from '../../reducers/searchMenuReducer';

const SearchAPI = styled.div`
	margin-top: 30px;
	width: 90%;
	border-radius: 15px;
	padding: 20px;
	display: flex;
	flex-direction: column;
	font-size: 24px;
	font-weight: 700;
	margin-bottom: 20px;

	.keyword {
		color: #0db4f3;
	}

	> div {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		.all {
			font-size: 14px;
			margin-right: 20px;
			color: #a8a8a8;
		}
	}
`;

const APIContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	margin-bottom: 10px;
`;

const APIContainerSlice = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
`;
const AdItem = styled.div`
	width: 20%;
	height: 300px;
	border: 1px solid #d9d9d9;
	border-radius: 15px;
	/* padding: 10px; */
	margin: 10px;
	cursor: pointer;

	.notresult {
		font-size: 14px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: gray;
		padding-bottom: 7px;
		border-bottom: 1px solid #d9d9d9;
	}

	.notimg {
		width: 100%;
		height: 60%;
	}

	.adimg {
		width: 100%;
		height: 70%;
		border-top-right-radius: 15px;
		border-top-left-radius: 15px;
		border-bottom: 1px solid #d9d9d9;
	}
	.adtext {
		width: 100%;
		height: 30%;
		font-weight: 300;
		font-size: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 5px;
	}
`;

interface tourAPIType {
	firstimage: string;
	title: string;
}
function TourResult() {
	const keyword = useSelector((state: RootState) => state.search) as IKeyword;
	const menu = useSelector((state: RootState) => state.menu) as ISearchMenu;

	const eventAPIKey = process.env.REACT_APP_TOURAPI_KEY;
	const tourUrl = `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?serviceKey=${eventAPIKey}&numOfRows=20&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=Q&keyword=${keyword.keyword}&contentTypeId=12`;

	const [tourResult, setTourResult] = useState([]);

	const handleResultClicked = (value: string) => {
		window.open(
			`https://www.google.com/search?q=${value}`,
			'_blank',
			'noopener, noreferrer',
		);
	};

	useEffect(() => {
		axios(tourUrl).then((res) => {
			setTourResult(res.data.response.body.items.item);
		});
	}, [tourUrl]);
	return (
		<SearchAPI>
			<div className="title">
				<div>
					<span className="keyword">{keyword.keyword}</span> 추천 여행지 🏝
				</div>
				<span className="all">
					{menu.menu === '여행지 추천' ? null : <button>전체보기</button>}
				</span>
			</div>
			{menu.menu === '전체' ? (
				<APIContainerSlice>
					{tourResult &&
						tourResult.slice(0, 4).map((el: tourAPIType) => (
							<AdItem onClick={() => handleResultClicked(el.title)}>
								{el.firstimage ? (
									<img src={el.firstimage} alt="사진" className="adimg" />
								) : (
									<>
										<img src={notImageResult} alt="사진" className="notimg" />
										<div className="notresult">x 준비된 사진이 없어요</div>
									</>
								)}

								<div className="adtext">{el.title}</div>
							</AdItem>
						))}
				</APIContainerSlice>
			) : (
				<APIContainer>
					{tourResult.map((el: tourAPIType) => (
						<AdItem onClick={() => handleResultClicked(el.title)}>
							{el.firstimage ? (
								<img src={el.firstimage} alt="사진" className="adimg" />
							) : (
								<>
									<img src={notImageResult} alt="사진" className="notimg" />
									<div className="notresult">x 준비된 사진이 없어요</div>
								</>
							)}
							<div className="adtext">{el.title}</div>
						</AdItem>
					))}
				</APIContainer>
			)}
		</SearchAPI>
	);
}

export default TourResult;
