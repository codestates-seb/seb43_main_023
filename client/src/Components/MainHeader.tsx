import styled from 'styled-components';
import '../Global.css';

const img1 =
	'https://images.unsplash.com/photo-1598943392629-19ddae99855c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80';

const MainHeaderContainer = styled.div`
	width: 100%;
	height: 600px;
	background-color: rgba(255, 255, 255, 0.5);
	padding: 100px;
	background-image: linear-gradient(
			rgba(255, 255, 255, 0.5),
			rgba(255, 255, 255, 0.5)
		),
		url(${img1});
	background-size: cover;
`;

const MainText = styled.div`
	font-size: 50px;
	font-weight: 900;
	background-color: transparent;
	> span {
		color: #0db4f3;
	}
	> div {
		width: 300px;
		height: 250px;
		font-size: 40px;
		opacity: 75%;
	}
`;

function MainHeader() {
	return (
		<MainHeaderContainer>
			<MainText>
				현재 <span>40,493</span>명이 여행지를 추천받고 있습니다
				<div>로그인하면 MBTI에 맞는 여행지를 찾을 수 있습니다.</div>
			</MainText>
		</MainHeaderContainer>
	);
}

export default MainHeader;
