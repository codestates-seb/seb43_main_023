import { HTMLAttributes } from 'react';
import styled from 'styled-components';

interface SlideItemProps extends HTMLAttributes<HTMLDivElement> {
	image?: string;
}

const backgroundImg =
	'https://a.cdn-hotels.com/gdcs/production117/d150/1049d859-3926-4a0d-8ae2-d7e227f902c2.jpg?impolicy=fcrop&w=800&h=533&q=medium';

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
	margin: 70px;
	display: flex;
`;

const RegionInfoImg = styled.div`
	width: 40%;
	background: url('https://korean.visitseoul.net/comm/getImage?srvcId=MEDIA&parentSn=22376&fileTy=MEDIA&fileNo=2')
		no-repeat center / cover;
`;

const RegionInfoText = styled.div`
	width: 60%;
	padding-left: 20px;
	font-size: 18px;
`;

const RegionTitle = styled.div`
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
	border-radius: 20px 20px 0 0;
	margin: 20px;
`;

const RegionItemImg = styled.div<SlideItemProps>`
	height: 270px;
	background-image: url(${(props) => (props.image ? props.image : '')});
	background-position: center;
	background-size: cover;
	border: 1px solid #adadad;
	border-radius: 15px 15px 0 0;
`;

const RegionItemText = styled.div`
	padding: 10px;
	font-size: 18px;
	border: 1px solid #adadad;
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
				<span>서울 추천 여행 명소</span>
			</RegionDetailImage>
			<RegionInfo>
				<RegionInfoImg />
				<RegionInfoText>
					3일 정도의 날씨
					<br />
					3일 정도의 날씨
					<br />
					3일 정도의 날씨
					<br />
					3일 정도의 날씨
					<br />
					서울은 대한민국의 수도로서 정치, 경제, 사회, 문화의 중심지이다. 서울의
					면적은 605㎢로서 도쿄의 23개 특별구와 비슷하며, 싱가포르와 뉴욕시보다
					다소 작은 크기이다. 서울은 외사산과 내사산에 둘러싸인 분지의 지형이다.
					그리고 수계로서 청계천, 중랑천, 홍제천, 안양천, 탄천 등의 지천이
					한강으로 흘러가고 있다. <br /> 서울은 20세기 중반 들어 오늘날의 발전을
					시작하였지만, 20세기 후반 들어 폭발적인 성장을 거듭하여 대도시로
					성장하였다. 이에 따라, 현재 서울은 대중교통, 도로, 상하수도 등
					도시기반시설도 상당한 수준에 와 있으며, 최근에는 세계의 각종
					도시경쟁력 평가에서도 두각을 나타내고 있다.
				</RegionInfoText>
			</RegionInfo>
			<RegionTitle>📍서울의 명소</RegionTitle>
			<RegionRecItemContainer>
				<RegionRecItem>
					<RegionItemImg image="https://images.unsplash.com/photo-1611477623565-aa88aeca8153?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80" />
					<RegionItemText>
						<span>경복궁</span>
						<br />
						#궁궐 #궁전 #역사 #건축물
					</RegionItemText>
				</RegionRecItem>
				<RegionRecItem>
					<RegionItemImg image="https://images.unsplash.com/photo-1578458719181-a9e1184d810b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80" />
					<RegionItemText>
						<span>남산 공원</span>
						<br />
						#도시공원 #데이트 #야경
					</RegionItemText>
				</RegionRecItem>
				<RegionRecItem>
					<RegionItemImg image="https://images.unsplash.com/photo-1649137529574-fe07b1f6386d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" />
					<RegionItemText>
						<span>63빌딩</span>
						<br />
						#현대건축물 #레스토랑 #아쿠아리움 #전망대
					</RegionItemText>
				</RegionRecItem>
				<RegionRecItem>
					<RegionItemImg image="https://images.unsplash.com/photo-1537433156662-a467cd381897?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" />
					<RegionItemText>
						<span>코엑스 별마당도서관</span>
						<br />
						#공공도서관 #책 #커피 #문화생활
					</RegionItemText>
				</RegionRecItem>
				<RegionRecItem>
					<RegionItemImg image="http://dh.aks.ac.kr/Edu/wiki/images/1/13/%EC%98%88%EC%88%A0%EC%9D%98%EC%A0%84%EB%8B%B9.jpg" />
					<RegionItemText>
						<span>예술의전당</span>
						<br />
						#공연 #전시 #음악 #미술 #문화생활
					</RegionItemText>
				</RegionRecItem>
				<RegionRecItem>
					<RegionItemImg image="https://images.unsplash.com/photo-1677107129846-e55445429b7c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" />
					<RegionItemText>
						<span>익선동</span>
						<br />
						#한옥 #맛집 #카페 #데이트
					</RegionItemText>
				</RegionRecItem>
			</RegionRecItemContainer>
		</RegionDetailContainer>
	);
}

export default RegionDetail;
