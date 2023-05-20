import { useEffect } from 'react';

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { LOGIN } from '../reducers/loginReducer';
import { UPDATE } from '../reducers/userInfoReducer';
import { setCookie } from '../utils/cookie';
import { getLocalStorage, setLocalStorage } from '../utils/LocalStorage';
import { Api } from './customAPI';

export function OauthGoogleHandler() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// oauth 구글 회원가입, 로그인(if문으로 구분됨)
	useEffect(() => {
		const url = new URL(window.location.href);
		const { hash } = url;
		const accessToken2 = hash.split('=')[1].split('&')[0];
		async function getData() {
			try {
				// oauth 접근, 로그인 실행
				await axios.get(
					`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken2}`,
					{
						headers: {
							authorization: `token ${accessToken2}`,
							accept: 'application/json',
						},
					},
				);
				// oauth 로그인 정보 가져오기(id, email)
				const oauthInfo = await axios.get(
					'https://www.googleapis.com/oauth2/v2/userinfo',
					{
						headers: {
							Authorization: `Bearer ${accessToken2}`,
						},
					},
				);
				// eslint-disable-next-line no-console
				console.log(oauthInfo.data); // oauth data(id, email)

				// 처음 회원가입 시 회원가입, 로그인때 필요한 데이터
				const mbtiImg = await Api.get('/mbtiInfo');
				const userCheck = await Api.get(`/members`);
				const memberId = Number(oauthInfo.data.id);
				const password = process.env.REACT_APP_GOOGLE_CLIENT_PASSWORD_KEY;

				// 회원가입이 안되있다면
				if (
					userCheck.data.filter(
						(el: { memberId: number }) => el.memberId === oauthInfo.data.id,
					).length === 0
				) {
					// 회원가입 post 요청
					await Api.post('/members/signup', {
						memberId,
						nickname: oauthInfo.data.id,
						mbti: 'INFP',
						email: oauthInfo.data.email,
						password,
						img: mbtiImg.data.find((v: { mbti: string }) => v.mbti === 'INFP')
							.img,
						badge: null,
					});
					// 서버 연결코드
					const loginData = await Api.post('/members/signin', {
						email: oauthInfo.data.email,
						password,
					});
					const {
						accessToken,
						refreshToken,
						accessTokenExpirationTime,
						refreshTokenExpirationTime,
					} = loginData.data;
					// axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

					// 로그인 정보 업데이트
					dispatch(
						UPDATE({
							id: memberId,
							nickname: oauthInfo.data.id,
							mbti: 'INFP',
							email: oauthInfo.data.email,
							img: mbtiImg.data.find((v: { mbti: string }) => v.mbti === 'INFP')
								.img,
							badge: null,
						}),
					);
					dispatch(LOGIN({ accessToken: `${accessToken}` }));
					setCookie('refreshToken', refreshToken, {
						path: '/',
						sameSite: 'none',
						secure: true,
					});
					setLocalStorage('accessToken', accessToken);
					setLocalStorage('empiresAtAccess', accessTokenExpirationTime);
					setLocalStorage('empiresAtRefresh', refreshTokenExpirationTime);
					Swal.fire({
						icon: 'success',
						title: '회원가입되었습니다.',
						text: '마이페이지에서 정보를 수정해주세요.',
					}).then((result) => {
						if (result.isConfirmed) {
							navigate('/useredit');
						}
					});
				} else {
					// 이미 회원가입이 되어 있어 바로 로그인하는 경우
					// const userInfo = await Api.get(`/members/${oauthInfo.data.id}`);
					// 서버 연결코드
					const loginData = await Api.post('/members/signin', {
						email: oauthInfo.data.email,
						password: process.env.REACT_APP_GOOGLE_CLIENT_PASSWORD_KEY,
					});
					const {
						accessToken,
						refreshToken,
						accessTokenExpirationTime,
						refreshTokenExpirationTime,
					} = loginData.data;
					// axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

					// 로그인 정보 업데이트
					dispatch(
						UPDATE({
							id: memberId,
							nickname: oauthInfo.data.id,
							mbti: 'INFP',
							email: oauthInfo.data.email,
							img: mbtiImg.data.find((v: { mbti: string }) => v.mbti === 'INFP')
								.img,
							badge: null,
						}),
					);
					dispatch(LOGIN({ accessToken: `${accessToken}` }));
					setCookie('refreshToken', refreshToken, {
						path: '/',
						sameSite: 'none',
						secure: true,
					});
					setLocalStorage('accessToken', accessToken);
					setLocalStorage('empiresAtAccess', accessTokenExpirationTime);
					setLocalStorage('empiresAtRefresh', refreshTokenExpirationTime);

					Swal.fire({
						icon: 'success',
						title: '로그인되었습니다.',
						text: '메인 페이지로 이동합니다.',
					}).then((result) => {
						if (result.isConfirmed) {
							navigate('/main');
						}
					});
				}
			} catch (error) {
				navigate('/error');
			}
		}
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, navigate]);
}

