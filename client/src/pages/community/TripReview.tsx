import '../../Global.css';

import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import Reviews from '../../Components/community/Reviews';
import SideBar from '../../Components/community/SideBar';
import Tags from '../../Components/community/Tags';
import * as style from '../../Components/community/CommunityStyle';
import { RootState } from '../../store/Store';
import { Ilogin } from '../../type/Ilogin';

const ReviewContainer = styled.div`
	height: 1000px;
	display: flex;
`;

const ReviewBody = styled.div`
	width: calc(100vw - 230px);
	height: inherit;
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
			<style.Explain>
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
			</style.Explain>
			<ReviewContainer>
				<SideBar />
				<ReviewBody>
					<Reviews />
				</ReviewBody>

				<style.TagContainer>
					<Tags />
				</style.TagContainer>
			</ReviewContainer>
		</div>
	);
}

export default TripReview;
