import { Link } from 'react-router-dom';
import styled from 'styled-components';

const UL = styled.ul`
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	font-weight: 600;
	font-size: 15px;
	padding: 10px 0;

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
			cursor: pointer;
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

function TopBar() {
	return (
		<UL>
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
		</UL>
	);
}

export default TopBar;
