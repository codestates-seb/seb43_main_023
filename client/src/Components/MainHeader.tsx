import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../Global.css';

const img1 =
	'https://images.unsplash.com/photo-1598943392629-19ddae99855c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80';

const MainHeaderContainer = styled.div`
	width: 100%;
	height: 640px;
	padding-left: 100px;
	margin-top: 71px;
	display: flex;
	align-items: center;
	scroll-snap-align: start;
	&::before {
		background: url(${img1}) center / cover no-repeat;
		height: 600px;
		content: '';
		position: absolute;
		top: -71px;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0.5;
		z-index: -1;
	}
`;

const MainText = styled.div`
	font-size: 50px;
	font-weight: 900;
	background-color: transparent;
	> span {
		color: #0db4f3;
	}
	> div {
		width: 320px;
		font-size: 40px;
		margin-top: 20px;
	}
`;

function MainHeader() {
	const navigate = useNavigate();
	const [userCount, setUserCount] = useState(0);

	useEffect(() => {
		setTimeout(() => {
			axios(`http://localhost:4000/members/`)
				.then((response) => {
					const { data } = response;
					setUserCount(data.length);
				})
				.catch(() => {
					navigate('/error');
				});
		}, 500);
	}, [navigate]);

	return (
		<MainHeaderContainer>
			<MainText>
				현재 <span>{userCount}</span>명이 여행지를 추천받고 있습니다
				<div>
					로그인하면
					<br />
					MBTI에 맞는
					<br />
					여행지를
					<br />
					찾을 수 있습니다.
				</div>
			</MainText>
		</MainHeaderContainer>
	);
}

export default MainHeader;