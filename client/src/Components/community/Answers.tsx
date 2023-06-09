import { ChangeEvent, useEffect, useState } from 'react';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Api } from '../../apis/customAPI';
import useAxios from '../../hooks/useAxios';
import { RootState } from '../../store/Store';
import { Ianswer } from '../../type/Ianswer';
import { Ipost } from '../../type/Ipost';
import { Imembers, Iuser } from '../../type/Iuser';
import { SweetAlert1, SweetAlert2 } from '../../utils/SweetAlert';
import { Ilogin } from '../../type/Ilogin';
import ToastAlert from '../../utils/ToastAlert';
import useGet from '../../hooks/useGet';

interface activeT {
	img: string;
}

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

const ContentContainer = styled.div<activeT>`
	margin-top: 15px;
	width: 100%;
	display: flex;
	align-items: center;
	padding: 10px;

	.img {
		${(props) =>
			props.img &&
			css`
				width: 55px;
				height: 46px;
				background-image: url(${props.img});
				background-size: 105% 127%;
				margin-right: 10px;
				border-radius: 100%;
			`}
	}

	> div:nth-child(3) {
		width: 100%;
		margin-left: 3px;

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

function Answers() {
	const navigate = useNavigate();
	const { id } = useParams();

	const [isLike, setIsLike] = useState<boolean>(false);
	const [text, setText] = useState<string>('');
	const [edit, setEdit] = useState<boolean>(false);
	const [clickedId, setClickedId] = useState<number | null>(null);
	const [review, setReview] = useState<Ipost[]>([]);
	const [members, setMembers] = useState<Imembers>([
		{
			nickname: '',
			img: '',
		},
	]);

	// eslint-disable-next-line prefer-const
	const [answers, setAnswers] = useState<Ianswer[]>([]);

	const userInfos = useSelector((state: RootState) => state.user) as Iuser;
	const login = useSelector((state: RootState) => state.login) as Ilogin;

	const postData = useGet(`/${id}`);

	const answerData = useAxios({
		method: 'get',
		url: `/comments/${id}`,
	});

	const membersData = useAxios({
		method: 'get',
		url: `/members`,
	});

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
	};

	const handleSubmit = () => {
		if (login.isLogin) {
			try {
				Api.post('/comments', {
					content: text,
					memberId: userInfos.id,
					postId: id,
					nickname: userInfos.nickname,
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
		} else {
			ToastAlert('로그인 상태가 아닙니다');
		}
	};

	const handleUpdate = (e: { key: string }, answerId: number) => {
		if (e.key === 'Enter') {
			try {
				Api.patch(`comments/${answerId}`, {
					content: text,
					memberId: userInfos.id,
					postId: id,
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
		}
	};

	const handleDelete = async (answerId: number) => {
		const sweetAlert1 = await SweetAlert1(
			'정말로 삭제하시겠습니까 ?',
			'다신 되돌릴 수 없습니다',
			'Delete',
			'Cancle',
		);
		if (sweetAlert1.isConfirmed) {
			try {
				Api.delete(`comments/${answerId}`).then(async () => {
					const sweetAlert2 = await SweetAlert2('Deleted!', '삭제되었습니다');
					if (sweetAlert2.isConfirmed) {
						if (review[0].subject === '여행리뷰') {
							document.location.href = `/tripreview/${id}`;
						} else {
							document.location.href = `/community/${id}`;
						}
					}
				});
			} catch (error) {
				navigate('/error');
			}
		}
	};

	const handleEdit = (answerId: number) => {
		setClickedId(answerId);
		setEdit(!edit);
	};

	const handleLike = (answerId: number, author: string) => {
		if (author === userInfos.nickname) {
			ToastAlert('자신의 댓글은 좋아요가 불가능해요');
		} else {
			setClickedId(answerId);
			setIsLike(true);

			try {
				Api.patch(`comments/${answerId}/vote/${userInfos.id}`, {})
					.then(() => Api.get(`/comments/${id}`))
					.then((res) => setAnswers(res.data));
			} catch (error) {
				navigate('/error');
			}
		}
	};

	const handleDisLike = (answerId: number) => {
		setClickedId(answerId);
		setIsLike(false);

		const clickedAnswer = answers.find((q) => q.commentId === answerId);

		if (clickedAnswer) {
			try {
				Api.patch(`comments/${answerId}/vote/${userInfos.id}`, {})
					.then(() => Api.get(`/comments/${id}`))
					.then((res) => setAnswers(res.data));
				// document.location.reload();
			} catch (error) {
				navigate('/error');
			}
		}
	};

	useEffect(() => {
		if (answerData.response) {
			setAnswers(answerData.response);
		}

		if (postData) {
			setReview([postData]);
		}

		if (membersData.response) {
			setMembers(membersData.response);
		}
	}, [answerData.response, membersData.response, postData]);

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
				answers
					.filter((el) => el.postId === Number(id))
					.sort(
						(a: { commentId: number }, b: { commentId: number }) =>
							b.commentId - a.commentId,
					)
					.map((el, idx) => (
						<Answer>
							<ContentContainer
								img={
									members.filter((member) => member.nickname === el.nickname)[0]
										?.img || ''
								}
							>
								<Vote>
									{(isLike && clickedId === el.commentId) ||
									el.voteList?.includes(userInfos.id!) ? (
										<AiFillHeart
											size={18}
											onClick={() => handleDisLike(el.commentId)}
											color="#fe6464"
										/>
									) : (
										<AiOutlineHeart
											size={18}
											onClick={() => handleLike(el.commentId, el.nickname)}
										/>
									)}

									<span>{el.voteCount}</span>
								</Vote>

								{}

								<div className="img" />
								<div>
									<div>{el.nickname}</div>

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

										{el.nickname === userInfos.nickname ? (
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
