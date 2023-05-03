import styled from 'styled-components';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import SideBar from '../../Components/Community/SideBar';

const Container = styled.div`
	background-color: #fafafa;
	height: calc(100vh - 85px);
`;

const Explain = styled.div`
	margin-top: 85px;
	border-bottom: 1px solid rgb(214, 217, 219);
	height: 130px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-left: 20px;
	margin-bottom: 40px;
	padding: 30px;
	line-height: 1.5rem;

	> h1 {
		margin-top: 20px;
		margin-bottom: 10px;
	}

	> div {
		color: #595959;
		font-size: 14px;
		padding-bottom: 5px;
	}
`;

const Body = styled.div`
	height: calc(100vh - 479px);
	display: flex;
`;

const ContentContainer = styled.div`
	width: calc(100vw - 470px);
	margin-right: 50px;
`;

const ContentHeader = styled.div`
	display: flex;
	padding-top: 10px;
	padding-bottom: 10px;
	font-weight: 600;
	font-size: 13px;

	> div:nth-child(1) {
		width: 90px;
		display: flex;
		justify-content: center;
	}

	> div:nth-child(2) {
		flex-grow: 2;
		display: flex;
		justify-content: center;
	}

	> div:nth-child(3) {
		width: 60px;
		display: flex;
		justify-content: center;
	}

	> div:nth-child(4) {
		width: 60px;
		display: flex;
		justify-content: center;
	}

	> div:nth-child(5) {
		width: 60px;
		display: flex;
		justify-content: center;
	}
`;

const Contentbody = styled.div`
	display: flex;
	padding-top: 10px;
	padding-bottom: 10px;
	font-weight: 350;
	font-size: 13px;

	&:hover {
		color: #0db4f3;
	}

	> div:nth-child(1) {
		width: 90px;
		display: flex;
		justify-content: center;
	}

	> div:nth-child(2) {
		width: 700px;

		> p {
			display: block;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}
	}

	> div:nth-child(3) {
		width: 60px;
		display: flex;
		justify-content: center;
	}

	> div:nth-child(4) {
		width: 60px;
		display: flex;
		justify-content: center;
	}

	> div:nth-child(5) {
		width: 60px;
		display: flex;
		justify-content: center;
	}
`;

const Pagination = styled.div`
	margin-top: 10px;

	height: 32px;
	display: flex;

	> div:nth-child(1) {
		width: 900px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

const PostBtn = styled.div`
	border-radius: 12px;
	background-color: #0db4f3;
	color: white;
	font-weight: 500;
	font-size: 14px;
	width: 70px;
	height: 27px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Tags = styled.div`
	width: 230px;
	margin-left: -10px;
`;

const PlaceTag = styled.div`
	font-weight: 600;
	font-size: 15px;

	> h4 {
		border-radius: 30px;
		width: 50px;
		padding: 4px 5px;
		margin-left: 10px;
		margin-bottom: 10px;
		font-size: 13px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #a3e6ff;
	}

	> div {
		margin-top: 5px;
		display: flex;
		flex-wrap: wrap;
		border-bottom: 1px solid rgb(214, 217, 219);
		padding-bottom: 5px;
		margin-bottom: 5px;
	}
`;

const ThemeTag = styled.div`
	font-weight: 600;
	font-size: 15px;
	margin-top: 10px;

	> h4 {
		border-radius: 30px;
		width: 50px;
		padding: 4px 5px;
		margin-left: 10px;
		margin-bottom: 10px;
		font-size: 13px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #a3e6ff;
	}

	> div {
		margin-top: 5px;
		display: flex;
		flex-wrap: wrap;
		border-bottom: 1px solid rgb(214, 217, 219);
		padding-bottom: 5px;
		margin-bottom: 5px;
	}
`;

const MBTITags = styled.div`
	font-weight: 600;
	font-size: 15px;
	margin-top: 10px;

	> h4 {
		border-radius: 30px;
		width: 50px;
		padding: 4px 5px;
		margin-left: 10px;
		margin-bottom: 10px;
		font-size: 13px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #a3e6ff;
	}

	> div {
		margin-top: 5px;
		display: flex;
		flex-wrap: wrap;
	}
`;

const Tag = styled.div`
	width: max-content;
	padding: 5px 5px;
	margin-left: 10px;
	font-size: 13px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 11px;

	&:hover {
		color: #0db4f3;
	}
`;

const MBTITag = styled.div`
	border-radius: 30px;
	width: 30px;
	padding: 5px 15px;
	margin-left: 10px;

	font-size: 13px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 11px;

	&:hover {
		color: #0db4f3;
	}
`;

