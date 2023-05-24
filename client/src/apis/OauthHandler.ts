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
			console.log(accessToken2, oauthInfo.data); // oauth data(id, email)

			// 처음 회원가입 시 회원가입, 로그인때 필요한 데이터
			const mbtiImg = await Api.get('/mbtiInfo/INFP');
			const password = process.env.REACT_APP_GOOGLE_CLIENT_PASSWORD_KEY;
			try {
				// 전체 멤버 중 같은 이메일이 있다면 로그인 로직, 없다면 회원가입 로직 실행
				// 회원가입 post 요청
				await Api.post('/members/signup', {
					nickname: oauthInfo.data.id,
					mbti: 'INFP',
					email: oauthInfo.data.email,
					password,
					img: mbtiImg.data.img,
				});
				// 로그인
				const loginData = await Api.post('/members/signin', {
					email: oauthInfo.data.email,
					password,
				});
				const {
					memberId,
					accessToken,
					refreshToken,
					accessTokenExpirationTime,
					refreshTokenExpirationTime,
				} = loginData.data;

				// 로그인 정보 업데이트
				dispatch(
					UPDATE({
						id: memberId,
						nickname: oauthInfo.data.id,
						mbti: 'INFP',
						email: oauthInfo.data.email,
						img: mbtiImg.data.img,
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
			} catch (error: any) {
				if (error.response.status === 500) {
					// 이미 회원가입이 되어 있어 바로 로그인하는 경우
					// const userInfo = await Api.get(`/members/${oauthInfo.data.id}`);
					// 서버 연결코드
					const loginData = await Api.post('/members/signin', {
						email: oauthInfo.data.email,
						password: process.env.REACT_APP_GOOGLE_CLIENT_PASSWORD_KEY,
					});
					const {
						// eslint-disable-next-line no-shadow
						memberId,
						accessToken,
						refreshToken,
						accessTokenExpirationTime,
						refreshTokenExpirationTime,
					} = loginData.data;
					// axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

					// 로그인 정보 업데이트
					const userInfo1 = await Api.get(`members/${memberId}`);
					const { nickname, mbti, email, img, badge } = userInfo1.data;
					dispatch(
						UPDATE({
							id: memberId,
							nickname,
							mbti,
							email,
							img,
							badge,
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
				} else {
					navigate('/error');
				}
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
		const accessToken2 = hash.split('=')[1].split('&')[0];
		setLocalStorage('accessToken', accessToken2);
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
				const mbtiImg = await Api.get('/mbtiInfo/INFP');
				const userCheck = await Api.get(`/members`);
				const password = process.env.REACT_APP_NAVER_CLIENT_PASSWORD;

				// 회원가입이 안되있다면
				if (
					userCheck.data.filter((el: { email: string }) => el.email === email)
						.length === 0
				) {
					// 회원가입 post 요청
					// 서버 회원가입 요청 코드
					await Api.post('/members/signup', {
						nickname,
						mbti: 'INFP',
						email,
						password,
						img: mbtiImg.data.img,
					});
					// 서버 로그인 요청 코드
					const loginData = await Api.post('/members/signin', {
						email,
						password,
					});
					const {
						memberId,
						accessToken,
						refreshToken,
						accessTokenExpirationTime,
						refreshTokenExpirationTime,
					} = loginData.data;

					// 로그인 정보 업데이트
					dispatch(
						UPDATE({
							id: memberId,
							nickname,
							mbti: 'INFP',
							email,
							img: mbtiImg.data.img,
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
					// 서버 연결시 코드 const userInfo = await Api.get(`/members/${memberId}`);
					// 서버 로그인 요청 코드
					const loginData = await Api.post('/members/signin', {
						email,
						password,
					});
					const {
						memberId,
						accessToken,
						refreshToken,
						accessTokenExpirationTime,
						refreshTokenExpirationTime,
					} = loginData.data;

					const userInfo = await Api.get(`/members/${memberId}`);
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

// 카카오 oauth(javascript sdk 방식)
const { Kakao } = window as any;
export const KakaoRedirectHandler = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const code = new URL(document.location.toString()).searchParams.get('code');
		const grantType = 'authorization_code';
		const clientId = process.env.REACT_APP_KAKAO_CLIENT_ID;
		const redirectUri = process.env.REACT_APP_KAKAO_REDIRECT_URI;

		const getData = async () => {
			try {
				// 카카오에 로그인 요청 -> 토큰을 받는다.
				const resToken = await axios.post(
					`https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${clientId}&redirect_uri=${redirectUri}&code=${code}`,
					{
						headers: {
							'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
						},
					},
				);

				const {
					// eslint-disable-next-line camelcase
					refresh_token,
					// eslint-disable-next-line camelcase
					access_token,
					// eslint-disable-next-line camelcase
					expires_in,
					// eslint-disable-next-line camelcase
					refresh_token_expires_in,
				} = resToken.data;

				// 토큰 저장
				setCookie('refreshToken', refresh_token, {
					path: '/',
					sameSite: 'none',
					secure: true,
				});
				setLocalStorage('accessToken', access_token);
				setLocalStorage('kakao', 'true');
				setLocalStorage('empiresAtAccess', expires_in);
				setLocalStorage('empiresAtRefresh', refresh_token_expires_in);
				Kakao.Auth.setAccessToken(access_token);

				// 유저 정보 요청 -> id, email, nickname을 받는다.
				const resUserInfo = await axios.post(
					'https://kapi.kakao.com/v2/user/me',
					{},
					{
						headers: {
							// eslint-disable-next-line camelcase
							Authorization: `Bearer ${access_token}`,
							'Content-Type': 'application/x-www-form-urlencoded',
						},
					},
				);
				// 유저 정보 저장
				const {
					id,
					kakao_account: { profile, email },
				} = resUserInfo.data;
				const { nickname } = profile;
				dispatch(LOGIN({ accessToken: `${getLocalStorage('accessToken')}` }));

				try {
					// 전체 멤버 중 같은 이메일이 있다면 로그인 로직, 없다면 회원가입 로직 실행
					const allMember = await Api.get('/members');
					console.log(allMember.data);
					if (
						allMember.data.find((v: { email: string }) => v.email === email)
					) {
						// 로그인 -> 마이페이지 이동
						const loginData = await Api.post('/members/signin', {
							email,
							password: `${process.env.REACT_APP_KAKAO_CLIENT_ID}`,
						});

						// 새로운 id와 토큰 발급
						const {
							memberId,
							accessToken,
							refreshToken,
							accessTokenExpirationTime,
							refreshTokenExpirationTime,
						} = loginData.data.data;

						const userInfo3 = await Api.get(`/members/${memberId}`);
						// 유저 정보 저장
						dispatch(
							UPDATE({
								id: memberId,
								email: userInfo3.data.email,
								nickname: userInfo3.data.nickname,
								mbti: userInfo3.data.mbti,
								img: userInfo3.data.img,
								badge: userInfo3.data.badge,
							}),
						);
						// 토큰 저장
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
					} else {
						// 회원가입 아직 안했을 경우 -> 유저 수정 페이지로 이동
						const mbtiImg = await Api.get('/mbtiInfo/INFP');
						await Api.post('/members/signup', {
							nickname,
							mbti: 'INFP',
							email,
							password: `${process.env.REACT_APP_KAKAO_CLIENT_ID}`,
							img: mbtiImg.data.img,
						});
						// 로그인
						const loginData = await Api.post('/members/signin', {
							email,
							password: `${process.env.REACT_APP_KAKAO_CLIENT_ID}`,
						});
						// 새로운 id와 토큰 발급
						const {
							memberId,
							accessToken,
							refreshToken,
							accessTokenExpirationTime,
							refreshTokenExpirationTime,
						} = loginData.data.data;

						const userInfo3 = await Api.get(`/members/${memberId}`);
						// 유저 정보 저장
						dispatch(
							UPDATE({
								id: memberId,
								email: userInfo3.data.email,
								nickname: userInfo3.data.nickname,
								mbti: userInfo3.data.mbti,
								img: userInfo3.data.img,
								badge: userInfo3.data.badge,
							}),
						);
						// 토큰 저장
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
					}
				} catch (err: any) {
					navigate('/error');
				}
			} catch (err: any) {
				navigate('/error');
			}
		};

		getData();
	}, [dispatch, navigate]);
};
