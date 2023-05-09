import styled from 'styled-components';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { ChangeEvent, MouseEventHandler, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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

	> div:nth-child(2) {
		width: 45px;
		height: 43px;
		background-color: aquamarine;
		border-radius: 50%;
	}

	> div:nth-child(3) {
		width: 100%;
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
				font-size: 15px;
				width: 100%;
			}

			> div {
				display: flex;
				width: 50px;
				justify-content: space-around;
			}
		}
	}
`;

const Vote = styled.div`
	width: 50px;
	display: flex;
	height: 100%;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	> span {
		margin-top: 6px;
	}
`;

interface Answer {
	author: string;
	content: string;
	id: number;
	vote: number;
}

function Answers() {
	const { id } = useParams();
	const displayName = localStorage.getItem('displayName');

	const [isLike, setIsLike] = useState<boolean>(false);
	const [text, setText] = useState<string>('');
	const [answers, setAnswers] = useState<Answer[]>([]);

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
	};

	const handleSubmit = (e: { key: string }) => {
		if (e.key === 'Enter') {
			axios.get(`http://localhost:4000/posts/${id}`).then((res) => {
				const prevComments = res.data.comments;

				const newComment = {
					id: answers.length + 1,
					content: text,
					author: displayName,
					vote: 0,
				};

				axios.patch(`http://localhost:4000/posts/${id}`, {
					comments: [...prevComments, newComment],
				});
				document.location.href = `/community/${id}`;
			});
		}
	};

	const handleLike = (answerId: number) => {
		const answerIndex = answers.findIndex((answer) => answer.id === answerId);
		console.log(answerIndex + 1, answerId);
		if (answerIndex + 1 === answerId) {
			setIsLike(!isLike);
		}

		// if (clickedAnswer) {
		// 	axios.patch(
		// 		`http://localhost:4000/posts/${id}/comments/${clickedAnswer}/vote`,
		// 		{
		// 			vote: clickedAnswer.vote + 1,
		// 		},
		// 	);
		// }
	};

	const handleUpdate = (answerId: number) => {
		const answerIndex = answers.findIndex((answer) => answer.id === answerId);
	};

	useEffect(() => {
		axios
			.get(`http://localhost:4000/posts/${id}`)
			.then((res) => setAnswers(res.data.comments));
	}, [id]);

	return (
		<Container>
			<AnswerInput
				placeholder="댓글을 남겨주세요"
				onChange={(e) => handleInput(e)}
				onKeyDown={handleSubmit}
			/>

			{answers &&
				answers.map((el, idx) => (
					<Answer>
						<Vote>
							{isLike ? (
								<AiFillHeart
									size={18}
									onClick={() => handleLike(el.id)}
									color="#fe6464"
								/>
							) : (
								<AiOutlineHeart size={18} onClick={() => handleLike(el.id)} />
							)}

							<span>{el.vote}</span>
						</Vote>
						<div />
						<div>
							<div>{el.author}</div>

							<div>
								<span>{el.content}</span>
								<div>
									<BsPencilSquare size={14} />
									<BsTrash size={14} />
								</div>
							</div>
						</div>
					</Answer>
				))}
		</Container>
	);
}

export default Answers;
