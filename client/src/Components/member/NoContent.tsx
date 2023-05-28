import '../../Global.css';

import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Main = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 20px 0;
	margin-bottom: 100px;
	.nocontent {
		width: 200px;
		margin-bottom: 40px;
	}
	span {
		color: #0db4f3;
	}
`;
function NoContent() {
	return (
		<Main className="main">
			<div>내가 쓴 글이 없어요</div>
			<br />
			<br />
			<div>
				<Link
					to={{ pathname: '/community' }}
					style={{ textDecoration: 'none', color: '#2d2d2d' }}
				>
					<span>커뮤니티</span>
				</Link>
				에 글을 작성하러 가볼까요?
			</div>
		</Main>
	);
}
export default NoContent;
