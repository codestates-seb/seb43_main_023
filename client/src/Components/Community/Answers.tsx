import styled from 'styled-components';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';

const Container = styled.div`
	width: 100%;
`;

const AnswerInput = styled.input`
	width: inherit;
	height: 50px;
	display: flex;
	justify-content: center;
	background-color: #fafafa;
	border: 1px solid #c7c7c7;
	border-radius: 6px;
	padding-left: 20px;
`;

const Answer = styled.div`
	margin-top: 15px;
	border-bottom: 1px solid #c7c7c7;
	width: 100%;
	display: flex;
	align-items: center;
	padding: 10px;

	> div:nth-child(1) {
		width: 45px;
		height: 45px;
		background-color: aquamarine;
		border-radius: 50%;
	}

	> div:nth-child(2) {
		margin-left: 15px;

		> div:nth-child(1) {
		}

		> div:nth-child(2) {
			margin-top: 5px;
			display: flex;
			width: 100%;
			justify-content: space-between;

			> span {
				padding-right: 20px;
			}

			> div {
				display: flex;
				width: 50px;
				justify-content: space-around;
			}
		}
	}
`;
function Answers() {
	return (
		<Container>
			<AnswerInput placeholder="댓글을 남겨주세요" />
			<Answer>
				<div />

				<div>
					<div>조베기</div>
					<div>
						<span>
							배고프다 ~~배고프다 ~~배고프다 ~~배고프다 ~~배고프다 ~~배고프다
							~~배고프다 ~~배고프다 ~~배고프다 ~~배고프다 ~~배고프다 ~~배고프다
							~~배고프다 ~~배고프다 ~~배고프다 ~~배고프다 ~~
						</span>
						<div>
							<BsPencilSquare />
							<BsTrash />
						</div>
					</div>
				</div>
			</Answer>
		</Container>
	);
}

export default Answers;
