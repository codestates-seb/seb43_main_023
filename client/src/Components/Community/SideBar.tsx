import styled from 'styled-components';

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

		&:hover {
			background-color: #0db4f3;
			color: white;
		}
	}
`;

function SideBar() {
	return (
		<Container>
			<li>여행리뷰</li>
			<li>여행고민</li>
			<li>같이가요</li>
			<li>MBTI</li>
			<li>잡담</li>
		</Container>
	);
}

export default SideBar;
