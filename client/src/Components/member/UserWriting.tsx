import '../../Global.css';

import { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Api } from '../../apis/customAPI';
import NoContent from './NoContent';
import useGet from '../../hooks/useGet';
import { UPDATE } from '../../reducers/userInfoReducer';
import { RootState } from '../../store/Store';
import { Iposts } from '../../type/Ipost';
import { Iuser } from '../../type/Iuser';
import { SweetAlert1 } from '../../utils/SweetAlert';

const Main = styled.div`
	width: 100%;
	min-height: 28vh;
	li {
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding-bottom: 20px;
		margin-bottom: 20px;
		font-weight: bold;
		color: #2d2d2d;
		font-size: 13px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}
	.writingBody {
		width: 300px;
		color: #2d2d2d;
		&:hover {
			cursor: pointer;
			color: #0db4f3;
		}
		@media (max-width: 470px) {
			width: 150px;
		}
		@media (max-width: 330px) {
			width: 100px;
		}
	}
	button {
		margin: 0px 10px;
		font-size: 12px;
		color: rgba(0, 0, 0, 0.2);
		&:hover {
			cursor: pointer;
			color: #0db4f3;
		}
	}
`;

export default function UserWriting() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userInfos = useSelector((state: RootState) => state.user) as Iuser;

	// 마이페이지의 내가 쓴 글(get요청 시 필요)
	const [posts, setPosts] = useState<Iposts>([
		{
			postId: 0,
			subject: '',
			title: '',
			content: '',
			tag: [],
			voteCount: 0,
			viewCount: 0,
			postCreatedAt: '',
			postModifiedAt: '',
			image: [],
			member: {
				email: '',
			},
		},
	]);

	// 커뮤니티 내글 get요청(useAxios 사용)
	const response = useGet(`?size=100&date=6m`);

	useEffect(() => {
		if (response !== null) {
			setPosts(response);
		}
	}, [response]);

	// 내가 쓴 글 filter -> useMemo hook 사용
	const filteredPosts = useMemo(
		() => posts.filter((post) => post.member.email === userInfos.email),
		[posts, userInfos.email],
	);

	// 마이페이지 내가 쓴 글 삭제 핸들러 +
	// 초보여행자 뱃지가 있고, 삭제 후 글이 5개 미만이 되는 경우 -> 뱃지 null로 업데이트
	const postDeleteClick = async (id: number) => {
		const sweetAlert1 = await SweetAlert1(
			'삭제',
			'글을 삭제하시겠습니까?',
			'삭제',
			'취소',
		);
		if (sweetAlert1.isConfirmed) {
			try {
				await Api.delete(`/posts/${id}/${userInfos.id}`);
				if (userInfos.badge !== null && posts.length <= 5) {
					Api.patch(`/members/${userInfos.id}`, {
						nickname: userInfos.nickname,
						mbti: userInfos.mbti,
						img: userInfos.img,
						badge: null,
					});
					dispatch(
						UPDATE({
							nickname: userInfos.nickname,
							mbti: userInfos.mbti,
							img: userInfos.img,
							badge: null,
						}),
					);
				}
				window.location.reload();
			} catch (error) {
				navigate('/error');
			}
		} else {
			navigate('/mypage');
		}
	};

	return (
		<Main>
			<ul>
				{filteredPosts.length > 0 ? (
					filteredPosts.map((post) => {
						return (
							<li key={post.postId}>
								<div className="writingHead">[{post.subject}]</div>
								<Link
									to={{ pathname: `/community/${post.postId}` }}
									style={{ textDecoration: 'none' }}
								>
									<div className="writingBody">{post.title}</div>
								</Link>
								<div>
									<Link
										to={{
											pathname: `/community/${post.postId}/update`,
										}}
										style={{ textDecoration: 'none' }}
									>
										<button>Edit</button>
									</Link>
									<button onClick={() => postDeleteClick(post.postId)}>
										Delete
									</button>
								</div>
							</li>
						);
					})
				) : (
					<NoContent />
				)}
			</ul>
		</Main>
	);
}
