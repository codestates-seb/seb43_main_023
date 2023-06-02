import '../../Global.css';

import { Link } from 'react-router-dom';
import styled from 'styled-components';

import airplane from '../../assets/airplane.png';
import logo from '../../assets/logo.png';

const Main = styled.div`
	overflow: hidden;
	.airplane {
		width: 100%;
		height: 101vh;
		@media (max-width: 768px) {
			display: none;
		}
	}
	.logo {
		width: 130px;
		position: absolute;
		top: 20px;
		left: 20px;
		@media (max-height: 700px) {
			width: 100px;
		}
		@media (max-height: 650px) {
			width: 90px;
		}
		@media (max-width: 430px) {
			width: 80px;
		}
	}
`;

export default function ImgBox() {
	return (
		<Main>
			<img className="airplane" src={airplane} alt="" />
			<Link to="/main">
				<img className="logo" src={logo} alt="" />
			</Link>
		</Main>
	);
}
