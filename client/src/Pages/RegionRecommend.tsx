import { HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface SlideItemProps extends HTMLAttributes<HTMLDivElement> {
	image?: string;
}

const backgroundImg =
	'https://images.unsplash.com/photo-1562504208-03d85cc8c23e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80';

const RegionRecContainer = styled.div`
	width: 100vw;
	height: 100%;
	margin-top: 71px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const RegionRecImage = styled.div`
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

const RegionRecItemContainer = styled.div`
	width: 90vw;
	padding: 70px;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

const RegionRecImg = styled.div<SlideItemProps>`
	width: 270px;
	height: 270px;
	background: ${(props) => (props.image ? `url(${props.image})` : `url('')`)}
		center / cover no-repeat;
	border-radius: 15px;
	margin: 10px;
	color: white;
	font-size: 30px;
	font-weight: 700;
	border-radius: 15px;
	text-align: center;
	> div {
		line-height: 270px;
	}
`;

function RegionRec() {
	return (
		<RegionRecContainer>
			<RegionRecImage>
				<span>지역별 추천 여행 명소</span>
			</RegionRecImage>
			<RegionRecItemContainer>
				<Link to="/regiondetail">
					<RegionRecImg image="https://a.cdn-hotels.com/gdcs/production117/d150/1049d859-3926-4a0d-8ae2-d7e227f902c2.jpg?impolicy=fcrop&w=800&h=533&q=medium">
						<div>서울</div>
					</RegionRecImg>
				</Link>
				<RegionRecImg image="https://images.unsplash.com/photo-1579169825453-8d4b4653cc2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80">
					<div>제주</div>
				</RegionRecImg>
				<RegionRecImg image="https://images.unsplash.com/photo-1676705910596-10a68dccbe8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80">
					<div>강원</div>
				</RegionRecImg>
				<RegionRecImg image="https://images.unsplash.com/photo-1607165398235-5f43c715f57b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1718&q=80">
					<div>경기</div>
				</RegionRecImg>
				<RegionRecImg image="https://images.unsplash.com/photo-1638591751482-1a7d27fcea15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80">
					<div>부산</div>
				</RegionRecImg>
				<RegionRecImg image="https://images.unsplash.com/photo-1654061394903-fd141e2c97bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80">
					<div>울산</div>
				</RegionRecImg>
				<RegionRecImg image="https://images.unsplash.com/photo-1549898395-045c8fa2883b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80">
					<div>대구</div>
				</RegionRecImg>
				<RegionRecImg image="http://newsimg.hankookilbo.com/2016/10/21/201610211159329181_1.jpg">
					<div>대전</div>
				</RegionRecImg>
				<RegionRecImg image="https://images.unsplash.com/photo-1634131431002-8fe857eb64a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80">
					<div>인천</div>
				</RegionRecImg>
				<RegionRecImg image="https://images.unsplash.com/photo-1593419522318-81b7c346a3e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2854&q=80">
					<div>광주</div>
				</RegionRecImg>
				<RegionRecImg image="https://images.unsplash.com/photo-1529528070131-eda9f3e90919?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80">
					<div>경상남도</div>
				</RegionRecImg>
				<RegionRecImg image="https://images.unsplash.com/photo-1669764372822-3cb8476d4f47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80">
					<div>경상북도</div>
				</RegionRecImg>
				<RegionRecImg image="https://cdn.gjdream.com/news/photo/202101/605746_205437_2251.jpg">
					<div>전라남도</div>
				</RegionRecImg>
				<RegionRecImg image="https://images.unsplash.com/photo-1653329315898-afe70b1335ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80">
					<div>전라북도</div>
				</RegionRecImg>
				<RegionRecImg image="https://cdn.imweb.me/thumbnail/20190505/5cce19e7b096e.jpg">
					<div>충청남도</div>
				</RegionRecImg>
				<RegionRecImg image="http://noms.templestay.com/images/TiImage/H/L/9569.png">
					<div>충청북도</div>
				</RegionRecImg>
			</RegionRecItemContainer>
		</RegionRecContainer>
	);
}

export default RegionRec;
