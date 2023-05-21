/* eslint-disable no-nested-ternary */
import '../../Global.css';

import { AiOutlineSearch } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../../assets/logo.png';
import { Ilogin } from '../../reducers/loginReducer';
import { RootState } from '../../store/Store';
import { IKeyword, KEYWORD } from '../../reducers/searchKeywordReducer';

interface ContainerProps {
	hasResult: string[];
}

const Content = styled.div`
	z-index: 1;
	background: #fafafa;
	width: 100%;
	position: fixed;
	top: 0px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 40px;
	img {
		width: 130px;
	}
	form {
		border: 3px solid #0db4f3;
		border-radius: 10px;
		width: 80%;
		margin: 0 20px;
		padding: 7px 10px;
		display: flex;
		justify-content: baseline;
		align-items: center;
		position: relative;
		input {
			background: none;
			width: 900px;
			border: none;
			margin-left: 10px;
			outline: none;
			&::placeholder {
				color: rgba(0, 0, 0, 0.3);
			}
		}
		button {
			position: absolute;
			right: 0px;
			font-weight: bold;
			font-size: 13px;
		}
	}
	div {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	button {
		color: #2d2d2d;
		font-weight: bold;
		background: none;
		width: 80px;
		&:hover {
			color: #0db4f3;
		}
	}
`;

const Ul = styled.ul`
	z-index: 200;
	width: 100%;
`;

const Li = styled.li`
	width: inherit;
	background-color: #fafafa;
	border-bottom: 1px solid rgb(214, 217, 219);
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: center;

	> button {
		width: 100%;
		display: flex;

		&:hover {
			color: #0db4f3;
		}

		> p {
			margin-left: 15px;
		}
	}
`;

const Container = styled.div<ContainerProps>`
	position: absolute;
	z-index: 200;
	width: 1030px;
	max-height: 300px;
	overflow: scroll;
	border: 3px solid #0db4f3;
	border-top: none;
	border-radius: 0 0 10px 10px;
	margin-top: ${(props) =>
		props.hasResult.length === 1
			? '63px'
			: props.hasResult.length === 2
			? '103px'
			: props.hasResult.length === 3
			? '143px'
			: props.hasResult.length === 4
			? '183px'
			: '223px'};
	margin-left: -13px;
`;

function Header() {
	const keyword = useSelector((state: RootState) => state.search) as IKeyword;
	const login = useSelector((state: RootState) => state.login) as Ilogin;
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [tourResult, setTourResult] = useState([]);
	const [change, setChange] = useState<boolean>(false);
	const [value, setValue] = useState<string>('');
	const [selected, setSelected] = useState<string>('');

	const eventAPIKey = process.env.REACT_APP_TOURAPI_KEY;
	const tourUrl = `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?serviceKey=${eventAPIKey}&numOfRows=5&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&keyword=${value}&contentTypeId=12`;

	useEffect(() => {
		let timerId: string | number | NodeJS.Timeout; // 타이머 ID 저장 변수

		const throttleFn = () => {
			axios(tourUrl).then((res) => {
				setTourResult(res.data.response.body.items.item);
			});
		};

		const delayThrottleFn = () => {
			// 타이머가 없는 경우에만 쓰로틀링 함수 호출
			if (!timerId) {
				throttleFn();
				timerId = setTimeout(() => {
					timerId = ''; // 타이머 ID 초기화
				}, 10);
			}
		};

		delayThrottleFn(); // 최초 실행

		return () => clearTimeout(timerId); // 컴포넌트 언마운트 시 타이머 취소
	}, [tourUrl]);

	const searchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const el = e.target as HTMLFormElement;

		setTourResult([]);
		setChange(false);

		if (el.search.value) {
			dispatch(KEYWORD({ keyword: el.search.value }));
			navigate('/search');
		}
	};

	const handleSearch = (data: string) => {
		dispatch(KEYWORD({ keyword: data }));
		navigate('/search');
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setChange(true);
		setValue(e.target.value);
	};

	const handleSelected = (event: React.MouseEvent<HTMLButtonElement>) => {
		const selectedOption = event.currentTarget.innerText;
		setValue(selectedOption);
		setTourResult([]);
		setChange(false);

		handleSearch(selectedOption);
	};

	const locationNow = useLocation();

	useEffect(() => {
		if (locationNow.pathname === '/community') {
			dispatch(KEYWORD({ keyword: '' }));
			setValue('');
		}
	}, [dispatch, locationNow.pathname]);

	if (locationNow.pathname === '/logout') return null;
	if (locationNow.pathname === '/login') return null;
	if (locationNow.pathname === '/join') return null;
	if (locationNow.pathname === '/') return null;

	return (
		<Content>
			<Link to="/main">
				<img src={logo} alt="" />
			</Link>
			<form onSubmit={(e) => searchSubmit(e)}>
				<AiOutlineSearch color="rgba(0, 0, 0, 0.3)" />
				<input
					name="search"
					type="text"
					placeholder="여행지를 검색해보세요"
					onChange={handleInputChange}
					autoComplete="off"
					value={value || keyword.keyword}
					// defaultValue={selected}
				/>

				<button type="submit">찾기</button>

				{tourResult && value && change && (
					<Container hasResult={tourResult}>
						<Ul>
							{tourResult.map((result: any) => (
								<Li>
									<button onClick={(e) => handleSelected(e)}>
										<p>{result.title}</p>
									</button>
								</Li>
							))}
						</Ul>
					</Container>
				)}
			</form>

			<div>
				{login.isLogin ? (
					<Link to="/mypage">
						<button>마이페이지</button>
					</Link>
				) : (
					<Link to="/join">
						<button>회원가입</button>
					</Link>
				)}
				{login.isLogin ? (
					<Link to="/logout">
						<button>로그아웃</button>
					</Link>
				) : (
					<Link to="/login">
						<button>로그인</button>
					</Link>
				)}
			</div>
		</Content>
	);
}

export default Header;
