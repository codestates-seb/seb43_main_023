import axios from 'axios';
import { MouseEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { IKeyword } from '../reducers/searchKeywordReducer';
import { RootState } from '../store/Store';
import { Ipost } from '../type/Ipost';
import TourResult from '../Components/search/TourResult';
import MbtiResult from '../Components/search/MbtiResult';
import PostResult from '../Components/search/PostResult';

const TopBarContainer = styled.div`
	width: 90%;
	box-shadow: 0 4px 4px -4px rgb(214, 217, 219);
`;

const UL = styled.ul`
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	font-weight: 600;
	font-size: 18px;
	box-shadow: 0 4px 4px -4px rgb(214, 217, 219);

	.clicked {
		border-bottom: 3px solid #0db4f3;
	}

	> li {
		padding: 10px 0;
		width: 100px;
		display: flex;
		justify-content: center;
		color: black;

		&:hover {
			border-bottom: 3px solid #0db4f3;
			cursor: pointer;
		}

		a {
			color: inherit;
			text-decoration: none;
		}
	}
`;

const Container = styled.div`
	min-height: 100vh;
`;

const SearchContainer = styled.div`
	width: 100%;
	height: 100%;
	margin-top: 82px;
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

function Search() {
	const keyword = useSelector((state: RootState) => state.search) as IKeyword;
	const [tourResult, setTourResult] = useState([]);
	const [menu, setMenu] = useState<string>('전체');

	const keywordE = keyword.keyword.slice(0, 1) === 'E';
	const keywordI = keyword.keyword.slice(0, 1) === 'I';

	const eventAPIKey = process.env.REACT_APP_TOURAPI_KEY;
	const tourUrl = `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?serviceKey=${eventAPIKey}&numOfRows=20&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=Q&keyword=${keyword.keyword}&contentTypeId=12`;

	const handleMenu = (e: MouseEvent<HTMLButtonElement>) => {
		const target = e.target as HTMLButtonElement;
		setMenu(target.textContent!);
	};

	useEffect(() => {
		axios(tourUrl).then((res) => {
			setTourResult(res.data.response.body.items.item);
		});
	}, [tourUrl]);

	return (
		<Container>
			{keyword.keyword ? (
				<SearchContainer>
					<TopBarContainer>
						<UL>
							<li className={menu === '전체' ? 'clicked' : 'btn'}>
								<button onClick={(e) => handleMenu(e)}>전체</button>
							</li>
							<li className={menu === '여행지 추천' ? 'clicked' : 'btn'}>
								<button onClick={(e) => handleMenu(e)}>여행지 추천</button>
							</li>

							<li className={menu === '게시글' ? 'clicked' : 'btn'}>
								<button onClick={(e) => handleMenu(e)}>게시글</button>
							</li>
						</UL>
					</TopBarContainer>

					{/* tour api 결과 - mbti 태그 검색이면 나타나지 않음 */}
					{tourResult && tourResult.length > 0 && menu !== '게시글' && (
						<TourResult />
					)}

					{/* mbti 태그 검색의 경우 */}
					{(keywordE || keywordI) && menu !== '게시글' && <MbtiResult />}

					{/* 게시글 결과 */}
					{menu !== '여행지 추천' && <PostResult />}
				</SearchContainer>
			) : null}
		</Container>
	);
}

export default Search;
