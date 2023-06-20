import '../../Global.css';

import { useState } from 'react';

import styled from 'styled-components';

import IntroBox from '../../Components/member/IntroBox';
import MyReview from '../../Components/member/MyReview';
import UserInformation from '../../Components/member/UserInformation';
import UserWriting from '../../Components/member/UserWriting';

const Main = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Content = styled.div`
	width: 100%;
	padding: 20px 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const Menu = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	.userInfo,
	.userWrite,
	.userReview {
		font-weight: bold;
		margin: 30px;
		padding-bottom: 5px;
		@media (max-width: 350px) {
			font-size: 13px;
		}
		@media (max-width: 350px) {
			margin: 20px;
		}
	}
	.blue {
		color: #0db4f3;
		border-bottom: 3px solid #0db4f3;
	}
`;

const MenuContent = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	margin-top: 20px;
`;

function Mypage() {
	// 마이페이지 각 항목 선택 시 항목 색 변경, 페이지 다르게 렌더링하는 핸들러
	const [select, setSelect] = useState('btn1');
	const userInfoClick = () => {
		const btn1 = document.querySelector('.userInfo');
		const btn2 = document.querySelector('.userWrite');
		const btn3 = document.querySelector('.userReview');
		btn1?.classList.add('blue');
		btn2?.classList.remove('blue');
		btn3?.classList.remove('blue');
		setSelect('btn1');
	};
	const userWriteClick = () => {
		const btn1 = document.querySelector('.userInfo');
		const btn2 = document.querySelector('.userWrite');
		const btn3 = document.querySelector('.userReview');
		btn1?.classList.remove('blue');
		btn2?.classList.add('blue');
		btn3?.classList.remove('blue');
		setSelect('btn2');
	};
	const userReviewClick = () => {
		const btn1 = document.querySelector('.userInfo');
		const btn2 = document.querySelector('.userWrite');
		const btn3 = document.querySelector('.userReview');
		btn1?.classList.remove('blue');
		btn2?.classList.remove('blue');
		btn3?.classList.add('blue');
		setSelect('btn3');
	};
	return (
		<Main className="main">
			<IntroBox />
			<Content>
				<Menu>
					<button className="userInfo blue" onClick={userInfoClick}>
						내정보
					</button>
					<button className="userWrite" onClick={userWriteClick}>
						내가 쓴 글
					</button>
					<button className="userReview" onClick={userReviewClick}>
						여행 리뷰
					</button>
				</Menu>
				<MenuContent>
					{select === 'btn1' && <UserInformation />}
					{select === 'btn2' && <UserWriting />}
					{select === 'btn3' && <MyReview />}
				</MenuContent>
			</Content>
		</Main>
	);
}

export default Mypage;
