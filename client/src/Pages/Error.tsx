import '../Global.css';

import { Link } from 'react-router-dom';
import styled from 'styled-components';

import error from '../assets/error.png';

const Content = styled.div`
	width: 100%;
	height: 70vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 150px;
	div {
		margin-top: 50px;
		font-weight: bold;
		font-size: 25px;
		color: rgba(0, 0, 0, 0.3);
	}
	.link {
		text-decoration: none;
		color: #0db4f3;
	}
`;

function Error() {
	return (
		<Content className="main">
			<img className="error" src={error} alt="" />
			<div>
				페이지를 찾을 수 없습니다. <br />
				<br /> 메인페이지로 돌아가시려면{' '}
				<Link className="link" to="/main">
					여기
				</Link>
				를 클릭해주세요.
			</div>
		</Content>
	);
}
export default Error;