function Main() {
	const first = ['E', 'I'];
	const second = ['S', 'N'];
	const third = ['F', 'T'];
	const fourth = ['J', 'P'];

	const allMBTI = first.flatMap((f) =>
		second.flatMap((s) =>
			third.flatMap((t) => fourth.map((fth) => `${f}${s}${t}${fth}`)),
		),
	);
	return (
		<>
			<Header />
			<Container>
				<Explain>
					<h1>커뮤니티</h1>
					<div>
						나와 같은 MBTI를 가진 사람들은 어떤 여행을 갔는지 궁금한가요? <br />
						여행메이트가 없으세요? MBTI과몰입러라구요? 여러 잡담을 나누고
						싶나요?
						<br />
						커뮤니티 각 탭을 누르며 둘러보세요!
					</div>
				</Explain>

				<Body>
					<SideBar />

					<ContentContainer>
						<ContentHeader>
							<div>말머리</div>
							<div>제목</div>
							<div>닉네임</div>
							<div>추천</div>
							<div>작성시간</div>
						</ContentHeader>
						<Contentbody>
							<div>[여행고민]</div>
							<div>
								INFP / ENTJ / ENFP 친구들끼리 여행가는데 여행지 추천해주세요!
							</div>
							<div>너구리</div>
							<div>0</div>
							<div>16:15</div>
						</Contentbody>
						<Contentbody>
							<div>[여행고민]</div>
							<div>
								INFP / ENTJ / ENFP 친구들끼리 여행가는데 여행지 추천해주세요!
							</div>
							<div>너구리</div>
							<div>0</div>
							<div>16:15</div>
						</Contentbody>
						<Contentbody>
							<div>[여행고민]</div>
							<div>
								INFP / ENTJ / ENFP 친구들끼리 여행가는데 여행지 추천해주세요!
							</div>
							<div>너구리</div>
							<div>0</div>
							<div>16:15</div>
						</Contentbody>
						<Contentbody>
							<div>[여행고민]</div>
							<div>
								<p>
									INFP / ENTJ / ENFP 친구들끼리 여행가는데 여행지
									추천해주세요!INFP / ENTJ / ENFP 친구들끼리 여행가는데 여행지
									추천해주세요!INFP / ENTJ / ENFP 친구들끼리 여행가는데 여행지
									추천해주세요!
								</p>
							</div>
							<div>너구리</div>
							<div>0</div>
							<div>16:15</div>
						</Contentbody>
						<Contentbody>
							<div>[여행고민]</div>
							<div>
								INFP / ENTJ / ENFP 친구들끼리 여행가는데 여행지 추천해주세요!
							</div>
							<div>너구리</div>
							<div>0</div>
							<div>16:15</div>
						</Contentbody>
						<Contentbody>
							<div>[여행고민]</div>
							<div>
								INFP / ENTJ / ENFP 친구들끼리 여행가는데 여행지 추천해주세요!
							</div>
							<div>너구리</div>
							<div>0</div>
							<div>16:15</div>
						</Contentbody>
						<Contentbody>
							<div>[여행고민]</div>
							<div>
								INFP / ENTJ / ENFP 친구들끼리 여행가는데 여행지 추천해주세요!
							</div>
							<div>너구리</div>
							<div>0</div>
							<div>16:15</div>
						</Contentbody>

						<Pagination>
							<div>페 이 지 네 이 션 자 리 </div>
							<PostBtn>작성</PostBtn>
						</Pagination>
					</ContentContainer>

					<Tags>
						<PlaceTag>
							<h4>장소</h4>
							<div>
								<Tag>#전주</Tag>
								<Tag>#부산</Tag>
								<Tag>#제주도</Tag>
								<Tag>#하동</Tag>
								<Tag>#양떼목장</Tag>
								<Tag>#해수욕장</Tag>
							</div>
						</PlaceTag>
						<ThemeTag>
							<h4>테마</h4>
							<div>
								<Tag>#전주</Tag>
								<Tag>#부산</Tag>
								<Tag>#제주도</Tag>
								<Tag>#하동</Tag>
								<Tag>#양떼목장</Tag>
								<Tag>#해수욕장</Tag>
							</div>
						</ThemeTag>
						<MBTITags>
							<h4>MBTI</h4>
							<div>
								{allMBTI.map((el, index) => (
									// eslint-disable-next-line react/no-array-index-key
									<MBTITag key={index}>{`#${el}`}</MBTITag>
								))}
							</div>
						</MBTITags>
					</Tags>
				</Body>
			</Container>

			<Footer />
		</>
	);
}

export default Main;
