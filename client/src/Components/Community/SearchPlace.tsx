import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Api } from '../../Util/customAPI';

const TitleInput = styled.input`
	margin-bottom: 15px;
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
	handlePlace: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function SearchPlace({ handlePlace }: Prop) {
	const [query, setQuery] = useState('');
	const [searchResult, setSearchResult] = useState([]);
	const [selected, setSelected] = useState<string>('');
	const [change, setChange] = useState<boolean>(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setChange(true);
		setQuery(e.target.value);
	};

	const handleSelected = (event: React.MouseEvent<HTMLButtonElement>) => {
		const selectedOption = event.currentTarget.innerText;
		setSelected(selectedOption);
		setSearchResult([]);
		setChange(false);
	};

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (query) {
				const API_URL = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}`;
				const headers = {
					Authorization: 'KakaoAK 3fec145e783ad1c5b4a50d9ce262b0d6',
				};
				axios.get(API_URL, { headers }).then((response) => {
					setSearchResult(response.data.documents);
					handlePlace(response.data.documents);
				});
			} else {
				setSearchResult([]);
			}
		}, 10);

		return () => clearTimeout(delayDebounceFn);
	}, [handlePlace, query]);

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
