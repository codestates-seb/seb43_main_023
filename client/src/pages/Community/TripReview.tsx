import styled from 'styled-components';
// eslint-disable-next-line import/order
import SideBar from '../../Components/community/SideBar';
// eslint-disable-next-line import/order
import Reviews from '../../Components/community/Reviews';
import '../../Global.css';
// eslint-disable-next-line import/order
import Swal from 'sweetalert2';
// eslint-disable-next-line import/order
import { FiChevronRight } from 'react-icons/fi';

// eslint-disable-next-line import/order
import { useSelector } from 'react-redux';
// eslint-disable-next-line import/order
import { Link, useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/order
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import Tags from '../../Components/community/Tags';
import { Ilogin } from '../../type/Ilogin';
import { RootState } from '../../store/Store';

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

	@media (max-width: 480px) {
		height: 102px;
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

const ReviewContainer = styled.div`
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

const ReviewBody = styled.div`
	width: calc(100vw - 250px);
	margin-right: 30px;
	height: fit-content;

	@media (max-width: 1120px) {
		width: calc(100vw - 170px);
	}

	@media (max-width: 940px) {
		width: calc(100vw - 200px);
	}

	@media (max-width: 768px) {
		width: calc(100vw - 160px);
	}

	@media (max-width: 580px) {
		width: 100vh;
		margin-right: 0px;
	}

	@media (max-width: 480px) {
		width: 100vh;
		margin-right: 0px;
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

	@media (max-width: 1120px) {
		display: none;
	}

	> div:last-child {
		display: flex;
		justify-content: center;
		align-items: center;

		@media (max-width: 940px) {
			display: none;
		}
	}
`;

function TripReview() {
	const navigate = useNavigate();
	const login = useSelector((state: RootState) => state.login) as Ilogin;

	const [isOpen, setIsOpen] = useState(false);

	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

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
	return (
		<div className="main">
			<Explain>
				<div>
					<h1>여행리뷰</h1>
					<div>
						<p>
							행복은 나누면 두배 ! <br />
							내 여행도 기록하고, 다른 사람들의 여행 기록을 살펴보세요
							<br />
							여러 기록들을 살펴보며 나에게 꼭 맞는 여행지를 발견할지도 몰라요
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
			<ReviewContainer>
				<SideBar />
				<ReviewBody>
					<Reviews />
				</ReviewBody>

				<TagContainer>
					<Tags />
				</TagContainer>
			</ReviewContainer>
		</div>
	);
}

export default TripReview;
