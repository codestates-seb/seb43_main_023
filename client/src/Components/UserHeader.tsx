import '../Global.css';

import { HTMLAttributes, useEffect, useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface UserHeaderImgProps extends HTMLAttributes<HTMLDivElement> {
	image?: string;
}

const UserHeaderContainer = styled.div<UserHeaderImgProps>`
	width: 100%;
	height: 600px;
	padding: 100px;
	margin-top: 71px;
	display: flex;
	align-items: center;
	&::before {
		background: ${(props) => (props.image ? `url(${props.image})` : `url('')`)}
			center / cover no-repeat;
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

const HeaderText = styled.div`
	font-size: 50px;
	font-weight: 900;
	> span {
		color: #0db4f3;
	}
	> div {
		font-size: 38px;
		font-weight: 700;
		margin-top: 20px;
	}
`;

interface IuserInfo {
	id: number;
	email: string;
	password: string;
	nickname: string;
	mbti: string;
	image: string;
	rold: string;
	memberStatus: string;
	badge: null;
	createdAt: string;
	modifiedAt: string;
}

interface IuserMbti {
	description: string;
	img: string;
	mbti: string;
	place: string;
	placeImg: string;
}

function UserHeader() {
	const [userInfo, setUserInfo] = useState<IuserInfo>({
		id: 0,
		email: '',
		password: '',
		nickname: '',
		mbti: '',
		image: '',
		rold: '',
		memberStatus: '',
		badge: null,
		createdAt: '',
		modifiedAt: '',
	});
	const [filterMbti, setFilterMbti] = useState<IuserMbti>({
		description: '',
		img: '',
		mbti: '',
		place: '',
		placeImg: '',
	});

	const memberId = localStorage.getItem('memberId');
	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			axios(`http://localhost:4000/members/${memberId}`)
				.then((response) => {
					const { data } = response;
					setUserInfo(data);
				})
				.catch(() => {
					navigate('/error');
				});
		}, 500);
	}, [memberId, navigate]);

	useEffect(() => {
		setTimeout(() => {
			axios('http://localhost:4000/mbtiInfo')
				.then((response) => {
					const { data } = response;
					const newData = data.filter(
						(item: any) => item.mbti === userInfo.mbti,
					);
					setFilterMbti(newData[0]);
				})
				.catch(() => {
					navigate('/error');
				});
		}, 500);
	}, [navigate, userInfo.mbti]);

	return (
		<UserHeaderContainer image={filterMbti ? filterMbti.placeImg : ''}>
			<HeaderText>
				<span>{userInfo.nickname}</span>님 어서오세요!
				<div>
					{filterMbti
						? filterMbti.description.split('\\n').map((item, key) => (
								<>
									{key > 0 && <br />}
									{item}
								</>
						  ))
						: ''}
				</div>
			</HeaderText>
		</UserHeaderContainer>
	);
}

export default UserHeader;
