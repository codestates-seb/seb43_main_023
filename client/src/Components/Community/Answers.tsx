import { ChangeEvent, useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { Iuser } from '../../Reducers/userInfoReducer';
import { RootState } from '../../Store/store';
import { Api } from '../../Util/customAPI';
import useAxios from '../../hooks/useAxios';

const Container = styled.div`
	width: 100%;
	border-top: 1px solid rgb(214, 217, 219);
	padding-top: 30px;
	margin-top: 10px;
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
	width: 100%;
	display: flex;
	flex-direction: column;
	padding-bottom: 5px;
	border-bottom: 1px solid #c7c7c7;
`;

const ContentContainer = styled.div`
	margin-top: 15px;
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
	nickName: string;
	content: string;
	commentId: number;
	voteCount: number;
	postId: number;
	memberId: number;
}

interface Review {
	id: number;
	title: string;
	content: string;
	nickName: string;
	subject: string;
	image: string[];
	viewCount: number;
	voteCount: number;
	createdAt: string;
	tag: string[];
}

function Answers() {
	const navigate = useNavigate();
	const { id } = useParams();

	const [isLike, setIsLike] = useState<boolean>(false);
	const [text, setText] = useState<string>('');
	const [edit, setEdit] = useState<boolean>(false);
	const [clickedId, setClickedId] = useState<number | null>(null);
	const [review, setReview] = useState<Review[]>([]);

	// eslint-disable-next-line prefer-const
	let [answers, setAnswers] = useState<Answer[]>([]);
	const [length, setLenght] = useState<Answer[]>([]);

	answers = answers.filter((el) => el.postId === Number(id));

	const userInfos = useSelector((state: RootState) => state.user) as Iuser;

	const postData = useAxios({
		method: 'get',
		url: `/posts/${id}`,
	});

	const answerData = useAxios({
		method: 'get',
		url: `/posts/${id}/comments`,
	});

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
	};

	const handleSubmit = () => {
		try {
			Api.post(`posts/${id}/comments`, {
				content: text,
				memberId: userInfos.id,
				postId: id,
				nickName: userInfos.nickname,
			}).then(() => {
				if (review[0].subject === '여행리뷰') {
					document.location.href = `/tripreview/${id}`;
				} else {
					document.location.href = `/community/${id}`;
				}
			});
		} catch (error) {
			navigate('/error');
		}
	};

	const handleUpdate = (e: { key: string }, answerId: number) => {
		if (e.key === 'Enter') {
			try {
				Api.patch(`post/${id}/comments/${answerId}`, {
					content: text,
					memberId: userInfos.id,
					postId: id,
				});
				if (review[0].subject === '여행리뷰') {
					document.location.href = `/tripreview/${id}`;
				} else {
					document.location.href = `/community/${id}`;
				}
			} catch (error) {
				navigate('/error');
			}
		}
	};

	const handleDelete = (answerId: number) => {
		Swal.fire({
			title: '정말로 삭제하시겠습니까 ?',
			text: '다신 되돌릴 수 없습니다',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#0db4f3',
			cancelButtonColor: '#f37676',
			confirmButtonText: 'Delete',
		}).then((result) => {
			if (result.isConfirmed) {
				try {
					Api.delete(`/posts/${id}/comments/${answerId}`)
						.then(() =>
							Swal.fire({
								title: 'Deleted!',
								text: '삭제되었습니다',
								icon: 'success',
								confirmButtonColor: '#0db4f3',
							}),
						)
						// eslint-disable-next-line no-return-assign
						.then(() => {
							if (review[0].subject === '여행리뷰') {
								document.location.href = `/tripreview/${id}`;
							} else {
								document.location.href = `/community/${id}`;
							}
						});
				} catch (error) {
					navigate('/error');
				}
			}
		});
	};

	const handleEdit = (answerId: number) => {
		setClickedId(answerId);
		setEdit(!edit);
	};

	const handleLike = (answerId: number) => {
		setClickedId(answerId);
		setIsLike(!isLike);

		try {
			Api.patch(`posts/${id}/comments/${answerId}/vote/${userInfos.id}`, {})
				.then(() => Api.get(`/posts/${id}/comments`))
				.then((res) => setAnswers(res.data));
		} catch (error) {
			navigate('/error');
		}
	};

	const handleDisLike = (answerId: number) => {
		setClickedId(answerId);
		setIsLike(!isLike);

		const clickedAnswer = answers.find((q) => q.postId === answerId);

		if (clickedAnswer) {
			try {
				Api.patch(`posts/${id}/comments/${answerId}/vote/${userInfos.id}`, {})
					.then(() => Api.get(`/posts/${id}/comments`))
					.then((res) => setAnswers(res.data));
			} catch (error) {
				navigate('/error');
			}
		}
	};

	useEffect(() => {
		if (answerData.response) {
			setAnswers(answerData.response);
			setLenght(answerData.response);
		}

		if (postData.response) {
			setReview([postData.response]);
		}
	}, [answerData.response, postData.response]);

	return (
		<Container>
			<AnswerInput
				placeholder="댓글을 남겨주세요"
				onChange={(e) => handleInput(e)}
				onKeyPress={(e) => {
					if (e.key === 'Enter') {
						handleSubmit();
					}
				}}
			/>

			{answers &&
				answers.map((el, idx) => (
					<Answer>
						<ContentContainer>
							<Vote>
								{isLike && clickedId === el.commentId ? (
									<AiFillHeart
										size={18}
										onClick={() => handleDisLike(el.commentId)}
										color="#fe6464"
									/>
								) : (
									<AiOutlineHeart
										size={18}
										onClick={() => handleLike(el.commentId)}
									/>
								)}

								<span>{el.voteCount}</span>
							</Vote>
							<div />
							<div>
								<div>{el.nickName}</div>

								<div>
									{edit && clickedId === el.commentId ? (
										<AnswerInput
											placeholder="댓글을 남겨주세요"
											onChange={(e) => handleInput(e)}
											onKeyDown={(e) => handleUpdate(e, el.commentId)}
											defaultValue={el.content}
										/>
									) : (
										<span>{el.content}</span>
									)}

									{el.nickName === userInfos.nickname ? (
										<div>
											<BsPencilSquare
												size={14}
												onClick={() => handleEdit(el.commentId)}
											/>
											<BsTrash
												size={14}
												onClick={() => handleDelete(el.commentId)}
											/>
										</div>
									) : null}
								</div>
							</div>
						</ContentContainer>
					</Answer>
				))}
		</Container>
	);
}

export default Answers;
