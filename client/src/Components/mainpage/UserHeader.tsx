import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import styled from 'styled-components';

import useAxios from '../../hooks/useAxios';
import { RootState } from '../../store/Store';
import { IImageProps } from '../../type/IImageProps';
import { IMbti } from '../../type/IMbti';
import { Iuser } from '../../type/Iuser';

const UserHeaderContainer = styled.div<IImageProps>`
	width: 100vw;
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
		height: 40vh;
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
	.emphasis {
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

function UserHeader() {
	const [filterMbti, setFilterMbti] = useState<IMbti>({
		description: '',
		img: '',
		mbti: '',
		place: '',
		placeImg: '',
	});
	const userInfos = useSelector((state: RootState) => state.user) as Iuser;

	const res: any = useAxios({
		method: 'get',
		url: '/mbtiInfo',
	}).response;

	useEffect(() => {
		if (res !== null) {
			const newData = res.filter((item: IMbti) => item.mbti === userInfos.mbti);
			setFilterMbti(newData[0]);
		}
	}, [res, userInfos.mbti]);

	return (
		<UserHeaderContainer image={filterMbti ? filterMbti.placeImg : ''}>
			<HeaderText>
				<span>
					<span className="emphasis">{userInfos.nickname}</span>님 어서오세요!
				</span>
				{filterMbti ? (
					<div>
						{filterMbti.description1}
						<br />
						<span className="emphasis">{filterMbti.mbti}</span>에게 어울리는{' '}
						<span className="emphasis">{filterMbti.place}</span>
						{filterMbti.description2}
					</div>
				) : (
					<div />
				)}
			</HeaderText>
		</UserHeaderContainer>
	);
}

export default UserHeader;
