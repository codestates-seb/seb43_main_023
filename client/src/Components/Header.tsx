import '../Global.css';

import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import logo from '../assets/logo.png';
import { Ilogin } from '../reducers/loginReducer';
import { RootState } from '../store/Store';

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
			width: 70%;
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
function Header() {
	const login = useSelector((state: RootState) => state.login) as Ilogin;
	const navigate = useNavigate();

	const locationNow = useLocation();
	if (locationNow.pathname === '/logout') return null;
	if (locationNow.pathname === '/login') return null;
	if (locationNow.pathname === '/join') return null;
	if (locationNow.pathname === '/') return null;

	const searchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const el = e.target as HTMLFormElement;
		// eslint-disable-next-line no-console
		console.log(el.search.value);
		navigate('/search');
	};
	return (
		<Content>
			<Link to="/main">
				<img src={logo} alt="" />
			</Link>
			<form onSubmit={(e) => searchSubmit(e)}>
				<AiOutlineSearch color="rgba(0, 0, 0, 0.3)" />
				<input name="search" type="text" placeholder="여행지를 검색해보세요" />
				<button type="submit">찾기</button>
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
