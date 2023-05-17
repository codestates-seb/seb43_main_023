import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../Store/store';
import { IKeyword } from '../Reducers/searchKeywordReducer';

const SearchContainer = styled.div`
	width: 100%;
	height: 100%;
	margin-top: 82px;
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const SearchAPI = styled.div`
	width: 90%;
	border: 1px solid #d9d9d9;
	border-radius: 15px;
	padding: 20px;
	display: flex;
	flex-direction: column;
	font-size: 24px;
	font-weight: 700;
	.keyword {
		color: #0db4f3;
	}
`;

const APIContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-top: 10px;
`;

const SearchAd = styled.div`
	width: 90%;
	border: 1px solid #d9d9d9;
	border-radius: 15px;
	padding: 20px;
	display: flex;
	flex-direction: column;
	font-size: 24px;
	font-weight: 700;
	.keyword {
		color: #0db4f3;
	}
`;

const AdItemContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
`;

const AdItem = styled.div`
	width: 20%;
	height: 300px;
	border: 1px solid #d9d9d9;
	border-radius: 15px;
	padding: 10px;
	margin: 10px;
	.adimg {
		width: 100%;
		height: 70%;
		border-bottom: 1px solid #d9d9d9;
	}
	.adtext {
		width: 100%;
		height: 30%;
		font-weight: 300;
		font-size: 20px;
	}
`;

const SearchResult = styled.div`
	width: 90%;
	border: 1px solid #d9d9d9;
	border-radius: 15px;
	margin-top: 50px;
	padding: 20px;
	display: flex;
	flex-direction: column;
	font-size: 24px;
	font-weight: 700;
	.keyword {
		color: #0db4f3;
	}
`;

const ResultContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-top: 10px;
`;

const ResultItem = styled.div`
	width: 95%;
	height: 210px;
	border: 1px solid #d9d9d9;
	border-radius: 15px;
	padding: 15px;
	margin: 12px 0;
	display: flex;
`;

const ResultText = styled.div`
	width: 80%;
	display: flex;
	flex-direction: column;
	.subject {
		margin-right: 20px;
	}
	.content {
		padding: 10px 30px;
		height: 120px;
		font-size: 20px;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.author {
		text-align: end;
	}
`;

const ResultImg = styled.div`
	width: 20%;
	border: 1px solid tomato;
	border-radius: 15px;
	margin-left: 20px;
`;

function Search() {
	const keyword = useSelector((state: RootState) => state.search) as IKeyword;
	return (
		<SearchContainer>
			<SearchAPI>
				<div className="title">
					한국 관광 공사의 <span className="keyword">{keyword.keyword}</span>{' '}
					추천 여행지
				</div>
				<AdItemContainer>
					<AdItem>
						<div className="adimg">사진</div>
						<div className="adtext">텍스트</div>
					</AdItem>
					<AdItem>
						<div className="adimg">사진</div>
						<div className="adtext">텍스트</div>
					</AdItem>
					<AdItem>
						<div className="adimg">사진</div>
						<div className="adtext">텍스트</div>
					</AdItem>
					<AdItem>
						<div className="adimg">사진</div>
						<div className="adtext">텍스트</div>
					</AdItem>
					<AdItem>
						<div className="adimg">사진</div>
						<div className="adtext">텍스트</div>
					</AdItem>
				</AdItemContainer>
			</SearchAPI>
			<SearchAd>
				<div className="title">
					<span className="keyword">{keyword.keyword}</span> 추천 여행지
				</div>
				<AdItemContainer>
					<AdItem>
						<div className="adimg">사진</div>
						<div className="adtext">텍스트</div>
					</AdItem>
					<AdItem>
						<div className="adimg">사진</div>
						<div className="adtext">텍스트</div>
					</AdItem>
					<AdItem>
						<div className="adimg">사진</div>
						<div className="adtext">텍스트</div>
					</AdItem>
					<AdItem>
						<div className="adimg">사진</div>
						<div className="adtext">텍스트</div>
					</AdItem>
					<AdItem>
						<div className="adimg">사진</div>
						<div className="adtext">텍스트</div>
					</AdItem>
				</AdItemContainer>
			</SearchAd>
			<SearchResult>
				<div className="title">
					<span className="keyword">{keyword.keyword}</span>가 포함된 게시글
				</div>
				<ResultContainer>
					<ResultItem>
						<ResultText>
							<div className="resultInfo">
								<span className="subject">말머리</span>
								<span className="title">제목</span>
							</div>
							<div className="content">
								내용이 진짜 길면 어디까지 늘어날까요내용이 진짜 길면 어디까지
								늘어날까요내용이 진짜 길면 어디까지 늘어날까요내용이 진짜 길면
								어디까지 늘어날까요내용이 진짜 길면 어디까지 늘어날까요내용이
								진짜 길면 어디까지 늘어날까요내용이 진짜 길면 어디까지내용이
								진짜 길면 어디까지 늘어날까요내용이 진짜 길면 어디까지
								늘어날까요내용이 진짜 길면 어디까지 늘어날까요내용이 진짜 길면
								어디까지 늘어날까요내용이 진짜 길면 어디까지 늘어날까요내용이
								진짜 길면 어디까지 늘어날까요내용이 진짜 길면 어디까지
								늘어날까요내용이 진짜 길면 어디까지 늘어날까요내용이 진짜 길면
								어디까지 늘어날까요
							</div>
							<span className="author">작성자</span>
						</ResultText>
						<ResultImg>img</ResultImg>
					</ResultItem>
					<ResultItem>
						<ResultText>
							<div className="resultInfo">
								<span className="subject">말머리</span>
								<span className="title">제목</span>
							</div>
							<div className="content">내용</div>
							<span className="author">작성자</span>
						</ResultText>
						<ResultImg>img</ResultImg>
					</ResultItem>
					<ResultItem>
						<ResultText>
							<div className="resultInfo">
								<span className="subject">말머리</span>
								<span className="title">제목</span>
							</div>
							<div className="content">내용</div>
							<span className="author">작성자</span>
						</ResultText>
						<ResultImg>img</ResultImg>
					</ResultItem>
					<ResultItem>
						<ResultText>
							<div className="resultInfo">
								<span className="subject">말머리</span>
								<span className="title">제목</span>
							</div>
							<div className="content">내용</div>
							<span className="author">작성자</span>
						</ResultText>
						<ResultImg>img</ResultImg>
					</ResultItem>
					<ResultItem>
						<ResultText>
							<div className="resultInfo">
								<span className="subject">말머리</span>
								<span className="title">제목</span>
							</div>
							<div className="content">내용</div>
							<span className="author">작성자</span>
						</ResultText>
						<ResultImg>img</ResultImg>
					</ResultItem>
					<span>◀︎ 1/25 ▶︎</span>
				</ResultContainer>
			</SearchResult>
		</SearchContainer>
	);
}

export default Search;
