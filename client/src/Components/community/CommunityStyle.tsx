import styled from 'styled-components';

export const Explain = styled.div`
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
		height: 102px;
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

export const Container = styled.div`
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

export const Body = styled.div`
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

export const Contentbody = styled.div`
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
		max-height: 50px;
		width: auto;
		overflow: hidden;
		-webkit-text-stroke: 0.1px black;

		@media (max-width: 768px) {
			flex-direction: column;
			align-items: flex-start;
		}
	}
`;

export const Info = styled.div`
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

export const TagContainer = styled.div`
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

export const PaginationContainer = styled.div`
	margin-top: 10px;
	height: 32px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
`;
