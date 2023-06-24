import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IoIosArrowForward } from 'react-icons/io';
import styled from 'styled-components';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
// eslint-disable-next-line import/order
import { Viewer } from '@toast-ui/react-editor';
import { RootState } from '../../store/Store';
import { IKeyword } from '../../reducers/searchKeywordReducer';
import { Ipost } from '../../type/Ipost';
import useGet from '../../hooks/useGet';
import Pagination from '../community/Pagination';

const SearchResult = styled.div`
	margin-top: 30px;
	width: 90%;
	border-radius: 15px;
	padding: 20px;
	display: flex;
	flex-direction: column;
	font-size: 24px;
	font-weight: 700;
	.keyword {
		color: #0db4f3;
	}

	> div {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		.all {
			font-size: 14px;
			margin-right: 20px;
			color: gray;
		}
	}
`;

const ResultContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const ResultItem = styled.div`
	width: 98%;
	height: 190px;
	border: 1px solid #d9d9d9;
	border-radius: 15px;
	padding: 15px;
	margin: 15px 0;
	display: flex;
	cursor: pointer;
`;

const ResultText = styled.div`
	width: 80%;
	display: flex;
	flex-direction: column;
	.subject {
		margin-right: 20px;
	}
	.content {
		padding: 10px 30px;
		height: 120px;
		font-size: 15px;
		line-height: 23px;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.author {
		text-align: end;
		font-size: 17px;
	}
`;

const ResultImg = styled.img`
	width: 20%;
	border-radius: 15px;
	margin-left: 20px;
`;

const NotResult = styled.div`
	margin: 80px 0;
	line-height: 40px;

	> div:nth-child(4) {
		font-size: 20px;
		display: flex;
		justify-content: flex-end;
		text-decoration: underline;
		align-items: center;

		&:hover {
			color: #0db4f3;
		}
	}

	.keyword {
		color: #0db4f3;
	}
`;

const CreateBtn = styled.div`
	cursor: pointer;
`;

const ViewerContainer = styled.div`
	padding: 10px;
	min-height: 120px;
	max-height: 120px;
	font-size: 15px;
	line-height: 23px;
	overflow: hidden;
	text-overflow: ellipsis;
`;

function PostResult() {
	const keyword = useSelector((state: RootState) => state.search) as IKeyword;
	const [curPage, setCurPage] = useState<number>(1);
	const [menu, setMenu] = useState<string>('전체');
	const [posts, setPosts] = useState<Ipost[]>([]);

	const containKeywordInInput = posts.filter(
		(el) =>
			el.title.includes(keyword.keyword) ||
			el.content.includes(keyword.keyword),
	);

	const containtKeywordInTag = posts
		.filter((el) => el.tag)
		.filter((el) => el.tag.includes(keyword.keyword));

	const containKeywordInPost =
		containKeywordInInput.concat(containtKeywordInTag);

	const startIdx = (curPage - 1) * 5;
	const endIdx = startIdx + 5;

	const response = useGet('?size=100');

	const handleViewAllPost = () => {
		setMenu('게시글');
	};

	const handlePostClick = (subject: string, id: number) => {
		if (subject === '여행리뷰') {
			document.location.href = `/tripreview/${id}`;
		} else {
			document.location.href = `/community/${id}`;
		}
	};

	const handleCreate = () => {
		document.location.href = '/community/create';
	};

	const checkBatchimEnding = (word: string) => {
		if (typeof word !== 'string') return null;

		const lastLetter = word[word.length - 1];
		const uni = lastLetter.charCodeAt(0);

		if (uni < 44032 || uni > 55203) return null;

		return (uni - 44032) % 28 !== 0;
	};

	useEffect(() => {
		if (response) {
			setPosts(response);
		}
	}, [response]);

	return (
		<SearchResult>
			<div className="title">
				<div>
					<span className="keyword">{keyword.keyword}</span>
					{checkBatchimEnding(keyword.keyword) ? '이' : '가'} 포함된 게시글 💭
				</div>
				<span className="all">
					{menu === '게시글' || containKeywordInPost.length === 0 ? null : (
						<button onClick={handleViewAllPost}>전체보기</button>
					)}
				</span>
			</div>
			{menu === '전체' ? (
				<ResultContainer>
					{containKeywordInInput.length > 0 ? (
						containKeywordInInput.slice(0, 2).map((post) => (
							<ResultItem
								onClick={() => handlePostClick(post.subject, post.postId)}
							>
								<ResultText>
									<div className="resultInfo">
										<span className="subject">[{post.subject}]</span>
										<span className="title">{post.title}</span>
									</div>
									<ViewerContainer>
										<Viewer initialValue={post.content} />
									</ViewerContainer>
									<span className="author">{post.member.nickname}</span>
								</ResultText>
								{post.image.length > 0 && (
									<ResultImg src={post.image[0]} alt="검색결과 사진 미리보기" />
								)}
							</ResultItem>
						))
					) : (
						<NotResult>
							<div>아직 작성된 게시글이 없어요 </div>
							<div>
								<span className="keyword">{keyword.keyword}</span> 이곳을
								여행하셨거나 여러 도움이 필요하다면, 새로운 글을 작성하러
								가볼까요 ?{' '}
							</div>
							<div>다른 사람들에게 도움이 될지 몰라요 ☺️</div>

							<CreateBtn onClick={handleCreate}>
								작성하러가기 <IoIosArrowForward />{' '}
							</CreateBtn>
						</NotResult>
					)}
				</ResultContainer>
			) : (
				<ResultContainer>
					{containKeywordInInput.length > 0 ? (
						containKeywordInInput.slice(startIdx, endIdx).map((post) => (
							<ResultItem
								onClick={() => handlePostClick(post.subject, post.postId)}
							>
								<ResultText>
									<div className="resultInfo">
										<span className="subject">[{post.subject}]</span>
										<span className="title">{post.title}</span>
									</div>
									<ViewerContainer>
										<Viewer initialValue={post.content} />
									</ViewerContainer>
									<span className="author">{post.member.nickname}</span>
								</ResultText>
								{post.image.length > 0 && (
									<ResultImg src={post.image[0]} alt="검색결과 사진 미리보기" />
								)}
							</ResultItem>
						))
					) : (
						<NotResult>
							<div>아직 작성된 게시글이 없어요 </div>
							<div>
								<span className="keyword">{keyword.keyword}</span> 이곳을
								여행하셨거나 여러 도움이 필요하다면, 새로운 글을 작성하러
								가볼까요 ?{' '}
							</div>
							<div>다른 사람들에게도 도움이 될지 몰라요 ☺️</div>

							<CreateBtn onClick={handleCreate}>
								작성하러가기 <IoIosArrowForward />{' '}
							</CreateBtn>
						</NotResult>
					)}

					{containKeywordInInput.length > 0 && (
						<Pagination
							curPage={curPage}
							setCurPage={setCurPage}
							totalPage={Math.ceil(containKeywordInInput.length / 5)}
							totalCount={containKeywordInInput.length}
							size={5}
							pageCount={5}
						/>
					)}
				</ResultContainer>
			)}
		</SearchResult>
	);
}

export default PostResult;
