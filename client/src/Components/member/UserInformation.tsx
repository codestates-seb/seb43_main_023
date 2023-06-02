import '../../Global.css';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { RootState } from '../../store/Store';
import { Iuser } from '../../type/Iuser';

const Main = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	div {
		margin-bottom: 15px;
		font-weight: bold;
		color: rgba(0, 0, 0, 0.8);
		font-size: 20px;
	}
	.myInfo {
		font-size: 15px;
		font-weight: 400;
		margin-bottom: 40px;
		color: rgba(0, 0, 0, 0.6);
	}
	.memberEdit {
		font-size: 15px;
		color: rgba(0, 0, 0, 0.4);
		font-weight: bold;
		&:hover {
			cursor: pointer;
			color: #0db4f3;
		}
	}
	.badgeAppend {
		margin-top: -20px;
	}
	.badgeHover {
		&:hover {
			cursor: pointer;
		}
	}
	.badgeBox {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 250px;
		border: 1px solid rgba(0, 0, 0, 0.2);
		box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.02);
		color: #2d2d2d;
		padding: 0 10px;
		padding-top: 20px;
		.badgeEl {
			font-size: 12px;
			color: rgba(0, 0, 0, 0.7);
		}
	}
	.test {
		width: 100%;
		text-align: center;
		text-decoration: none;
		padding: 0 50px;
		margin-top: 30px;
	}
`;

export default function UserInformation() {
	const userInfos = useSelector((state: RootState) => state.user) as Iuser;

	// 마이페이지 뱃지 호버 시 뱃지 기준 설명 박스가 나오는 핸들러
	const badgeMouseEnter = () => {
		const el = document.querySelector('.badgeAppend');
		const badgeBox = document.createElement('div');
		const badgeBox1 = document.createElement('div');
		const badgeBox2 = document.createElement('div');
		const badgeBox3 = document.createElement('div');
		badgeBox1.textContent = '초보여행자 : 커뮤니티 글 5개, 댓글 5개 이상 작성';
		badgeBox2.textContent =
			'중급여행자 : 커뮤니티 글 30개, 추천수 10개 이상, 댓글 30개이상 작성, 사이트 자체 기준 충족';
		badgeBox3.textContent =
			'고급여행자 : 커뮤니티 글 50개, 추천수 30개 이상, 댓글 100개이상 작성, 사이트 자체 기준 충족';
		badgeBox.classList.add('badgeBox');
		badgeBox1.classList.add('badgeEl');
		badgeBox2.classList.add('badgeEl');
		badgeBox3.classList.add('badgeEl');
		el?.appendChild(badgeBox);
		badgeBox.appendChild(badgeBox1);
		badgeBox.appendChild(badgeBox2);
		badgeBox.appendChild(badgeBox3);
	};

	// 마이페이지 뱃지 호버했다가 떼면 뱃지 기준 설명 박스가 사라지는 핸들러
	const badgeMouseLeave = () => {
		const badgeBox = document.querySelector('.badgeBox');
		const el = document.querySelector('.badgeAppend');
		el?.removeChild(badgeBox as Element);
	};

	return (
		<Main>
			<div>DisplayName</div>
			<div className="myInfo myDisplayName">{userInfos.nickname}</div>
			<div>MBTI</div>
			<div className="myInfo myMbti">{userInfos.mbti}</div>
			<div
				className="badgeHover"
				onMouseEnter={badgeMouseEnter}
				onMouseLeave={badgeMouseLeave}
			>
				Badge
			</div>
			<div className="myInfo">{userInfos.badge}</div>
			<div className="badgeAppend" />
			<Link to="/useredit">
				<button className="memberEdit">내정보 수정하기</button>
			</Link>
			<button
				className="memberEdit test"
				onClick={() =>
					window.open(
						'https://www.16personalities.com/ko/%EB%AC%B4%EB%A3%8C-%EC%84%B1%EA%B2%A9-%EC%9C%A0%ED%98%95-%EA%B2%80%EC%82%AC',
						'_blank',
					)
				}
			>
				MBTI 검사하러가기
			</button>
		</Main>
	);
}
