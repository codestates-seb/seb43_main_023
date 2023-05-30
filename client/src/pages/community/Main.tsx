import '../../Global.css';

import { useEffect, useState } from 'react';

import { AiFillHeart } from 'react-icons/ai';
import { FiChevronRight } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import * as style from '../../Components/community/CommunityStyle';
import Pagination from '../../Components/community/Pagination';
import SideBar from '../../Components/community/SideBar';
import Tags from '../../Components/community/Tags';
import useGet from '../../hooks/useGet';
import { RootState } from '../../store/Store';
import { Ilogin } from '../../type/Ilogin';
import { Ipost } from '../../type/Ipost';
import HamburgerMenu from '../../Components/community/HamburgerMenu';
import ToastAlert from '../../utils/ToastAlert';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
// eslint-disable-next-line import/order
import { Viewer } from '@toast-ui/react-editor';

function Main() {
	// eslint-disable-next-line prefer-const
	const [posts, setPosts] = useState<Ipost[]>([]);
	const [curPage, setCurPage] = useState<number>(1);

	const startIdx = (curPage - 1) * 8;
	const endIdx = startIdx + 8;

	const navigate = useNavigate();
	const login = useSelector((state: RootState) => state.login) as Ilogin;

	const handleBtn = () => {
		if (login.isLogin) {
			navigate('/community/create');
		} else {
			ToastAlert('로그인 상태가 아닙니다');
		}
	};

	const response = useGet(`?size=8&subject=여행고민&page=1`);

	useEffect(() => {
		if (response) {
			setPosts(response);
		}
	}, [response]);

	return (
		<div className="main">
			<style.Explain>
				<div>
					<h1>커뮤니티</h1>
					<div>
						<p>
							나와 같은 MBTI를 가진 사람들은 어떤 여행을 갔는지 궁금한가요?{' '}
							<br />
							여행메이트가 없으세요? MBTI과몰입러라구요? 여러 잡담을 나누고
							싶나요?
							<br />
							커뮤니티 각 탭을 누르며 둘러보세요!
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

export default Main;