// oauth 네이버 회원가입, 로그인(if문으로 구분됨)
// 네이버에서 토큰을 받아오고 서버로 넘긴 후, 서버에서 로그인시키고, 유저정보를 클라이언트에 보내서 그걸로 유저 상태 업데이트
export function OauthNaverHandler() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		const url = new URL(window.location.href);
		const { hash } = url;
		const accessToken = hash.split('=')[1].split('&')[0];
		setLocalStorage('accessToken', accessToken);
		async function getData() {
			try {
				/*
				// 서버 네이버 토큰 주면 유저정보 요청할 코드
				const userData = await Api.post('/auth/userInfo', {
					accessToken
				});
				const {
				nickname,
				email
			} = userData.data.data;
			*/

				// 처음 회원가입 시 회원가입, 로그인때 필요한 데이터
				const nickname = 'test';
				const email = 'test123@gmail.com';
				const mbtiImg = await Api.get('/mbtiInfo');
				/*
				const mbtiImg = await Api.get('/mbtiInfo/INFP');
				밑에서 꺼내쓸때는 mbtiImg.data.img
				*/
				const userCheck = await Api.get(`/members`);
				const password = process.env.REACT_APP_NAVER_CLIENT_PASSWORD;
				const memberId = userCheck.data.length + 1; // 서버 연결시 삭제
				const refreshToken = 'token2'; // 서버 연결시 삭제
				const accessTokenExpirationTime = 1800000; // 서버 연결시 삭제
				const refreshTokenExpirationTime = 23000000; // 서버 연결시 삭제

				// 회원가입이 안되있다면
				if (
					userCheck.data.filter((el: { id: number }) => el.id === memberId)
						.length === 0
				) {
					// 회원가입 post 요청
					await Api.post('/members', {
						id: memberId,
						nickname,
						mbti: 'INFP',
						email,
						password,
						img: mbtiImg.data.find((v: { mbti: string }) => v.mbti === 'INFP')
							.img,
					});
					/*
					// 서버 회원가입 요청 코드
					await Api.post('/members/signup', {
						nickname,
						mbti: 'INFP',
						email,
						password,
						img: mbtiImg.data.img,
					});
					*/
					/*
					// 서버 로그인 요청 코드
					const loginData = await Api.post('/members/signin', {
						email: `${email}`,
						password,
					});
					const {
						memberId,
						accessToken,
						refreshToken,
						accessTokenExpirationTime,
						refreshTokenExpirationTime,
					} = loginData.data;
					// axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
					*/
					// 로그인 정보 업데이트
					dispatch(
						UPDATE({
							id: memberId,
							nickname,
							mbti: 'INFP',
							email,
							img: mbtiImg.data.find((v: { mbti: string }) => v.mbti === 'INFP')
								.img,
						}),
					);
					dispatch(LOGIN({ accessToken: `${accessToken}` }));
					setCookie('refreshToken', refreshToken, {
						path: '/',
						sameSite: 'none',
						secure: true,
					});
					setLocalStorage('accessToken', accessToken);
					setLocalStorage('empiresAtAccess', accessTokenExpirationTime);
					setLocalStorage('empiresAtRefresh', refreshTokenExpirationTime);
					setLocalStorage('memberId', memberId); // 서버 연결시 삭제
					Swal.fire({
						icon: 'success',
						title: '회원가입되었습니다.',
						text: '마이페이지에서 정보를 수정해주세요.',
					}).then((result) => {
						if (result.isConfirmed) {
							navigate('/useredit');
						}
					});
				} else {
					// 이미 회원가입이 되어 있어 바로 로그인하는 경우
					// 서버 연결시 코드 const userInfo = await Api.get(`/members/${memberId}`);
					const userInfo = await Api.get(
						`/members/${getLocalStorage('memberId')}`,
					);
					dispatch(LOGIN({ accessToken: `${accessToken}` }));
					dispatch(
						UPDATE({
							id: userInfo.data.id,
							email: userInfo.data.email,
							nickname: userInfo.data.nickname,
							mbti: userInfo.data.mbti,
							img: userInfo.data.img,
							badge: userInfo.data.badge,
						}),
					);
					Swal.fire({
						icon: 'success',
						title: '로그인되었습니다.',
						text: '메인 페이지로 이동합니다.',
					}).then((result) => {
						if (result.isConfirmed) {
							navigate('/main');
						}
					});
				}
			} catch (error) {
				navigate('/error');
			}
		}
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, navigate]);
}
