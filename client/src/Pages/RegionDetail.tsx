import { HTMLAttributes } from 'react';

import styled from 'styled-components';

interface SlideItemProps extends HTMLAttributes<HTMLDivElement> {
	image?: string;
}

const backgroundImg =
	'https://images.unsplash.com/photo-1562504208-03d85cc8c23e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80';

const RegionDetailContainer = styled.div`
	width: 100vw;
	height: 100%;
	margin-top: 71px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const RegionDetailImage = styled.div`
	width: 100%;
	height: 460px;
	background-image: linear-gradient(
			rgba(255, 255, 255, 0.25),
			rgba(255, 255, 255, 0.25)
		),
		url(${backgroundImg});
	background-position: center;
	background-size: cover;
	display: flex;
	align-items: flex-end;
	> span {
		font-size: 50px;
		font-weight: 900;
		color: white;
		margin: 20px;
	}
`;

const RegionInfo = styled.div`
	width: 90%;
	height: 230px;
	background-color: rgba(0, 0, 0, 0.2);
	margin: 70px;
`;

const RegionText = styled.div`
	width: 90%;
	font-size: 20px;
	font-weight: 700;
	text-align: start;
`;

const RegionRecItemContainer = styled.div`
	width: 90%;
	padding: 20px 70px 70px 70px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
`;

const RegionRecItem = styled.div`
	width: 280px;
	height: 350px;
	border: 1px solid #adadad;
	border-radius: 20px 20px 0 0;
	margin: 20px;
`;

const RegionItemImg = styled.div<SlideItemProps>`
	height: 270px;
	background-image: url(${(props) => (props.image ? props.image : '')});
	background-position: center;
	background-size: cover;
	border-radius: 15px;
`;

const RegionItemText = styled.div`
	padding: 10px;
	font-size: 18px;
	border-top: 1px solid #adadad;
	color: #adadad;
	> span {
		font-size: 20px;
		color: black;
	}
`;

function RegionDetail() {
	return (
		<RegionDetailContainer>
			<RegionDetailImage>
				<span>지역별 추천 여행 명소</span>
			</RegionDetailImage>
			<RegionInfo>지역 소개 or 날씨</RegionInfo>
			<RegionText>📍서울의 명소</RegionText>
			<RegionRecItemContainer>
				<RegionRecItem>
					<RegionItemImg />
					<RegionItemText>
						<span>경복궁</span>
						<br />
						#궁궐 #궁전 #역사 #건축물
					</RegionItemText>
				</RegionRecItem>
				<RegionRecItem>
					<RegionItemImg />
					<RegionItemText>
						<span>경복궁</span>
						<br />
						#궁궐 #궁전 #역사 #건축물
					</RegionItemText>
				</RegionRecItem>
				<RegionRecItem>
					<RegionItemImg />
					<RegionItemText>
						<span>경복궁</span>
						<br />
						#궁궐 #궁전 #역사 #건축물
					</RegionItemText>
				</RegionRecItem>
				<RegionRecItem>
					<RegionItemImg />
					<RegionItemText>
						<span>경복궁</span>
						<br />
						#궁궐 #궁전 #역사 #건축물
					</RegionItemText>
				</RegionRecItem>
				<RegionRecItem>
					<RegionItemImg />
					<RegionItemText>
						<span>경복궁</span>
						<br />
						#궁궐 #궁전 #역사 #건축물
					</RegionItemText>
				</RegionRecItem>
				<RegionRecItem>
					<RegionItemImg />
					<RegionItemText>
						<span>경복궁</span>
						<br />
						#궁궐 #궁전 #역사 #건축물
					</RegionItemText>
				</RegionRecItem>
			</RegionRecItemContainer>
		</RegionDetailContainer>
	);
}

export default RegionDetail;
