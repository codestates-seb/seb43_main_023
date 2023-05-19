import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IImageProps } from '../../type/IImageProps';

interface IRegion {
	id: number;
	name: string;
	img: string;
}

const backgroundImg =
	'https://images.unsplash.com/photo-1562504208-03d85cc8c23e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80';

const RegionRecContainer = styled.div`
	width: 100vw;
	height: 100%;
	margin-top: 82px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const RegionRecImage = styled.div`
	width: 100%;
	height: 40vh;
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
	@media (max-width: 768px) {
		height: 30vh;
	}
`;

const RegionRecItemContainer = styled.div`
	width: 90vw;
	padding: 70px 0;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	.unvisible {
		background-image: url('');
	}
`;

const RegionRecImg = styled.div<IImageProps>`
	width: 260px;
	height: 260px;
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

const StyledLink = styled(Link)`
	color: black;
	&:visited {
		color: black;
	}
`;

function RegionRec() {
	const regionInfo: IRegion[] = [
		{
			id: 1,
			name: '서울',
			img: 'https://a.cdn-hotels.com/gdcs/production117/d150/1049d859-3926-4a0d-8ae2-d7e227f902c2.jpg?impolicy=fcrop&w=800&h=533&q=medium',
		},
		{
			id: 2,
			name: '제주',
			img: 'https://images.unsplash.com/photo-1579169825453-8d4b4653cc2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
		},
		{
			id: 3,
			name: '강원',
			img: 'https://images.unsplash.com/photo-1676705910596-10a68dccbe8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
		},
		{
			id: 4,
			name: '경기',
			img: 'https://images.unsplash.com/photo-1607165398235-5f43c715f57b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1718&q=80',
		},
		{
			id: 5,
			name: '부산',
			img: 'https://images.unsplash.com/photo-1638591751482-1a7d27fcea15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80',
		},
		{
			id: 6,
			name: '울산',
			img: 'https://images.unsplash.com/photo-1654061394903-fd141e2c97bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
		},
		{
			id: 7,
			name: '대구',
			img: 'https://images.unsplash.com/photo-1549898395-045c8fa2883b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
		},
		{
			id: 8,
			name: '대전',
			img: 'http://newsimg.hankookilbo.com/2016/10/21/201610211159329181_1.jpg',
		},
		{
			id: 9,
			name: '인천',
			img: 'https://images.unsplash.com/photo-1634131431002-8fe857eb64a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
		},
		{
			id: 10,
			name: '광주',
			img: 'https://images.unsplash.com/photo-1593419522318-81b7c346a3e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2854&q=80',
		},
		{
			id: 11,
			name: '경남',
			img: 'https://images.unsplash.com/photo-1529528070131-eda9f3e90919?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
		},
		{
			id: 12,
			name: '경북',
			img: 'https://images.unsplash.com/photo-1669764372822-3cb8476d4f47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80',
		},
		{
			id: 13,
			name: '전남',
			img: 'https://cdn.gjdream.com/news/photo/202101/605746_205437_2251.jpg',
		},
		{
			id: 14,
			name: '전북',
			img: 'https://images.unsplash.com/photo-1653329315898-afe70b1335ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
		},
		{
			id: 15,
			name: '충남',
			img: 'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=3896ab79-c334-4752-b73d-59bc431d0c8a',
		},
		{
			id: 16,
			name: '충북',
			img: 'http://noms.templestay.com/images/TiImage/H/L/9569.png',
		},
	];

	useEffect(() => {
		const options = {
			root: null,
			rootmargin: '0px',
			threshold: 0.4,
		};

		const lazyObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.remove('unvisible');
					observer.unobserve(entry.target);
				}
			});
		}, options);
		const images = document.querySelectorAll('.regionItem');
		images.forEach((el) => {
			lazyObserver.observe(el);
		});
	}, []);

	return (
		<RegionRecContainer>
			<RegionRecImage>
				<span>지역별 추천 여행 명소</span>
			</RegionRecImage>
			<RegionRecItemContainer>
				{regionInfo
					? regionInfo.map((item) => (
							<StyledLink
								to={`/regiondetail/${item.id}`}
								style={{ textDecoration: 'none' }}
								key={item.id}
							>
								<RegionRecImg className="unvisible regionItem" image={item.img}>
									<div>{item.name}</div>
								</RegionRecImg>
							</StyledLink>
					  ))
					: null}
			</RegionRecItemContainer>
		</RegionRecContainer>
	);
}

export default RegionRec;
