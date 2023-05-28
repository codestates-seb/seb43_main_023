import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
	width: 170px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	margin-top: -1.9rem;
	font-weight: 600;
	font-size: 15px;
	height: 820px;

	@media (max-width: 768px) {
		width: 10%;
		margin-left: 45px;
	}

	@media (max-width: 580px) {
		display: none;
	}

	div {
		padding: 8px 0;
		width: 80px;
		display: flex;
		justify-content: center;
		border-radius: 30px;
		color: black;

		&:hover {
			background-color: #0db4f3;
			color: white;
		}

		a {
			color: inherit;
			text-decoration: none;

			&:hover {
				background-color: #0db4f3;
				color: white;
			}
		}
	}
`;

function SideBar() {
	return (
		<Container>
			<Link to="/tripreview">
				<div>여행리뷰</div>
			</Link>

			<Link to="/community">
				<div>여행고민</div>
			</Link>

			<Link to="/tripmate">
				<div>같이가요</div>
			</Link>

			<Link to="/mbti">
				<div>MBTI</div>
			</Link>

			<Link to="/etctalk">
				<div>잡담</div>
			</Link>
		</Container>
	);
}

export default SideBar;
