import { useEffect, useState } from 'react';

import axios from 'axios';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { FiAlertCircle } from 'react-icons/fi';
import useGet from '../../hooks/useGet';

const TitleContainer = styled.div`
	margin-top: 15px;
	width: 100%;
	padding: 10px;
	font-size: 13px;
	border: 1px solid rgb(214, 217, 219);
	background-color: #fafafa;
	height: 42px;
	color: gray;
	padding-top: 12px;
`;

const TitleInput = styled.input`
	margin-top: 15px;
	width: 100%;
	padding: 10px;
	font-size: 13px;
	border: 1px solid rgb(214, 217, 219);
	background-color: #fafafa;
	height: 42px;

	&:focus {
		outline: none !important;
		border-color: rgb(214, 217, 219);
	}
`;

const Ul = styled.ul``;

const Li = styled.li`
	width: inherit;
	background-color: #fafafa;
	padding: 15px;
	border-top: 1px solid rgb(214, 217, 219);

	> button {
		width: 100%;
		display: flex;
		flex-direction: column;

		&:hover {
			color: #0db4f3;
		}
	}

	> p {
		color: gray;
		margin-top: 10px;
		font-size: 12px;
	}
`;

const Container = styled.div`
	position: absolute;
	z-index: 100;
	width: 950px;
	max-height: 300px;
	overflow: scroll;
	border: 1px solid rgb(214, 217, 219);
	border-top: none;
	margin-top: -1px;

	@media (max-width: 1024px) {
		width: 922px;
	}

	@media (max-width: 768px) {
		width: 691px;
	}
`;

const Alert = styled.div`
	margin-left: 5px;
	color: #f37676;
	font-size: 12px;
	margin-top: 5px;
	display: flex;

	> p {
		font-size: 15px;
		margin-right: 5px;
	}
`;

interface Prop {
	// handlePlace: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handlePlace: (data: any, selected: string) => void;
	// eslint-disable-next-line react/require-default-props
	id?: string | undefined;
}

interface getDataProp {
	id: number;
	placeName: string;
}

function SearchPlace({ handlePlace, id }: Prop) {
	const [query, setQuery] = useState('');
	const [searchResult, setSearchResult] = useState([]);
	const [change, setChange] = useState<boolean>(false);
	const [placeName, setPlaceName] = useState<string>('');
	const [alert, setAlert] = useState<boolean>(false);

	const postData = useGet('');
	const locationNow = useLocation();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setChange(true);
		setQuery(e.target.value);
	};

	const handleInputUpdate = () => {
		setAlert(true);
	};

	const handleSelected = (event: React.MouseEvent<HTMLButtonElement>) => {
		const selectedOption = event.currentTarget.innerText;
		handlePlace(searchResult, selectedOption);
		// setSelected(selectedOption);
		setQuery(selectedOption);
		setSearchResult([]);
		setChange(false);
	};

	const key = process.env.REACT_APP_KAKAO_MAP_KEY;

	useEffect(() => {
		if (postData && locationNow.pathname === `/tripreview/${id}/update`) {
			const allData: getDataProp[] = postData;
			const data = allData.filter((el) => el.id === Number(id));

			console.log(data);

			setPlaceName(data[0].placeName);
		}
		const delayDebounceFn = setTimeout(() => {
			if (query) {
				const API_URL = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}`;
				const headers = {
					Authorization: `KakaoAK ${key}`,
				};
				axios.get(API_URL, { headers }).then((response) => {
					setSearchResult(response.data.documents);
				});
			} else {
				setSearchResult([]);
			}
		}, 10);

		return () => clearTimeout(delayDebounceFn);
	}, [query, key, postData, locationNow.pathname, id]);

	console.log(locationNow.pathname, id);

	return (
		<div>
			{locationNow.pathname === `/tripreview/${id}/update` ? (
				<div>
					<TitleContainer onClick={handleInputUpdate}>
						{placeName}
					</TitleContainer>

					{alert ? (
						<Alert>
							<p>
								<FiAlertCircle />
							</p>
							장소는 수정 불가능해요
						</Alert>
					) : null}
				</div>
			) : (
				<TitleInput
					type="text"
					value={query}
					placeholder="여행하신 장소 또는 지역명을 적어주세요"
					onChange={handleInputChange}
				/>
			)}

			{query && change ? (
				<Container>
					<Ul>
						{searchResult.map((result: any) => (
							<Li>
								<button onClick={(e) => handleSelected(e)}>
									<p>{result.place_name}</p>
								</button>
								<p>{result.address_name}</p>
							</Li>
						))}
					</Ul>
				</Container>
			) : null}
		</div>
	);
}

export default SearchPlace;
