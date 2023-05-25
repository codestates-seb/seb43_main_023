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

function MBTI() {
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

	const response = useGet('?size=100&subject=MBTI&page=1');

	useEffect(() => {
		if (response) {
			setPosts(response);
		}
	}, [response]);

	return (
		<div className="main">
			<style.Explain>
				<div>
					<h1>MBTI</h1>
					<div>
						<p>
							MBTI 과몰입러를 위한 공간 ! <br />
							자유롭게 나와 비슷한 성향을 가진 사람과 대화를 나눠보세요
							<br />
							또는 나와 다른 성향을 가진 사람에게 궁금한걸 물어보세요 !
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

												{el.content!.length > 70 ? (
													<p>
														{`${el
															.content!.substring(0, 175)
															.substring(0, el.content!.lastIndexOf(' '))
															.trim()}...`}
													</p>
												) : (
													<p>{el.content}</p>
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

export default MBTI;
