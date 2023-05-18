import '../../Global.css';

import { FocusEvent, useState } from 'react';

import { AiOutlineGoogle } from 'react-icons/ai';
import { SiNaver } from 'react-icons/si';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import { Api } from '../../apis/customAPI';
import airplane from '../../assets/airplane.png';
import logo from '../../assets/logo.png';

const Main = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.airplane {
		width: 50%;
		height: 100vh;
	}
	.logo {
		width: 130px;
		position: absolute;
		top: 20px;
		left: 20px;
	}
`;
const Content = styled.div`
	width: 50%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: #fafafa;
	div {
		font-size: 40px;
		font-weight: bold;
		color: #393737;
	}
	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		input,
		button {
			margin-top: 30px;
			padding: 10px;
			border-radius: 5px;
			width: 300px;
			outline: none;
			border: 1px solid rgba(0, 0, 0, 0.2);
			&::placeholder {
				color: rgba(0, 0, 0, 0.3);
			}
		}
		button {
			margin-top: 20px;
			border: none;
			background: #0db4f3;
			color: white;
			font-weight: bold;
			font-size: 20px;
			&:hover {
				background: #4ec9ff;
			}
		}
		.check {
			color: red;
			font-size: 10px;
			margin-top: 10px;
		}
		.keyUp {
			font-size: 12px;
			width: 98%;
			color: #0db4f3;
			text-align: left;
			margin-top: 12px;
			margin-bottom: -25px;
		}
		.hide {
			display: none;
		}
	}
	.lineBox {
		color: #393737;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 13px;
		margin: 30px 0 20px 0;
		.line {
			width: 90px;
			border-top: 1px solid #393737;
			margin: 0 10px;
		}
	}
`;
const OauthBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	.oauth {
		width: 80px;
		height: 40px;
		background: none;
		border: 1px solid rgba(0, 0, 0, 0.1);
		margin: 0 5px;
		color: #393737;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 5px;
		font-size: 15px;
		&:hover {
			background: rgba(0, 0, 0, 0.04);
			border: none;
		}
		span {
			margin-left: 10px;
		}
		.google {
			margin-left: 5px;
		}
	}
`;

