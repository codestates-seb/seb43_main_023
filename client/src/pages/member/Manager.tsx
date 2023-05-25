import '../../Global.css';

import { useEffect, useMemo, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Api } from '../../apis/customAPI';
import ManagerBox from '../../Components/member/ManagerBox';
import useAxios from '../../hooks/useAxios';
import { Imembers } from '../../type/Iuser';
import { setLocalStorage } from '../../utils/LocalStorage';
import { SweetAlert1 } from '../../utils/SweetAlert';

const Main = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 50px;
`;

const Content = styled.div`
	width: 100%;
	padding: 20px 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	.menu {
		display: flex;
		justify-content: center;
		align-items: center;
	}
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
	.userInformation {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		div {
			margin-bottom: 15px;
			font-weight: bold;
			color: #555555;
			font-size: 20px;
		}
		.myInfo {
			font-size: 15px;
			font-weight: 400;
			margin-bottom: 40px;
		}
	}
	.test {
		width: 100%;
		text-align: right;
		text-decoration: none;
		padding: 0 50px;
		margin-top: 30px;
	}
`;

const UserWriting = styled.div`
	width: 100%;
	min-height: 28vh;
	li {
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding-bottom: 20px;
		margin-bottom: 20px;
		font-weight: bold;
		color: #2d2d2d;
		font-size: 13px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}
	.writingBody {
		width: 300px;
		color: #2d2d2d;
		&:hover {
			cursor: pointer;
			color: #0db4f3;
		}
		@media (max-width: 470px) {
			width: 150px;
		}
		@media (max-width: 330px) {
			width: 100px;
		}
	}
	button {
		margin: 0 10px;
		font-size: 12px;
		color: rgba(0, 0, 0, 0.2);
		&:hover {
			cursor: pointer;
			color: #0db4f3;
		}
	}
`;

function Manager() {
	const navigate = useNavigate();
	const [members, setMembers] = useState<Imembers>([
		{
			memberId: 0,
			nickname: '',
			badge: null,
		},
	]);

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

	// 전체 멤버 get요청(useAxios 사용)
	const { response } = useAxios({
		method: 'get',
		url: '/members',
	});

	useEffect(() => {
		if (response !== null) {
			setMembers(response);
		}
	}, [response]);

	// 현재 무 뱃지 필터링 -> useMemo hook 사용
	const filteredMembers = useMemo(
		() => members.filter((m) => m.badge === null && m.nickname !== '관리자'),
		[members],
	);

	// 현재 초급여행자 필터링 -> useMemo hook 사용
	const filteredMembers1 = useMemo(
		() => members.filter((m) => m.badge === '초보 여행자'),
		[members],
	);

	// 현재 중급여행자 필터링 -> useMemo hook 사용
	const filteredMembers2 = useMemo(
		() => members.filter((m) => m.badge === '중급 여행자'),
		[members],
	);

	// 뱃지 업데이트 핸들러
	const giveBadgeClick = async (id: number) => {
		const sweetAlert1 = await SweetAlert1(
			'뱃지',
			'뱃지를 부여하시겠습니까?',
			'확인',
			'취소',
		);
		if (sweetAlert1.isConfirmed) {
			try {
				await Api.patch(`/members/grantBadge/${id}`);
				// window.location.reload();
			} catch (error) {
				navigate('/error');
			}
		}
	};

	const gotoPost = (id: number) => {
		setLocalStorage('memberId', id);
		navigate(`/memberpost/${id}`);
	};

	return (
		<Main>
			<ManagerBox />
			<Content>
				<div className="menu">
					<button className="userInfo blue" onClick={userInfoClick}>
						초보여행자 후보
					</button>
					<button className="userWrite" onClick={userWriteClick}>
						중급여행자 후보
					</button>
					<button className="userReview" onClick={userReviewClick}>
						고급여행자 후보
					</button>
				</div>
				<MenuContent>
					{select === 'btn1' && (
						<UserWriting>
							<ul>
								{filteredMembers.map((member) => {
									return (
										<li key={member.memberId}>
											<div className="writingHead">{member.badge}</div>

											<button
												className="writingBody"
												onClick={() => gotoPost(member.memberId!)}
											>
												{member.nickname}
											</button>

											<div>
												<button
													onClick={() => giveBadgeClick(member.memberId!)}
												>
													Give Badge
												</button>
											</div>
										</li>
									);
								})}
							</ul>
						</UserWriting>
					)}
					{select === 'btn2' && (
						<UserWriting>
							<ul>
								{filteredMembers1.map((member) => {
									return (
										<li key={member.memberId}>
											<div className="writingHead">{member.badge}</div>
											<Link
												to={{ pathname: `/memberpost/${member.memberId}` }}
												style={{ textDecoration: 'none' }}
											>
												<div className="writingBody">{member.nickname}</div>
											</Link>
											<div>
												<button
													onClick={() => giveBadgeClick(member.memberId!)}
												>
													Give Badge
												</button>
											</div>
										</li>
									);
								})}
							</ul>
						</UserWriting>
					)}
					{select === 'btn3' && (
						<UserWriting>
							<ul>
								{filteredMembers2.map((member) => {
									return (
										<li key={member.memberId}>
											<div className="writingHead">{member.badge}</div>
											<Link
												to={{ pathname: `/memberpost/${member.memberId}` }}
												style={{ textDecoration: 'none' }}
											>
												<div className="writingBody">{member.nickname}</div>
											</Link>
											<div>
												<button
													onClick={() => giveBadgeClick(member.memberId!)}
												>
													Give Badge
												</button>
											</div>
										</li>
									);
								})}
							</ul>
						</UserWriting>
					)}
				</MenuContent>
			</Content>
		</Main>
	);
}

export default Manager;
