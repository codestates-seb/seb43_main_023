import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useAxios from '../../hooks/useAxios';

const img1 =
	'https://images.unsplash.com/photo-1598943392629-19ddae99855c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80';

const MainHeaderContainer = styled.div`
	width: 100%;
	height: 40vh;
	padding-left: 100px;
	margin-top: 82px;
	display: flex;
	align-items: center;
	&::before {
		background: url(${img1}) center / cover no-repeat;
		content: '';
		position: absolute;
		left: 0;
		width: 100%;
		height: 40vh;
		opacity: 0.5;
		z-index: -1;
		@media (max-width: 768px) {
			height: 35vh;
		}
		@media (max-width: 583px) {
			height: 300px;
		}
		@media (min-width: 1920px) {
			margin-left: auto;
			margin-right: auto;
			left: calc((100vw - 1920px) / 2);
			max-width: 1920px;
		}
	}
	@media (max-width: 1024px) {
		padding: 40px;
	}
	@media (max-width: 768px) {
		padding: 20px;
		height: 35vh;
	}
	@media (max-width: 583px) {
		height: 300px;
	}
	@media (min-width: 1920px) {
		margin-left: auto;
		margin-right: auto;
		max-width: 1920px;
	}
`;

const MainText = styled.div`
	font-size: 46px;
	font-weight: 900;
	background-color: transparent;
	@media (max-width: 1024px) {
		font-size: 1.8rem;
	}
	@media (max-width: 768px) {
		font-size: 1.6rem;
	}
	@media (max-width: 425px) {
		font-size: 1.3rem;
	}
	> span {
		color: #0db4f3;
		background-color: rgba(255, 255, 255, 0.5);
	}
	> div {
		width: 320px;
		font-size: 40px;
		margin-top: 20px;
		@media (max-width: 1024px) {
			font-size: 1.8rem;
		}
		@media (max-width: 768px) {
			font-size: 1.6rem;
		}
		@media (max-width: 425px) {
			font-size: 1.3rem;
		}
	}
`;

function MainHeader() {
	const [userCount, setUserCount] = useState<number>();

	const { response } = useAxios({
		method: 'get',
		url: '/members/findAllMembers',
	});

	useEffect(() => {
		if (response) {
			setUserCount(response);
		}
	}, [response]);

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
