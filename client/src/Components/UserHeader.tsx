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
	height: 40vh;
	padding: 100px;
	margin-top: 82px;
	display: flex;
	align-items: center;
	&::before {
		background: ${(props) => (props.image ? `url(${props.image})` : `url('')`)}
			center / cover no-repeat;
		content: '';
		position: absolute;
		left: 0;
		width: 100%;
		height: 640px;
		opacity: 0.8;
		z-index: -1;
		@media (max-width: 583px) {
			height: 300px;
		}
		@media (max-width: 768px) {
			height: 35vh;
		}
	}
	@media (max-width: 583px) {
		height: 300px;
	}
	@media (max-width: 768px) {
		padding: 20px;
		height: 35vh;
	}
	@media (max-width: 1024px) {
		padding: 40px;
	}
`;

const HeaderText = styled.div`
	font-size: 50px;
	font-weight: 700;
	@media (max-width: 582px) {
		padding: 20px;
		height: 30vh;
	}
	@media (max-width: 768px) {
		font-size: 2rem;
	}
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
		@media (max-width: 768px) {
			width: 100%;
			font-size: 2rem;
		}
	}
`;

interface IuserMbti {
	description: string;
	img: string;
	mbti: string;
	place: string;
	placeImg: string;
}

function UserHeader() {
	const [filterMbti, setFilterMbti] = useState<IuserMbti>({
		description: '',
		img: '',
		mbti: '',
		place: '',
		placeImg: '',
	});
	const userInfos = useSelector((state: RootState) => state.user) as Iuser;

	const res: any = useAxios({
		method: 'get',
		url: `/mbtiInfo/${userInfos.mbti}`,
	}).response;

	useEffect(() => {
		if (res !== null) {
			setFilterMbti(res);
		}
	}, [res, userInfos.mbti]);

	return (
		<UserHeaderContainer image={filterMbti ? filterMbti.placeImg : ''}>
			<HeaderText>
				<span>
					<span className="nickName">{userInfos.nickname}</span>님 어서오세요!
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
