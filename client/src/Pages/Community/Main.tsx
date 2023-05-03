import styled from 'styled-components';
import '../../Global.css';
import SideBar from '../../Components/Community/SideBar';
import Tags from '../../Components/Community/Tags';

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
	height: calc(100vh - 470px);
	display: flex;
`;

const ContentContainer = styled.div`
	height: calc(100vh - 400px);
	width: calc(100vw - 400px);
	margin-right: 30px;
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
		width: 750px;
		margin-right: 50px;

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
	background-color: rgb(200, 202, 204);
	margin-top: 10px;
	height: 32px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
`;

const PostBtn = styled.div`
	button {
		position: relative;
		margin: auto;
		padding: 12px 18px;
		transition: all 0.2s ease;
		border: none;
		background: none;

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			display: block;
			border-radius: 50px;
			background: #a3e6ff;
			width: 35px;
			height: 35px;
			transition: all 0.3s ease;
		}

		&:hover::before {
			width: 100%;
			background: #a3e6ff;
		}

		&:hover {
			span {
				color: white;
			}
			svg {
				transform: translateX(0);
				stroke: white;
			}
		}

		&:active {
			transform: scale(0.95);
		}

		span {
			position: relative;
			font-family: 'Ubuntu', sans-serif;
			font-size: 13px;
			font-weight: 700;
			letter-spacing: 0.05em;
			color: #000000;

			&:hover {
				color: white;
				stroke: white;
			}
		}

		svg {
			position: relative;
			top: 0;
			margin-left: 10px;
			fill: none;
			stroke-linecap: round;
			stroke-linejoin: round;
			stroke: #234567;
			stroke-width: 2;
			transform: translateX(-5px);
			transition: all 0.3s ease;

			&:hover {
				color: white;
				stroke: white;
			}
		}
	}
`;

const TagContainer = styled.div`
	height: calc(100vh - 400px);
	width: 230px;
	margin-right: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	> div:last-child {
		display: flex;
		justify-content: center;
		align-items: center;
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
		<div className="main">
			<Explain>
				<h1>커뮤니티</h1>
				<div>
					나와 같은 MBTI를 가진 사람들은 어떤 여행을 갔는지 궁금한가요? <br />
					여행메이트가 없으세요? MBTI과몰입러라구요? 여러 잡담을 나누고 싶나요?
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
								INFP / ENTJ / ENFP 친구들끼리 여행가는데 여행지 추천해주세요!
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
					<Pagination>페 이 지 네 이 션 자 리</Pagination>
				</ContentContainer>

				<TagContainer>
					<Tags />
				</TagContainer>
			</Body>
		</div>
	);
}

export default Main;
