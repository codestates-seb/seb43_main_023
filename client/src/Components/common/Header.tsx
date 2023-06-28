/* eslint-disable no-nested-ternary */
import '../../Global.css';

import { useEffect, useState } from 'react';

import axios from 'axios';
import { AiOutlineSearch } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import logo from '../../assets/logo.png';
import { IKeyword, KEYWORD } from '../../reducers/searchKeywordReducer';
import { RootState } from '../../store/Store';
import { Ilogin } from '../../type/Ilogin';
import { getLocalStorage } from '../../utils/LocalStorage';

interface ContainerProps {
	hasResult: string[];
}

const Content = styled.div`
	z-index: 300;
	background: #fafafa;
	width: 100%;
	position: fixed;
	top: 0px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 40px;
	@media (max-width: 768px) {
		padding: 10px 25px;
	}
	@media (max-width: 480px) {
		padding: 10px 10px;
	}
	img {
		width: 130px;
		@media (max-width: 768px) {
			width: 100px;
		}
		@media (max-width: 480px) {
			width: 70px;
		}
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
		@media (max-width: 768px) {
			margin: 0 10px;
		}
		@media (max-width: 480px) {
			padding: 5px 5px;
		}
		input {
			background: none;
			width: 100%;
			border: none;
			margin-left: 10px;
			outline: none;
			&::placeholder {
				color: rgba(0, 0, 0, 0.3);
			}
			@media (max-width: 480px) {
				&::placeholder {
					font-size: 12px;
				}
			}
		}
		> button {
			position: absolute;
			right: 0px;
			font-weight: bold;
			font-size: 13px;
			@media (max-width: 480px) {
				font-size: 11px;
			}
			@media (max-width: 380px) {
				display: none;
			}
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
		@media (max-width: 768px) {
			font-size: 12px;
			width: 50px;
		}
	}
	@media (min-width: 1920px) {
		margin-left: auto;
		margin-right: auto;
		left: calc((100vw - 1920px) / 2);
		max-width: 1920px;
	}
`;

const Ul = styled.ul`
	z-index: 300;
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
	z-index: 300;

	> button {
		width: 100%;
		display: flex;
		&:hover {
			color: #0db4f3;
		}

		> p {
			height: 18px;
			font-size: 13px;
			margin-left: 15px;
			display: flex;
		}
	}
`;

const Container = styled.div<ContainerProps>`
	position: absolute;
	z-index: 300;
	width: 1030px;
	max-height: 300px;
	overflow: scroll;
	border: 3px solid #0db4f3;
	border-top: none;
	border-radius: 0 0 10px 10px;
	&::-webkit-scrollbar {
		display: none;
	}
	margin-top: ${(props) =>
		props.hasResult.length === 1
			? '96px'
			: props.hasResult.length === 2
			? '151px'
			: props.hasResult.length === 3
			? '196px'
			: props.hasResult.length === 4
			? '261px'
			: '316px'};
	margin-left: -13px;

	@media screen and (max-width: 1024px) {
		width: 101%;
	}

	@media screen and (max-width: 480px) {
		margin-left: -8px;
		width: 102.5%;
	}

	@media screen and (max-width: 440px) {
		margin-left: -8px;
		width: 102.6%;
	}

	@media screen and (max-width: 438px) {
		margin-left: -8px;
		width: 102.7%;
	}

	@media screen and (max-width: 428px) {
		margin-left: -8px;
		width: 102.8%;
	}

	@media screen and (max-width: 420px) {
		margin-left: -8px;
		width: 102.9%;
	}

	@media screen and (max-width: 414px) {
		width: 103%;
	}

	@media screen and (max-width: 400px) {
		width: 103.5%;
	}

	@media screen and (max-width: 380px) {
		width: 103.6%;
	}

	@media screen and (max-width: 362px) {
		width: 104%;
	}
`;

function Header() {
	const keyword = useSelector((state: RootState) => state.search) as IKeyword;
	const login = useSelector((state: RootState) => state.login) as Ilogin;
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [tourResult, setTourResult] = useState([]);
	const [change, setChange] = useState<boolean>(false);
	const [value, setValue] = useState<string>('');
	const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

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

	const handleInputFocus = () => {
		setIsInputFocused(true);
	};

	const handleInputBlur = () => {
		setTimeout(() => {
			setIsInputFocused(false);
			setTourResult([]);
			setChange(false);
			setValue('');
		}, 100);
	};

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
		dispatch(KEYWORD({ keyword: '' }));
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
	if (locationNow.pathname === `/memberpost/${getLocalStorage('memberId')}`)
		return null;
	if (locationNow.pathname === '/manager') return null;

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
					onFocus={handleInputFocus}
					onBlur={handleInputBlur}
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
