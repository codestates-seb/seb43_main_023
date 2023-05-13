import '../Global.css';

import { HTMLAttributes, useEffect, useState } from 'react';

import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { Iuser } from '../Reducers/userInfoReducer';
import { RootState } from '../Store/store';
import useAxios from '../Util/customAxios';

interface UserHeaderImgProps extends HTMLAttributes<HTMLDivElement> {
	image?: string;
}

const UserHeaderContainer = styled.div<UserHeaderImgProps>`
	width: 100%;
	height: 640px;
	padding: 100px;
	margin-top: 71px;
	display: flex;
	align-items: center;
	&::before {
		background: ${(props) => (props.image ? `url(${props.image})` : `url('')`)}
			center / cover no-repeat;
		content: '';
		position: absolute;
		left: 0;
		width: 100%;
		height: 65%;
		opacity: 0.8;
		z-index: -1;
	}
`;

const HeaderText = styled.div`
	font-size: 50px;
	font-weight: 900;
	.nickName {
		color: #0db4f3;
	}
	> span {
		background-color: rgba(255, 255, 255, 0.7);
	}
	> div {
		font-size: 38px;
		font-weight: 700;
		margin-top: 20px;
		background-color: rgba(255, 255, 255, 0.7);
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
	const userInfos = useSelector((state: RootState) => state.user) as Iuser;
	const memberId = userInfos.id;

	const { response } = useAxios({
		method: 'get',
		url: `/members/${memberId}`,
	});

	useEffect(() => {
		if (response !== null) {
			setUserInfo(response);
		}
	}, [response]);

	const res: any = useAxios({
		method: 'get',
		url: '/mbtiInfo',
	}).response;

	useEffect(() => {
		if (res !== null) {
			const newData = res.filter(
				(item: IuserMbti) => item.mbti === userInfo.mbti,
			);
			setFilterMbti(newData[0]);
		}
	}, [res, userInfo.mbti]);

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		axios(`http://localhost:4000/members/${memberId}`)
	// 			.then((response) => {
	// 				const { data } = response;
	// 				setUserInfo(data);
	// 			})
	// 			.catch(() => {
	// 				navigate('/error');
	// 			});
	// 	}, 500);
	// }, [memberId, navigate]);

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		axios('http://localhost:4000/mbtiInfo')
	// 			.then((response) => {
	// 				const { data } = response;
	// 				const newData = data.filter(
	// 					(item: IuserMbti) => item.mbti === userInfo.mbti,
	// 				);
	// 				setFilterMbti(newData[0]);
	// 			})
	// 			.catch(() => {
	// 				navigate('/error');
	// 			});
	// 	}, 500);
	// }, [navigate, userInfo.mbti]);

	return (
		<UserHeaderContainer image={filterMbti ? filterMbti.placeImg : ''}>
			<HeaderText>
				<span>
					<span className="nickName">{userInfo.nickname}</span>님 어서오세요!
				</span>
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
