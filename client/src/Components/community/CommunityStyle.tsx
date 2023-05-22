import styled from 'styled-components';

export const Explain = styled.div`
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

export const Container = styled.div`
	height: 1000px;
	display: flex;

	a {
		text-decoration: none;
		color: black;
	}

	> div {
		display: flex;
		flex-direction: column;
	}
`;

export const Body = styled.div`
	width: calc(100vw - 400px);
	margin-right: 30px;
	height: fit-content;
	/* min-height: 1000px;
	max-height: 1000px; */
`;

export const Contentbody = styled.div`
	display: flex;
	padding-top: 10px;
	padding-bottom: 10px;
	font-weight: 350;
	font-size: 13px;
	border-bottom: 1px solid rgb(214, 217, 219);

	&:hover {
		color: #0db4f3;
	}

	> div:nth-child(1) {
		display: flex;
		flex-direction: column;
		margin-right: 20px;
		width: 860px;
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

export const Header = styled.div`
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
		height: 50px;
		-webkit-text-stroke: 0.1px black;
	}
`;

export const Info = styled.div`
	display: flex;
	padding: 5px;

	div {
		margin-right: 15px;
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

export const TagContainer = styled.div`
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

export const PaginationContainer = styled.div`
	margin-top: 10px;
	height: 32px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
`;
