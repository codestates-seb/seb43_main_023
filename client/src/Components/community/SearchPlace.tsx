import { useEffect, useState } from 'react';

import axios from 'axios';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';

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
	margin-top: -16px;
`;

interface Prop {
	// handlePlace: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handlePlace: (data: any, selected: string) => void;
	// eslint-disable-next-line react/require-default-props
	from?: string;
	// eslint-disable-next-line react/require-default-props
	id?: string | undefined;
}

interface getDataProp {
	id: number;
}

function SearchPlace({ handlePlace, from, id }: Prop) {
	const [query, setQuery] = useState('');
	const [searchResult, setSearchResult] = useState([]);
	const [selected, setSelected] = useState<string>('');
	const [change, setChange] = useState<boolean>(false);
	// const [place, setPlace] = useState

	const postData = useAxios({
		method: 'get',
		url: `/posts/`,
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setChange(true);
		setQuery(e.target.value);
	};

	const handleSelected = (event: React.MouseEvent<HTMLButtonElement>) => {
		const selectedOption = event.currentTarget.innerText;
		handlePlace(searchResult, selectedOption);
		setSelected(selectedOption);
		setSearchResult([]);
		setChange(false);
	};

	const key = process.env.REACT_APP_KAKAO_MAP_KEY;

	useEffect(() => {
		if (postData.response && from === 'update') {
			const allData: getDataProp[] = postData.response;
			const data = allData.filter((el) => el.id === Number(id));
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
	}, [handlePlace, query, key, postData.response, from, id]);

	return (
		<div>
			<TitleInput
				type="text"
				value={selected || query}
				placeholder="여행하신 장소 또는 지역명을 적어주세요"
				defaultValue={selected}
				onChange={handleInputChange}
			/>

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

			{/* <ul>
				{searchResult.map((result: any) => (
					<li key={result.id}>
						<p>{result.address_name}</p>
						<p>
							{result.y} / {result.x}
						</p>
					</li>
				))}
			</ul> */}
		</div>
	);
}

export default SearchPlace;
