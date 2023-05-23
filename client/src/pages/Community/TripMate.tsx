import '../../Global.css';

import { useEffect, useState } from 'react';

import { AiFillHeart } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Swal from 'sweetalert2';
import { FiChevronRight } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { GiHamburgerMenu } from 'react-icons/gi';
import Pagination from '../../Components/community/Pagination';
import SideBar from '../../Components/community/SideBar';
import Tags from '../../Components/community/Tags';
import { RootState } from '../../store/Store';
import { Ilogin } from '../../type/Ilogin';
import useGet from '../../hooks/useGet';

const HamburgerMenu = styled.div`
	margin-right: 20px;
	@media (max-width: 580px) {
		display: block; /* 햄버거 메뉴 보이게 설정 */
	}

	@media (min-width: 581px) {
		display: none; /* 햄버거 메뉴 숨김 설정 */
	}
`;

const HamburgerIcon = styled.div``;

const MenuItems = styled.ul`
	height: 100%;
	width: 70%;
	position: fixed;
	top: 0;
	right: 0;
	padding-top: 60px;
	background-color: #fafafa;
	transition: 0.3s;
	z-index: 500;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 20px;
	justify-content: space-around;
`;

const MenuItem = styled.li`
	width: 100%;
	padding: 10px;
	display: flex;
	justify-content: center;

	&:hover {
		background-color: #e1e1e1;
		color: #0db4f3;
	}

	&::after {
		background-color: #0db4f3;
		color: #0db4f3;
	}
	a {
		color: inherit;
		text-decoration: none;
	}
`;

const Explain = styled.div`
	position: fixed;
	top: 0;
	width: 98%;
	background-color: #fafafa;
	margin-top: 75px;
	height: 140px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-left: 20px;
	margin-bottom: 40px;
	padding: 30px;
	line-height: 1.5rem;
	@media (max-width: 580px) {
		padding: 10px 10px;
		margin-bottom: 5px;
		width: 93%;
		margin-top: 55px;
		padding-bottom: 0px;
	}

	> div {
		height: inherit;
		> h1 {
			margin-top: 20px;
			margin-bottom: 10px;
		}

		> div {
			color: #595959;
			font-size: 14px;
			padding-bottom: 10px;
			border-bottom: 1px solid rgb(214, 217, 219);
			display: flex;
			justify-content: space-between;
			align-items: end;

			> p {
				@media (max-width: 768px) {
					flex-direction: column;
					align-items: flex-start;
				}

				@media (max-width: 580px) {
					display: none;
					padding-bottom: 0;
					margin-bottom: 0;
				}
			}

			> button {
				padding-bottom: 10px;
				margin-right: 20px;

				@media (max-width: 768px) {
					margin-top: 10px;
					padding-bottom: 0px;
				}

				@media (max-width: 580px) {
					padding-bottom: 0px;
				}

				> span {
					margin-right: 5px;
					display: flex;
					align-items: center;

					> p {
						display: flex;
						align-items: center;
					}
				}

				&:hover {
					color: #0db4f3;

					.arrow {
						transform: translateX(4px);
						transition: transform 0.3s ease-in-out;
					}
				}
			}
		}
	}
`;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5); /* 검은색 배경 투명도 조절 */
	z-index: 300; /* 메뉴보다 낮은 숫자로 설정하여 메뉴 위에 표시 */
`;

const TripMateContainer = styled.div`
	margin-top: 240px;
	height: 1000px;
	display: flex;

	@media (max-width: 580px) {
		margin-top: 170px;
		width: 93%;
	}

	a {
		text-decoration: none;
		color: black;
	}
`;

const TripMateBody = styled.div`
	height: calc(100vh - 260px);
	width: calc(100vw - 400px);
	margin-right: 30px;
	height: fit-content;

	@media (max-width: 768px) {
		width: calc(100vw - 160px);
		margin-right: 0px;
		margin-left: 30px;
	}

	@media (max-width: 580px) {
		width: calc(100vw - 50px);
		margin-right: 0px;
		margin-left: 28px;
	}

	@media (max-width: 480px) {
		width: calc(100vw - 45px);
		margin-right: 0px;
		margin-left: 28px;
	}
`;

const Contentbody = styled.div`
	justify-content: space-between;
	display: flex;
	padding-top: 10px;
	padding-bottom: 10px;
	font-weight: 350;
	font-size: 13px;
	border-bottom: 1px solid rgb(214, 217, 219);

	@media (max-width: 768px) {
		width: 100%;
	}

	&:hover {
		color: #0db4f3;
	}

	> div:nth-child(1) {
		flex-wrap: wrap;
		display: flex;
		flex-direction: column;
		margin-right: 20px;
		width: 100%;
		margin-left: 8px;
	}

	> img {
		// 사진 부분
		width: 150px;
		height: 100px;
		max-width: 100%;
		display: flex;
		justify-content: center;
		object-fit: cover;
	}
`;

const Header = styled.div`
	padding: 5px;

	> div {
		display: flex;
		-webkit-text-stroke: 0.4px black;
		font-size: 15px;
		> h3:nth-child(1) {
			margin-right: 10px;
		}
	}

	> p {
		padding: 10px 0;
		max-height: 50px;
		overflow: hidden;
		-webkit-text-stroke: 0.1px black;

		@media (max-width: 768px) {
			flex-direction: column;
			align-items: flex-start;
		}
	}
