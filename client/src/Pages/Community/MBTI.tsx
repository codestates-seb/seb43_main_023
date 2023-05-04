import styled from 'styled-components';
import SideBar from '../../Components/Community/SideBar';
import Tags from '../../Components/Community/Tags';
import '../../Global.css';

const MBTIContainer = styled.div`
	height: calc(100vh - 300px);
	display: flex;
`;

const MBTIBody = styled.div`
	margin-top: 35px;
	height: calc(100vh - 260px);
	width: calc(100vw - 400px);
	margin-right: 30px;
`;

const ContentHeader = styled.div`
	display: flex;
	padding-top: 10px;
	padding-bottom: 10px;
	font-weight: 600;
	font-size: 13px;

	> div:nth-child(1) {
		width: 90px;
		display: flex;
		justify-content: center;
	}

	> div:nth-child(2) {
		flex-grow: 2;
		display: flex;
		justify-content: center;
	}

	> div:nth-child(3) {
		width: 60px;
		display: flex;
		justify-content: center;
	}

	> div:nth-child(4) {
		width: 60px;
		display: flex;
		justify-content: center;
	}

	> div:nth-child(5) {
		width: 60px;
		display: flex;
		justify-content: center;
	}
`;

const Contentbody = styled.div`
	display: flex;
	padding-top: 10px;
	padding-bottom: 10px;
	font-weight: 350;
	font-size: 13px;

	&:hover {
		color: #0db4f3;
	}

	> div:nth-child(1) {
		width: 90px;
		display: flex;
		justify-content: center;
	}

	> div:nth-child(2) {
		width: 740px;

		> p {
			display: block;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}
	}

	> div:nth-child(3) {
		width: 60px;
		display: flex;
		justify-content: center;
	}

	> div:nth-child(4) {
		width: 60px;
		display: flex;
		justify-content: center;
	}

	> div:nth-child(5) {
		width: 60px;
		display: flex;
		justify-content: center;
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

	> div:last-child {
		display: flex;
		justify-content: center;
		align-items: center;
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

function MBTI() {
	return (
		<div className="main">
			<MBTIContainer>
				<SideBar />
				<MBTIBody>
					<ContentHeader>
						<div>말머리</div>
						<div>제목</div>
						<div>닉네임</div>
						<div>추천</div>
						<div>작성시간</div>
					</ContentHeader>

					<Contentbody>
						<div>[MBTI]</div>
						<div> INTP 남친 왜 이러죠 ? 이해할 수가 없네요 당최</div>
						<div>너구리</div>
						<div>0</div>
						<div>16:15</div>
					</Contentbody>

					<Contentbody>
						<div>[MBTI]</div>
						<div> INTP 남친 왜 이러죠 ? 이해할 수가 없네요 당최</div>
						<div>너구리</div>
						<div>0</div>
						<div>16:15</div>
					</Contentbody>

					<Contentbody>
						<div>[MBTI]</div>
						<div> INTP 남친 왜 이러죠 ? 이해할 수가 없네요 당최</div>
						<div>너구리</div>
						<div>0</div>
						<div>16:15</div>
					</Contentbody>

					<Contentbody>
						<div>[MBTI]</div>
						<div> INTP 남친 왜 이러죠 ? 이해할 수가 없네요 당최</div>
						<div>너구리</div>
						<div>0</div>
						<div>16:15</div>
					</Contentbody>

					<Contentbody>
						<div>[MBTI]</div>
						<div> INTP 남친 왜 이러죠 ? 이해할 수가 없네요 당최</div>
						<div>너구리</div>
						<div>0</div>
						<div>16:15</div>
					</Contentbody>

					<Contentbody>
						<div>[MBTI]</div>
						<div> INTP 남친 왜 이러죠 ? 이해할 수가 없네요 당최</div>
						<div>너구리</div>
						<div>0</div>
						<div>16:15</div>
					</Contentbody>

					<Contentbody>
						<div>[MBTI]</div>
						<div> INTP 남친 왜 이러죠 ? 이해할 수가 없네요 당최</div>
						<div>너구리</div>
						<div>0</div>
						<div>16:15</div>
					</Contentbody>

					<Contentbody>
						<div>[MBTI]</div>
						<div> INTP 남친 왜 이러죠 ? 이해할 수가 없네요 당최</div>
						<div>너구리</div>
						<div>0</div>
						<div>16:15</div>
					</Contentbody>

					<Contentbody>
						<div>[MBTI]</div>
						<div> INTP 남친 왜 이러죠 ? 이해할 수가 없네요 당최</div>
						<div>너구리</div>
						<div>0</div>
						<div>16:15</div>
					</Contentbody>

					<Contentbody>
						<div>[MBTI]</div>
						<div> INTP 남친 왜 이러죠 ? 이해할 수가 없네요 당최</div>
						<div>너구리</div>
						<div>0</div>
						<div>16:15</div>
					</Contentbody>

					<Contentbody>
						<div>[MBTI]</div>
						<div> INTP 남친 왜 이러죠 ? 이해할 수가 없네요 당최</div>
						<div>너구리</div>
						<div>0</div>
						<div>16:15</div>
					</Contentbody>

					<Contentbody>
						<div>[MBTI]</div>
						<div> INTP 남친 왜 이러죠 ? 이해할 수가 없네요 당최</div>
						<div>너구리</div>
						<div>0</div>
						<div>16:15</div>
					</Contentbody>

					<Contentbody>
						<div>[MBTI]</div>
						<div> INTP 남친 왜 이러죠 ? 이해할 수가 없네요 당최</div>
						<div>너구리</div>
						<div>0</div>
						<div>16:15</div>
					</Contentbody>

					<Contentbody>
						<div>[MBTI]</div>
						<div> INTP 남친 왜 이러죠 ? 이해할 수가 없네요 당최</div>
						<div>너구리</div>
						<div>0</div>
						<div>16:15</div>
					</Contentbody>

					<Pagination>페 이 지 네 이 션 자 리</Pagination>
				</MBTIBody>
				<TagContainer>
					<Tags />
				</TagContainer>
			</MBTIContainer>
		</div>
	);
}

export default MBTI;
