import styled from 'styled-components';
import SideBar from '../../Components/community/SideBar';
import Reviews from '../../Components/community/Reviews';
import Tags from '../../Components/community/Tags';
import '../../Global.css';
// eslint-disable-next-line import/order
import Swal from 'sweetalert2';
// eslint-disable-next-line import/order
import { FiChevronRight } from 'react-icons/fi';

import { RootState } from '../../store/Store';
import { Ilogin } from '../../type/Ilogin';
// eslint-disable-next-line import/order
import { useSelector } from 'react-redux';
// eslint-disable-next-line import/order
import { useNavigate } from 'react-router-dom';

const Explain = styled.div`
	margin-top: 85px;
	height: 130px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-left: 20px;
	margin-bottom: 40px;
	padding: 30px;
	line-height: 1.5rem;

	> div {
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

			> button {
				padding-bottom: 10px;
				margin-right: 20px;

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
const ReviewContainer = styled.div`
	height: 1000px;
	display: flex;
`;

const ReviewBody = styled.div`
	width: calc(100vw - 230px);
	height: inherit;
`;

const TagContainer = styled.div`
	height: 100%;
	margin-top: 55px;
	width: 230px;
	margin-right: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	> div:last-child {
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

function TripReview() {
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
	return (
		<div className="main">
			<Explain>
				<div>
					<h1>여행리뷰</h1>
					<div>
						행복은 나누면 두배 ! <br />
						내 여행도 기록하고, 다른 사람들의 여행 기록을 살펴보세요
						<br />
						여러 기록들을 살펴보며 나에게 꼭 맞는 여행지를 발견할지도 몰라요
						<button onClick={handleBtn}>
							<span>
								작성하러 가기{' '}
								<p className="arrow">
									<FiChevronRight />
								</p>
							</span>
						</button>
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