`;

const Info = styled.div`
	display: flex;
	padding: 5px;

	div {
		margin-right: 15px;
	}

	> div:nth-child(2) {
		@media (max-width: 768px) {
			display: none;
		}
	}

	> div:nth-child(3) {
		@media (max-width: 768px) {
			display: none;
		}
	}

	> div:nth-child(4) {
		width: 30px;
		display: flex;
		justify-content: flex-start;
		align-items: center;

		> p {
			margin-left: 5px;
		}
	}
`;

const TagContainer = styled.div`
	height: 100%;
	margin-top: 55px;
	width: 230px;
	margin-right: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	@media (max-width: 768px) {
		display: none;
	}

	> div:last-child {
		display: flex;
		justify-content: center;
		align-items: center;

		@media (max-width: 768px) {
			display: none;
		}
	}
`;

const PaginationContainer = styled.div`
	margin-top: 10px;
	height: 32px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
`;

function TripMate() {
	interface Post {
		id: number;
		subject: string;
		title: string;
		nickName: string;
		voteCount: number;
		createdAt: string;
		content: string;
		img: string[];
	}
	// eslint-disable-next-line prefer-const
	let [posts, setPosts] = useState<Post[]>([]);
	const [curPage, setCurPage] = useState<number>(1);
	const [isOpen, setIsOpen] = useState(false);

	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

	const startIdx = (curPage - 1) * 8;
	const endIdx = startIdx + 8;

	const response = useGet('/');

	const navigate = useNavigate();
	const login = useSelector((state: RootState) => state.login) as Ilogin;

	const handleBtn = () => {
		const Toast = Swal.mixin({
			toast: true,
			position: 'top',
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
			didOpen: (toast: {
				addEventListener: (arg0: string, arg1: any) => void;
			}) => {
				toast.addEventListener('mouseenter', Swal.stopTimer);
				toast.addEventListener('mouseleave', Swal.resumeTimer);
			},
		});

		if (login.isLogin) {
			navigate('/community/create');
		} else {
			Toast.fire({
				icon: 'warning',
				title: '로그인 상태가 아닙니다',
			});
		}
	};

	useEffect(() => {
		if (response) {
			setPosts(response);
		}
	}, [response]);

	posts = posts.filter((el) => el.subject === '같이가요');

	return (
		<div className="main">
			<Explain>
				<div>
					<h1>같이가요</h1>
					<div>
						<p>
							혼자이고 싶지만 여행은 혼자이기 싫으신가요 ? <br />
							여행계획이 취소되어 못가게 됐는데 아쉬우신가요 ?
							<br />
							안전하게 나와 비슷한 성향을 가진 사람과 함께 여행해보세요 ! 새로운
							여행의 매력을 느낄지도 몰라요
						</p>
						<button onClick={handleBtn}>
							<span>
								작성하러 가기{' '}
								<p className="arrow">
									<FiChevronRight />
								</p>
							</span>
						</button>
						<HamburgerMenu>
							<HamburgerIcon onClick={handleToggle}>
								<GiHamburgerMenu />
							</HamburgerIcon>
							{isOpen && (
								<>
									<Overlay onClick={handleToggle} />
									<MenuItems>
										<MenuItem>
											<Link to="/tripreview">여행리뷰 </Link>
										</MenuItem>
										<MenuItem>
											<Link to="/tripreview">여행고민 </Link>
										</MenuItem>
										<MenuItem>
											<Link to="/tripreview">같이가요 </Link>
										</MenuItem>
										<MenuItem>
											<Link to="/tripreview">MBTI </Link>
										</MenuItem>
										<MenuItem>
											<Link to="/tripreview">잡담</Link>
										</MenuItem>
									</MenuItems>
								</>
							)}
						</HamburgerMenu>
					</div>
				</div>
			</Explain>
			<TripMateContainer>
				<SideBar />

				<div>
					<TripMateBody>
						{posts &&
							posts.slice(startIdx, endIdx).map((el) => (
								<Link to={`/community/${el.id}`}>
									<Contentbody>
										<div>
											<Header>
												<div>
													<h3>{`[${el.subject}]`}</h3>
													<h3>{el.title}</h3>
												</div>

												{el.content.length > 70 ? (
													<p>
														{`${el.content
															.substring(0, 175)
															.substring(0, el.content.lastIndexOf(' '))
															.trim()}...`}
													</p>
												) : (
													<p>{el.content}</p>
												)}
											</Header>
											<Info>
												<div>{el.nickName}</div>
												<div>16:15</div>
												<div>조회 20</div>
												<div>
													<AiFillHeart color="#fe6464" />
													<p> {el.voteCount}</p>
												</div>
											</Info>
										</div>

										{el.img[0] ? (
											<img src={el.img[0]} alt="게시글 사진 미리보기" />
										) : null}
									</Contentbody>
								</Link>
							))}
					</TripMateBody>

					<PaginationContainer>
						<Pagination
							curPage={curPage}
							setCurPage={setCurPage}
							totalPage={Math.ceil(posts.length / 8)}
							totalCount={posts.length}
							size={8}
							pageCount={5}
						/>
					</PaginationContainer>
				</div>
				<TagContainer>
					<Tags />
				</TagContainer>
			</TripMateContainer>
		</div>
	);
}

export default TripMate;
