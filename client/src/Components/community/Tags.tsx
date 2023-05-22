import '../../Global.css';

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MouseEvent } from 'react';
import { KEYWORD } from '../../reducers/searchKeywordReducer';

const Container = styled.div`
	display: flex;
	flex-direction: column;
`;

const PlaceTag = styled.div`
	font-weight: 600;
	font-size: 15px;

	> h4 {
		border-radius: 30px;
		width: 50px;
		padding: 4px 5px;
		margin-left: 10px;
		margin-bottom: 10px;
		font-size: 13px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #a3e6ff;
	}

	> div {
		margin-top: 5px;
		display: flex;
		flex-wrap: wrap;
		border-bottom: 1px solid rgb(214, 217, 219);
		padding-bottom: 5px;
		margin-bottom: 5px;
	}
`;

const ThemeTag = styled.div`
	font-weight: 600;
	font-size: 15px;
	margin-top: 10px;

	> h4 {
		border-radius: 30px;
		width: 50px;
		padding: 4px 5px;
		margin-left: 10px;
		margin-bottom: 10px;
		font-size: 13px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #a3e6ff;
	}

	> div {
		margin-top: 5px;
		display: flex;
		flex-wrap: wrap;
		border-bottom: 1px solid rgb(214, 217, 219);
		padding-bottom: 5px;
		margin-bottom: 5px;
	}
`;

const MBTITags = styled.div`
	font-weight: 600;
	font-size: 15px;
	margin-top: 10px;

	> h4 {
		border-radius: 30px;
		width: 50px;
		padding: 4px 5px;
		margin-left: 10px;
		margin-bottom: 10px;
		font-size: 13px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #a3e6ff;
	}

	> div {
		margin-top: 5px;
		display: flex;
		flex-wrap: wrap;
	}
`;

const Tag = styled.div`
	width: max-content;
	padding: 5px 5px;
	margin-left: 10px;
	font-size: 13px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 11px;

	&:hover {
		color: #0db4f3;
		cursor: pointer;
	}
`;

const MBTITag = styled.div`
	border-radius: 30px;
	width: 30px;
	padding: 5px 15px;
	margin-left: 10px;

	font-size: 13px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 11px;

	&:hover {
		color: #0db4f3;
		cursor: pointer;
	}
`;

function Tags() {
	const first = ['E', 'I'];
	const second = ['S', 'N'];
	const third = ['F', 'T'];
	const fourth = ['J', 'P'];

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleTagClicked = (
		e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
	) => {
		const target = e.target as HTMLButtonElement;
		if (target.textContent) {
			const result = target.textContent.replace(/#/g, '').substring(0);

			dispatch(KEYWORD({ keyword: result }));
			navigate('/search');
		}
	};

	const allMBTI = first.flatMap((f) =>
		second.flatMap((s) =>
			third.flatMap((t) => fourth.map((fth) => `${f}${s}${t}${fth}`)),
		),
	);

	return (
		<Container>
			<PlaceTag>
				<h4>장소</h4>
				<div>
					<Tag onClick={(e) => handleTagClicked(e)}>#전주</Tag>
					<Tag onClick={(e) => handleTagClicked(e)}>#부산</Tag>
					<Tag onClick={(e) => handleTagClicked(e)}>#제주도</Tag>
					<Tag onClick={(e) => handleTagClicked(e)}>#하동</Tag>
					<Tag onClick={(e) => handleTagClicked(e)}>#양떼목장</Tag>
					<Tag onClick={(e) => handleTagClicked(e)}>#해수욕장</Tag>
				</div>
			</PlaceTag>
			<ThemeTag>
				<h4>테마</h4>
				<div>
					<Tag onClick={(e) => handleTagClicked(e)}>#힐링여행</Tag>
					<Tag onClick={(e) => handleTagClicked(e)}>#나홀로여행</Tag>
					<Tag onClick={(e) => handleTagClicked(e)}>#커플여행</Tag>
					<Tag onClick={(e) => handleTagClicked(e)}>#효도여행</Tag>
					<Tag onClick={(e) => handleTagClicked(e)}>#가족여행</Tag>
					<Tag onClick={(e) => handleTagClicked(e)}>#아이들과 함께</Tag>
					<Tag onClick={(e) => handleTagClicked(e)}>#절친과 함께</Tag>
				</div>
			</ThemeTag>
			<MBTITags>
				<h4>MBTI</h4>
				<div>
					{allMBTI.map((el, index) => (
						<MBTITag
							onClick={(e) => handleTagClicked(e)}
							// eslint-disable-next-line react/no-array-index-key
							key={index}
						>{`#${el}`}</MBTITag>
					))}
				</div>
			</MBTITags>
		</Container>
	);
}

export default Tags;
