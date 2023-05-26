import '../../Global.css';

import { useEffect, useState } from 'react';

import { AiFillHeart } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';

import { FiChevronRight } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import Pagination from '../../Components/community/Pagination';
import SideBar from '../../Components/community/SideBar';
import Tags from '../../Components/community/Tags';
import { Ipost } from '../../type/Ipost';

import * as style from '../../Components/community/CommunityStyle';
import { RootState } from '../../store/Store';
import { Ilogin } from '../../type/Ilogin';
import useGet from '../../hooks/useGet';

import HamburgerMenu from '../../Components/community/HamburgerMenu';
import ToastAlert from '../../utils/ToastAlert';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
// eslint-disable-next-line import/order
import { Viewer } from '@toast-ui/react-editor';

function EtcTalk() {
	// eslint-disable-next-line prefer-const
	const [posts, setPosts] = useState<Ipost[]>([]);
	const [curPage, setCurPage] = useState<number>(1);

	const navigate = useNavigate();
	const login = useSelector((state: RootState) => state.login) as Ilogin;

	const handleBtn = () => {
		if (login.isLogin) {
			navigate('/community/create');
		} else {
			ToastAlert('로그인 상태가 아닙니다');
		}
	};

	const response = useGet('?size=100&subject=잡담&page=1');

	const startIdx = (curPage - 1) * 8;
	const endIdx = startIdx + 8;

	useEffect(() => {
		if (response) {
			setPosts(response);
		}
	}, [response]);

	return (
		<div className="main">
			<style.Explain>
				<div>
					<h1>잡담</h1>
					<div>
						<p>
							여행과 MBTI 관련 외 여러 대화를 나누고 싶다면 ? <br />
							이 공간에서 여러 사람들과 자유롭게 대화를 나눠보세요
							<br />
							타인에게 예민하거나 안전하지 않은 내용은 지양해주세요
						</p>
						<button onClick={handleBtn}>
							<span>
								작성하러 가기{' '}
								<p className="arrow">
									<FiChevronRight />
								</p>
							</span>
						</button>
						<HamburgerMenu />
					</div>
				</div>
			</style.Explain>
			<style.Container>
				<SideBar />
				<div>
					<style.Body>
						{posts &&
							posts.slice(startIdx, endIdx).map((el) => (
								<Link to={`/community/${el.postId}`}>
									<style.Contentbody>
										<div>
											<style.Header>
												<div>
													<h3>{`[${el.subject}]`}</h3>
													<h3>{el.title}</h3>
												</div>

												{el.content?.length > 70 ? (
													<style.ViewerContainer>
														<Viewer
															initialValue={`${el.content
																?.substring(0, 175)
																.substring(0, el.content!.lastIndexOf(' '))
																.trim()}...`}
														/>
													</style.ViewerContainer>
												) : (
													<style.ViewerContainer>
														<Viewer initialValue={el.content} />
													</style.ViewerContainer>
												)}
											</style.Header>
											<style.Info img={el.member.img || ''}>
												<div className="img" />
												<div>{el.member.nickname}</div>
												<div>{el.postCreatedAt.slice(0, 10)}</div>
												<div>조회 {el.viewCount}</div>
												<div>
													<AiFillHeart color="#fe6464" />
													<p> {el.voteCount}</p>
												</div>
											</style.Info>
										</div>

										{el.image[0] ? (
											<img src={el.image[0]} alt="게시글 사진 미리보기" />
										) : null}
									</style.Contentbody>
								</Link>
							))}
					</style.Body>
					<style.PaginationContainer>
						{posts.length > 0 ? (
							<Pagination
								curPage={curPage}
								setCurPage={setCurPage}
								totalPage={Math.ceil(posts.length / 8)}
								totalCount={posts.length}
								size={8}
								pageCount={5}
							/>
						) : null}
					</style.PaginationContainer>
				</div>
				<style.TagContainer>
					<Tags />
				</style.TagContainer>
			</style.Container>
		</div>
	);
}

export default EtcTalk;
