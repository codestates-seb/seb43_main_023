import '../../Global.css';

import styled from 'styled-components';

import Reviews from '../../Components/ccc/Reviews';
import SideBar from '../../Components/ccc/SideBar';
import Tags from '../../Components/ccc/Tags';

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

	> h1 {
		margin-top: 20px;
		margin-bottom: 10px;
	}

	> div {
		color: #595959;
		font-size: 14px;
		padding-bottom: 10px;
		border-bottom: 1px solid rgb(214, 217, 219);
	}
`;

const ReviewContainer = styled.div`
	height: calc(100vh - 220px);
	display: flex;
`;

const ReviewBody = styled.div`
	width: calc(100vw - 230px);
	max-height: 660px;
	min-height: 660px;
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
	return (
		<div className="main">
			<Explain>
				<h1>여행리뷰</h1>
				<div>
					행복은 나누면 두배 ! <br />
					내 여행도 기록하고, 다른 사람들의 여행 기록을 살펴보세요
					<br />
					여러 기록들을 살펴보며 나에게 꼭 맞는 여행지를 발견할지도 몰라요
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
