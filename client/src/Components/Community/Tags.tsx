import styled from 'styled-components';

const PlaceTag = styled.div`
	font-weight: 600;
	font-size: 15px;

	> h4 {
		border-radius: 30px;
		width: 50px;
		padding: 4px 5px;
		margin-left: 10px;
		margin-bottom: 10px;
		font-size: 13px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #a3e6ff;
	}

	> div {
		margin-top: 5px;
		display: flex;
		flex-wrap: wrap;
		border-bottom: 1px solid rgb(214, 217, 219);
		padding-bottom: 5px;
		margin-bottom: 5px;
	}
`;

const ThemeTag = styled.div`
	font-weight: 600;
	font-size: 15px;
	margin-top: 10px;

	> h4 {
		border-radius: 30px;
		width: 50px;
		padding: 4px 5px;
		margin-left: 10px;
		margin-bottom: 10px;
		font-size: 13px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #a3e6ff;
	}

	> div {
		margin-top: 5px;
		display: flex;
		flex-wrap: wrap;
		border-bottom: 1px solid rgb(214, 217, 219);
		padding-bottom: 5px;
		margin-bottom: 5px;
	}
`;

const MBTITags = styled.div`
	font-weight: 600;
	font-size: 15px;
	margin-top: 10px;

	> h4 {
		border-radius: 30px;
		width: 50px;
		padding: 4px 5px;
		margin-left: 10px;
		margin-bottom: 10px;
		font-size: 13px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #a3e6ff;
	}

	> div {
		margin-top: 5px;
		display: flex;
		flex-wrap: wrap;
	}
`;

const Tag = styled.div`
	width: max-content;
	padding: 5px 5px;
	margin-left: 10px;
	font-size: 13px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 11px;

	&:hover {
		color: #0db4f3;
		cursor: pointer;
	}
`;

const MBTITag = styled.div`
	border-radius: 30px;
	width: 30px;
	padding: 5px 15px;
	margin-left: 10px;

	font-size: 13px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 11px;

	&:hover {
		color: #0db4f3;
		cursor: pointer;
	}
`;

const PostBtn = styled.div`
	button {
		position: relative;
		margin: auto;
		padding: 12px 18px;
		transition: all 0.2s ease;
		border: none;
		background: none;

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			display: block;
			border-radius: 50px;
			background: #a3e6ff;
			width: 35px;
			height: 35px;
			transition: all 0.3s ease;
		}

		&:hover::before {
			width: 100%;
			background: #a3e6ff;
		}

		&:hover {
			span {
				color: white;
			}
			svg {
				transform: translateX(0);
				stroke: white;
			}
		}

		&:active {
			transform: scale(0.95);
		}

		span {
			position: relative;
			font-family: 'Ubuntu', sans-serif;
			font-size: 13px;
			font-weight: 700;
			letter-spacing: 0.05em;
			color: #000000;

			&:hover {
				color: white;
				stroke: white;
			}
		}

		svg {
			position: relative;
			top: 0;
			margin-left: 10px;
			fill: none;
			stroke-linecap: round;
			stroke-linejoin: round;
			stroke: #234567;
			stroke-width: 2;
			transform: translateX(-5px);
			transition: all 0.3s ease;

			&:hover {
				color: white;
				stroke: white;
			}
		}
	}
`;

function Tags() {
	const first = ['E', 'I'];
	const second = ['S', 'N'];
	const third = ['F', 'T'];
	const fourth = ['J', 'P'];

	const allMBTI = first.flatMap((f) =>
		second.flatMap((s) =>
			third.flatMap((t) => fourth.map((fth) => `${f}${s}${t}${fth}`)),
		),
	);
	return (
		<>
			<div>
				<PlaceTag>
					<h4>장소</h4>
					<div>
						<Tag>#전주</Tag>
						<Tag>#부산</Tag>
						<Tag>#제주도</Tag>
						<Tag>#하동</Tag>
						<Tag>#양떼목장</Tag>
						<Tag>#해수욕장</Tag>
					</div>
				</PlaceTag>
				<ThemeTag>
					<h4>테마</h4>
					<div>
						<Tag>#전주</Tag>
						<Tag>#부산</Tag>
						<Tag>#제주도</Tag>
						<Tag>#하동</Tag>
						<Tag>#양떼목장</Tag>
						<Tag>#해수욕장</Tag>
					</div>
				</ThemeTag>
				<MBTITags>
					<h4>MBTI</h4>
					<div>
						{allMBTI.map((el, index) => (
							// eslint-disable-next-line react/no-array-index-key
							<MBTITag key={index}>{`#${el}`}</MBTITag>
						))}
					</div>
				</MBTITags>
			</div>
			<div>
				<PostBtn>
					<button className="cta">
						<span>리뷰 남기러 가기</span>
						<svg viewBox="0 0 10 10" height="10px" width="15px">
							<path d="M1,5 L11,5" />
							<polyline points="8 1 12 5 8 9" />
						</svg>
					</button>
				</PostBtn>
			</div>
		</>
	);
}

export default Tags;
