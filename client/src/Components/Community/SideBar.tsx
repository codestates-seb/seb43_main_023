import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.ul`
	width: 170px;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	margin-top: -1.9rem;
	font-weight: 600;
	font-size: 15px;

	> li {
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
			<li>
				<Link to="/tripreview">여행리뷰 </Link>
			</li>

			<li>
				<Link to="/community">여행고민</Link>
			</li>
			<li>
				<Link to="/tripmate">같이가요</Link>
			</li>
			<li>
				<Link to="/mbti">MBTI</Link>
			</li>
			<li>
				<Link to="/etctalk">잡담</Link>
			</li>
		</Container>
	);
}

export default SideBar;
