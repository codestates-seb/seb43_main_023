import '../Global.css';

// eslint-disable-next-line import/no-extraneous-dependencies
import { PulseLoader } from 'react-spinners';
import styled from 'styled-components';

import loading from '../assets/loading.png';

const Content = styled.div`
	width: 100%;
	height: 70vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 200px;
	div {
		margin: 50px 0;
		font-weight: bold;
		font-size: 25px;
		color: rgba(0, 0, 0, 0.3);
	}
`;

function Loading() {
	return (
		<Content className="main">
			<img className="loading" src={loading} alt="" />
			<div>잠시만 기다려주세요...</div>
			<PulseLoader color="#B2B2B2" size="20" margin="10" />
		</Content>
	);
}
export default Loading;
