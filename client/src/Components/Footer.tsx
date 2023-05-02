import '../Global.css';

import { Link } from 'react-router-dom';
import styled from 'styled-components';

import logo from '../Assets/너의 MBTI는.png';

const Main = styled.div`
	width: 100%;
	position: absolute;
	bottom: 0px;
	transform: translate3d(0, 0, 0);
	.wave {
		opacity: 0.4;
		position: absolute;
		top: 3%;
		background: rgba(0, 0, 0, 0.05);
		width: 1000px;
		height: 1000px;
		margin-top: -100px;
		transform-origin: 50% 48%;
		border-radius: 43%;
		animation: drift 3000ms infinite linear;
		overflow-y: hidden;
	}

	.wave.-three {
		animation: drift 5000ms infinite linear;
	}

	.wave.-two {
		animation: drift 7000ms infinite linear;
		opacity: 0.1;
		background: rgba(0, 0, 0, 0.1);
	}
	@keyframes drift {
		from {
			transform: rotate(0deg);
		}
		from {
			transform: rotate(360deg);
		}
	}
`;
const Content = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	background: rgba(0, 0, 0, 0.05);
	padding: 30px 100px;
	div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	span {
		font-size: 14px;
		color: gray;
		font-weight: bold;
		margin-bottom: 10px;
		padding-bottom: 10px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.3);
	}
	img {
		width: 130px;
		margin-bottom: 10px;
	}
	a {
		text-decoration: none;
		font-size: 14px;
		color: gray;
		font-weight: 400;
	}
	button {
		margin-bottom: 5px;
		color: #2d2d2d;
		font-size: 10px;
		background: none;
		&:hover {
			color: rgba(0, 0, 0, 0.5);
		}
	}
`;
function Footer() {
	return (
		<Main>
			<div className="wave -one" />
			<div className="wave -two" />
			<div className="wave -three" />
			<Content>
				<div>
					<img src={logo} alt="" />
					<Link to="https://github.com/codestates-seb/seb43_main_023">
						Github
					</Link>
				</div>
				<div>
					<span>SERVICE</span>
					<button>지역별 추천 여행 명소</button>
					<button>국내 핫한 여행 명소</button>
					<button>인기 여행 리뷰</button>
				</div>
				<div>
					<span>COMMUNITY</span>
					<button>여행리뷰</button>
					<button>여행고민</button>
					<button>같이가요</button>
					<button>MBTI</button>
					<button>잡담</button>
				</div>
				<div>
					<span>TEAM</span>
					<Link to="https://github.com/hihijin">
						<button>박희진</button>
					</Link>
					<Link to="https://github.com/Choalstn">
						<button>조민수</button>
					</Link>
					<Link to="https://github.com/raccoon0814">
						<button>윤정훈</button>
					</Link>
					<Link to="https://github.com/JoDaeUk">
						<button>조대욱</button>
					</Link>
					<Link to="https://github.com/Seulime">
						<button>임슬범</button>
					</Link>
					<Link to="https://github.com/Slothst">
						<button>최낙주</button>
					</Link>
				</div>
			</Content>
		</Main>
	);
}

export default Footer;
