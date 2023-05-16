import styled from 'styled-components';
import SideBar from '../../Components/Community/SideBar';
import Reviews from '../../Components/Community/Reviews';
import Tags from '../../Components/Community/Tags';
import '../../Global.css';

const ReviewContainer = styled.div`
	height: calc(100vh - 165px);
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