function Join() {
	const navigate = useNavigate();

	const [mbtiValid, setMbtiValid] = useState(true);
	const [emailValid, setEmailValid] = useState(true);
	const [passwordCheck, setpasswordCheck] = useState(true);
	const [passwordValid, setPasswordValid] = useState(true);

	const EMAIL_REGEX =
		/([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	const PASSWORD_REGEX = /(?=.*\d)(?=.*[a-z]).{8,}/;

	const MBTI_REGEX = [
		'ISTP',
		'ISFP',
		'ESTP',
		'ESFP',
		'INFJ',
		'INFP',
		'ENFJ',
		'ENFP',
		'ISTJ',
		'ISFJ',
		'ESTJ',
		'ESFJ',
		'INTJ',
		'INTP',
		'ENTJ',
		'ENTP',
	];

	function isMatch(password1: string, password2: string) {
		if (password1 === password2) {
			return true;
		}
		return false;
	}

	async function joinSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const el = e.target as HTMLFormElement;
		const id = Math.random();
		try {
			if (!EMAIL_REGEX.test(el.email.value)) {
				setEmailValid(false);
				setMbtiValid(true);
				setPasswordValid(true);
				setpasswordCheck(true);
			} else if (
				MBTI_REGEX.find((v) => v === el.mbti.value.toUpperCase()) === undefined
			) {
				setMbtiValid(false);
				setEmailValid(true);
				setPasswordValid(true);
				setpasswordCheck(true);
			} else if (!PASSWORD_REGEX.test(el.password.value)) {
				setPasswordValid(false);
				setEmailValid(true);
				setMbtiValid(true);
				setpasswordCheck(true);
			} else if (!isMatch(el.passwordCheck.value, el.password.value)) {
				setpasswordCheck(false);
				setEmailValid(true);
				setMbtiValid(true);
				setPasswordValid(true);
			} else {
				setEmailValid(true);
				setMbtiValid(true);
				setPasswordValid(true);
				setpasswordCheck(true);

				const mbtiImg = await Api.get('/mbtiInfo');
				await Api.post('/members', {
					id,
					nickname: el.displayName.value,
					mbti: el.mbti.value.toUpperCase(),
					email: el.email.value,
					password: el.password.value,
					img: mbtiImg.data.find(
						(v: { mbti: string }) => v.mbti === el.mbti.value.toUpperCase(),
					).img,
				});
				Swal.fire({
					title: '회원가입이 완료되었습니다',
					text: '로그인 페이지로 이동합니다.',
					icon: 'success',
				}).then((result) => {
					if (result.value) {
						navigate('/login');
					}
				});
			}
		} catch (error) {
			navigate('/error');
		}
	}

	/*
	// 서버 연결하면 바뀔 코드
	function Join() {
	const navigate = useNavigate();
	const joinSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const el = e.target as HTMLFormElement;
		const id = Math.random();
		try {
			const mbtiImg = await Api.get(`http://localhost:4000/mbtiInfo/${el.mbti.value}`);
			await Api.post('http://localhost:4000/members', {
				id,
				nickname: el.displayName.value,
				mbti: el.mbti.value,
				email: el.email.value,
				password: el.password.value,
				img: mbtiImg.img,
				badge: null,
			});
			// eslint-disable-next-line no-alert
			alert('회원가입이 완료되었습니다.');
			navigate('/login');
		} catch (error) {
			navigate('/error');
		}
	};
	*/

	const displayNameKeyFocus = (e: FocusEvent<HTMLInputElement>) => {
		const keyUp = e.target.previousSibling as HTMLDivElement;
		keyUp?.classList.remove('hide');
	};
	const displayNameKeyBlur = (e: FocusEvent<HTMLInputElement>) => {
		const keyUp = e.target.previousSibling as HTMLDivElement;
		keyUp?.classList.add('hide');
	};

	// oauth 구현 url
	const oAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_KEY}&
response_type=token&
redirect_uri=http://localhost:3000/accounts/google/login/&
scope=https://www.googleapis.com/auth/userinfo.email`;
	const oAuthHandler = () => {
		window.location.assign(oAuthURL);
	};

	return (
		<Main>
			<img className="airplane" src={airplane} alt="" />
			<Link to="/main">
				<img className="logo" src={logo} alt="" />
			</Link>
			<Content>
				<div>Sign Up</div>
				<form onSubmit={(e) => joinSubmit(e)}>
					<div className="keyUp hide">DisplayName</div>
					<input
						onFocus={(e) => displayNameKeyFocus(e)}
						onBlur={(e) => displayNameKeyBlur(e)}
						name="displayName"
						type="text"
						placeholder="Displayname"
						required
					/>
					<div className="keyUp hide">MBTI</div>
					<input
						onFocus={(e) => displayNameKeyFocus(e)}
						onBlur={(e) => displayNameKeyBlur(e)}
						name="mbti"
						type="text"
						placeholder="MBTI"
						required
					/>
					<div className="check">
						{!mbtiValid && 'MBTI 형식으로 입력해주세요 ex.ISTJ'}
					</div>
					<div className="keyUp hide">Email</div>
					<input
						onFocus={(e) => displayNameKeyFocus(e)}
						onBlur={(e) => displayNameKeyBlur(e)}
						name="email"
						type="text"
						placeholder="Email"
						required
					/>
					<div className="check">
						{!emailValid && '이메일 형식으로 입력해주세요'}
					</div>
					<div className="keyUp hide">Password</div>
					<input
						onFocus={(e) => displayNameKeyFocus(e)}
						onBlur={(e) => displayNameKeyBlur(e)}
						name="password"
						type="password"
						placeholder="Password"
						required
					/>
					<div className="check">
						{!passwordValid &&
							'비밀번호 형식은 영문+숫자 포함 8글자(특수문자제외)입니다'}
					</div>
					<div className="keyUp hide">Password확인</div>
					<input
						onFocus={(e) => displayNameKeyFocus(e)}
						onBlur={(e) => displayNameKeyBlur(e)}
						name="passwordCheck"
						type="password"
						placeholder="Password확인"
						required
					/>
					<div className="check">
						{!passwordCheck && '비밀번호가 일치하지 않습니다'}
					</div>
					<button type="submit">Sign up</button>
				</form>
				<div className="lineBox">
					<span className="line" />
					Or Sign up with
					<span className="line" />
				</div>
				<OauthBox>
					<button className="oauth" onClick={oAuthHandler}>
						<AiOutlineGoogle color="#393737" size="20px" />
						<span className="google">Google</span>
					</button>
					<button className="oauth">
						<SiNaver color="#03c157" size="15px" />
						<span>Naver</span>
					</button>
				</OauthBox>
			</Content>
		</Main>
	);
}

export default Join;
