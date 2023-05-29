import '../../Global.css';

import styled from 'styled-components';

import { FiChevronRight } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as style from '../../Components/community/CommunityStyle';
import Reviews from '../../Components/community/Reviews';
import SideBar from '../../Components/community/SideBar';
import Tags from '../../Components/community/Tags';
import { RootState } from '../../store/Store';
import { Ilogin } from '../../type/Ilogin';

import HamburgerMenu from '../../Components/community/HamburgerMenu';
import ToastAlert from '../../utils/ToastAlert';

const ReviewContainer = styled.div`
	margin-top: 240px;
	height: 1000px;
	display: flex;
	align-content: flex-start;

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

function TripReview() {
	const navigate = useNavigate();
	const login = useSelector((state: RootState) => state.login) as Ilogin;

	const handleBtn = () => {
		if (login.isLogin) {
			navigate('/community/create');
		} else {
			ToastAlert('로그인 상태가 아닙니다');
		}
	};

	return (
		<div className="main">
			<style.Explain>
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
					</div>
				</div>
			</style.Explain>
			<HamburgerMenu />
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
