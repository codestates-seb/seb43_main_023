import '../Global.css';

import { useState } from 'react';

import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import logo from '../Assets/너의 MBTI는.png';

const Content = styled.div`
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
	const [value, setValue] = useState('');
	const searchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};
	const searchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(value);
	};
	return (
		<Content>
			<Link to="/">
				<img src={logo} alt="" />
			</Link>
			<form onSubmit={(e) => searchSubmit(e)}>
				<AiOutlineSearch color="rgba(0, 0, 0, 0.3)" />
				<input
					onChange={(e) => searchChange(e)}
					type="text"
					placeholder="여행지를 검색해보세요"
				/>
				<button type="submit">찾기</button>
			</form>
			<div>
				<button>마이페이지</button>
				<button>로그아웃</button>
			</div>
		</Content>
	);
}

export default Header;
