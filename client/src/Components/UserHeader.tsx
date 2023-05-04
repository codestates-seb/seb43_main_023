import { useState } from 'react';
import styled from 'styled-components';
import '../Global.css';

const img1 =
	'https://images.unsplash.com/photo-1598943392629-19ddae99855c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80';

const UserHeaderContainer = styled.div`
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
	margin-top: 71px;
`;

const HeaderText = styled.div`
	font-size: 50px;
	font-weight: 900;
	background-color: transparent;
	> span {
		color: #0db4f3;
	}
	> div {
		font-size: 40px;
		margin-top: 20px;
	}
`;

type MbtiText = {
	[key: string]: string; // key는 string, value는 string인 객체
};

const mbtiText: MbtiText = {
	infp: '높은 인내심으로 고난이도 여행지도 소화하기 충분한 INFP에게 어울리는 지리산은 어떠신가요?',
	istj: '계획적으로 움직이며 꼼곰하게 여행지에 대해 공부해가는 ISTJ에게 어울리는 경주는 어떠신가요?',
	isfj: '계획적으로 움직이며 동행을 챙기는 스타일의 ISFJ에게 어울리는 전주는 어떠신가요?',
	istp: '현실적이지만 대담하고, 예상하지 못했던 상황도 무난히 해결한 ISTP에게 어울리는 울릉도는 어떠신가요?',
	isfp: '새로운 것을 시도할 준비가 된 예술가 타입의 ISFP에게 어울리는 단양은 어떠신가요?',
	infj: '새로운 사람과 스스럼없이 어울리지만, 사실 혼자만의 시간을 중요하게 여기는 INFJ에게 어울리는 완주는 어떠신가요?',
	intj: '철두철미하게 미리 계획을 세우며 깊고 넓은 지식을 쌓는 데 즐거움을 느끼는 INTJ에게 어울리는 고성은 어떠신가요?',
	intp: '무언가 생각할 수 있게 하는 여행지에서 철학과 사색을 즐기는 INTP에게 어울리는 담양은 어떠신가요?',
	estp: '먹고 놀고 휴식하기 등 동시에 다양한 니즈를 만족시킬 수 있는 여행지를 선호하는 ESTP에게 어울리는 제주도는 어떠신가요?',
	esfp: '즉흥적인 즐거움을 추구하며 스포트라이트를 즐기는 ESFP에게 어울리는 강릉은 어떠신가요?',
	estj: '호불호가 확실하고 깔끔하게 짜여지는 여행 스타일을 선호하는 ESTJ에게 어울리는 서울은 어떠신가요?',
	esfj: '체력을 소모하는 여행보다는 여행 코스를 짜기 명확하고 쉬운 여행지를 선호하는 ESFJ에게 어울리는 여수는 어떠신가요?',
	enfp: '사람들과 어울리기를 좋아하는 인싸! 에너자이저 스타일의 ENFP에게 어울리는 양양은 어떠신가요?',
	entp: '느긋하고 관대하며, 위기 상황에서 판단을 잘하고 선입견이 없는 ENTP에게 어울리는 부산은 어떠신가요?',
	enfj: '사람을 좋아해 소통하는 여행을 추구하는 ENFJ에게 어울리는 속초는 어떠신가요?',
	entj: '동행 중 리더 격으로 여행을 이끌며 효율적인 여행을 이끌어내는 ENTJ에게 어울리는 서산은 어떠신가요?',
};

function UserHeader() {
	const [userMbti, setUserMbti] = useState('enfj');

	return (
		<UserHeaderContainer>
			<HeaderText>
				<span>너구리</span>님!
				<div>{mbtiText[userMbti]}</div>
			</HeaderText>
		</UserHeaderContainer>
	);
}

export default UserHeader;
