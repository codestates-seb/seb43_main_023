import styled from 'styled-components';
import { AiFillHeart } from 'react-icons/ai';
import img from '../../Assets/전주.jpg';

const Container = styled.div`
	margin-top: 50px;
	height: calc(100vh - 280px);
	margin-left: 35px;
	display: flex;
	overflow: scroll;
	flex-wrap: wrap;
`;

const ReviewBox = styled.div`
	border: 1px solid rgb(214, 217, 219);
	height: 270px;
	width: 210px;
	margin-bottom: 20px;
	margin-right: 45px;
	background-color: white;

	> div:nth-child(1) {
		border-bottom: 1px solid rgb(214, 217, 219);
		height: 200px;

		> img {
			width: 100%;
			height: 100%;
		}
	}

	> div:nth-child(2) {
		padding: 5px;
		font-size: 13px;
		height: 40px;
	}
`;

const Writer = styled.div`
	height: 30px;
	display: flex;
	justify-content: space-between;
	align-items: center;

	> div:nth-child(1) {
		// 작성자 사진, 이름
		padding: 5px;
		display: flex;
		width: fit-content;
		align-items: center;
		font-size: 12px;

		img {
			width: 20px;
			height: 20px;
			border-radius: 100%;
			margin-right: 6px;
		}
	}

	> div:nth-child(2) {
		// 좋아요 부분
		padding-right: 5px;
		color: rgb(200, 202, 204);
		display: flex;
		font-size: 13px;
		align-items: center;

		> p {
			margin-left: 4px;
		}
	}
`;

const Pagination = styled.div`
	background-color: rgb(200, 202, 204);
	margin-top: 10px;
	height: 32px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
`;

function Review() {
	return (
		<Container>
			<ReviewBox>
				<div>
					<img src={img} alt="여행리뷰사진" />
				</div>
				<div>재미따 ~</div>
				<Writer>
					<div>
						<div>
							<img src={img} alt="유저프로필사진" />
						</div>
						<div>너구리</div>
					</div>

					<div>
						<AiFillHeart color="#F24F1F" size={17} />
						<p>5</p>
					</div>
				</Writer>
			</ReviewBox>

			<ReviewBox>
				<div>
					<img src={img} alt="여행리뷰사진" />
				</div>
				<div>재미따 ~</div>
				<Writer>
					<div>
						<div>
							<img src={img} alt="유저프로필사진" />
						</div>
						<div>너구리</div>
					</div>

					<div>
						<AiFillHeart color="#F24F1F" size={17} />
						<p>5</p>
					</div>
				</Writer>
			</ReviewBox>

			<ReviewBox>
				<div>
					<img src={img} alt="여행리뷰사진" />
				</div>
				<div>재미따 ~</div>
				<Writer>
					<div>
						<div>
							<img src={img} alt="유저프로필사진" />
						</div>
						<div>너구리</div>
					</div>

					<div>
						<AiFillHeart color="#F24F1F" size={17} />
						<p>5</p>
					</div>
				</Writer>
			</ReviewBox>

			<ReviewBox>
				<div>
					<img src={img} alt="여행리뷰사진" />
				</div>
				<div>재미따 ~</div>
				<Writer>
					<div>
						<div>
							<img src={img} alt="유저프로필사진" />
						</div>
						<div>너구리</div>
					</div>

					<div>
						<AiFillHeart color="#F24F1F" size={17} />
						<p>5</p>
					</div>
				</Writer>
			</ReviewBox>

			<ReviewBox>
				<div>
					<img src={img} alt="여행리뷰사진" />
				</div>
				<div>재미따 ~</div>
				<Writer>
					<div>
						<div>
							<img src={img} alt="유저프로필사진" />
						</div>
						<div>너구리</div>
					</div>

					<div>
						<AiFillHeart color="#F24F1F" size={17} />
						<p>5</p>
					</div>
				</Writer>
			</ReviewBox>

			<ReviewBox>
				<div>
					<img src={img} alt="여행리뷰사진" />
				</div>
				<div>재미따 ~</div>
				<Writer>
					<div>
						<div>
							<img src={img} alt="유저프로필사진" />
						</div>
						<div>너구리</div>
					</div>

					<div>
						<AiFillHeart color="#F24F1F" size={17} />
						<p>5</p>
					</div>
				</Writer>
			</ReviewBox>

			<ReviewBox>
				<div>
					<img src={img} alt="여행리뷰사진" />
				</div>
				<div>재미따 ~</div>
				<Writer>
					<div>
						<div>
							<img src={img} alt="유저프로필사진" />
						</div>
						<div>너구리</div>
					</div>

					<div>
						<AiFillHeart color="#F24F1F" size={17} />
						<p>5</p>
					</div>
				</Writer>
			</ReviewBox>

			<ReviewBox>
				<div>
					<img src={img} alt="여행리뷰사진" />
				</div>
				<div>재미따 ~</div>
				<Writer>
					<div>
						<div>
							<img src={img} alt="유저프로필사진" />
						</div>
						<div>너구리</div>
					</div>

					<div>
						<AiFillHeart color="#F24F1F" size={17} />
						<p>5</p>
					</div>
				</Writer>
			</ReviewBox>

			<Pagination> 페 이 지 네 이 션 자 리</Pagination>
		</Container>
	);
}

export default Review;
