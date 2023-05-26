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

// oauth 구글
export function OauthGoogleHandler() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(() => {
		const url = new URL(window.location.href);
		const { hash } = url;
		// 플랫폼 로그인 후 받아오는 token값
		const googleToken = hash.split('=')[1].split('&')[0];
		console.log(googleToken);
		async function getData() {
			// 구글token을 서버에 보내서 자체 토큰과 유저정보 요청
			const googleData = await Api.post('/auth/google', { googleToken });
			const { tokenInfo, email, name, password } = googleData.data;
			const {
				memberId,
				accessToken,
				accessTokenExpirationTime,
				refreshToken,
				refreshTokenExpirationTime,
			} = tokenInfo;

			try {
				// 처음 회원가입 시 임의의 mbti를 정해 이미지 변수 할당
				const mbtiData = await Api.get('/mbtiInfo/INFP');
				const mbtiImg = mbtiData.data.img;

				// 서버에서 받은 name이 null값이 아니라면 서버에서 받은 name정보 사용, 없다면 임의 지정
				const displayName = name === null ? 'client' : name;

				// 전체 멤버 중 같은 이메일이 있다면 로그인 로직, 없다면 회원가입 로직 실행
				const allMember = await Api.get('/members');

				// 토큰 저장
				dispatch(LOGIN({ accessToken: `${accessToken}` }));
				setCookie('refreshToken', refreshToken, {
					path: '/',
					sameSite: 'none',
					secure: true,
				});
				setLocalStorage('accessToken', accessToken);
				setLocalStorage('empiresAtAccess', accessTokenExpirationTime);
				setLocalStorage('empiresAtRefresh', refreshTokenExpirationTime);

				if (
					// 회원가입
					allMember.data.find((v: { email: string }) => v.email === email) ===
					undefined
				) {
					await Api.post('/members/signup', {
						nickname: displayName,
						mbti: 'INFP',
						email,
						password,
						img: mbtiImg,
					});
					// 로그인
					const loginData = await Api.post('/members/signin', {
						email,
						password,
					});
					/*
					const {
						memberId,
						accessToken,
						refreshToken,
						accessTokenExpirationTime,
						refreshTokenExpirationTime,
					} = loginData.data;
					*/
					// 로그인 정보 전역상태 업데이트
					dispatch(
						UPDATE({
							id: memberId,
							nickname: displayName,
							mbti: 'INFP',
							email,
							img: mbtiImg,
							badge: null,
						}),
					);

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
					// 로그인
					const loginData = await Api.post('/members/signin', {
						email,
						password,
					});
					/*
					const {
						memberId,
						accessToken,
						refreshToken,
						accessTokenExpirationTime,
						refreshTokenExpirationTime,
					} = loginData.data;
					*/

					// 로그인 정보 업데이트
					const userInfo1 = await Api.get(`members/${memberId}`);
					const { nickname, mbti, img, badge } = userInfo1.data;
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
			} catch (err) {
				navigate('/error');
			}
		}
		getData();
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
		const naverToken = hash.split('=')[1].split('&')[0];
		console.log(naverToken);
		async function getData() {
			// 구글token을 서버에 보내서 자체 토큰과 유저정보 요청
			const naverData = await Api.post('/auth/naver', { naverToken });
			const { tokenInfo, email, name, password } = naverData.data;
			const {
				memberId,
				accessToken,
				accessTokenExpirationTime,
				refreshToken,
				refreshTokenExpirationTime,
			} = tokenInfo;

			try {
				// 처음 회원가입 시 임의의 mbti를 정해 이미지 변수 할당
				const mbtiData = await Api.get('/mbtiInfo/INFP');
				const mbtiImg = mbtiData.data.img;

				// 서버에서 받은 name이 null값이 아니라면 서버에서 받은 name정보 사용, 없다면 임의 지정
				const displayName = name === null ? 'client' : name;

				// 전체 멤버 중 같은 이메일이 있다면 로그인 로직, 없다면 회원가입 로직 실행
				const allMember = await Api.get('/members');

				// 토큰 저장
				dispatch(LOGIN({ accessToken: `${accessToken}` }));
				setCookie('refreshToken', refreshToken, {
					path: '/',
					sameSite: 'none',
					secure: true,
				});
				setLocalStorage('accessToken', accessToken);
				setLocalStorage('empiresAtAccess', accessTokenExpirationTime);
				setLocalStorage('empiresAtRefresh', refreshTokenExpirationTime);

				if (
					// 회원가입
					allMember.data.find((v: { email: string }) => v.email === email) ===
					undefined
				) {
					await Api.post('/members/signup', {
						nickname: displayName,
						mbti: 'INFP',
						email,
						password,
						img: mbtiImg,
					});
					// 로그인
					const loginData = await Api.post('/members/signin', {
						email,
						password,
					});
					/*
					const {
						memberId,
						accessToken,
						refreshToken,
						accessTokenExpirationTime,
						refreshTokenExpirationTime,
					} = loginData.data;
					*/
					// 로그인 정보 전역상태 업데이트
					dispatch(
						UPDATE({
							id: memberId,
							nickname: displayName,
							mbti: 'INFP',
							email,
							img: mbtiImg,
							badge: null,
						}),
					);

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
					// 로그인
					const loginData = await Api.post('/members/signin', {
						email,
						password,
					});
					/*
					const {
						memberId,
						accessToken,
						refreshToken,
						accessTokenExpirationTime,
						refreshTokenExpirationTime,
					} = loginData.data;
					*/

					// 로그인 정보 업데이트
					const userInfo1 = await Api.get(`members/${memberId}`);
					const { nickname, mbti, img, badge } = userInfo1.data;
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
			} catch (err) {
				navigate('/error');
			}
		}
		getData();
	}, [dispatch, navigate]);
}

// 카카오 oauth(javascript sdk 방식)
const { Kakao } = window as any;
export const KakaoRedirectHandler = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const code = getLocalStorage('code');
		const grantType = 'authorization_code';
		const clientId = process.env.REACT_APP_KAKAO_CLIENT_ID;
		const redirectUri = 'http://localhost:3000/oauth';

		const getData = async () => {
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
			const mbtiImg = await Api.get('/mbtiInfo/INFP');
			setLocalStorage('email', email);
			setLocalStorage('nickname', nickname);
			dispatch(LOGIN({ accessToken: `${getLocalStorage('accessToken')}` }));

			// 회원가입 아직 안했을 경우 -> 유저 수정 페이지로 이동
			try {
				await Api.post('/members/signup', {
					nickname: getLocalStorage('nickname'),
					mbti: 'INFP',
					email: getLocalStorage('email'),
					password: `${process.env.REACT_APP_KAKAO_CLIENT_ID}`,
					img: mbtiImg.data.img,
				});

				const loginData = await Api.post('/members/signin', {
					email: getLocalStorage('email'),
					password: `${process.env.REACT_APP_KAKAO_CLIENT_ID}`,
				});
				const {
					memberId,
					accessToken,
					refreshToken,
					accessTokenExpirationTime,
					refreshTokenExpirationTime,
				} = loginData.data.data;
				// 토큰 저장
				setCookie('refreshToken', refreshToken, {
					path: '/',
					sameSite: 'none',
					secure: true,
				});
				setLocalStorage('accessToken', accessToken);
				setLocalStorage('kakao', 'true');
				setLocalStorage('empiresAtAccess', accessTokenExpirationTime);
				setLocalStorage('empiresAtRefresh', refreshTokenExpirationTime);

				// 유저 정보 저장
				dispatch(
					UPDATE({
						id: memberId,
						email: getLocalStorage('email'),
						nickname: getLocalStorage('nickname'),
						mbti: 'INFP',
						img: mbtiImg.data.img,
						badge: null,
					}),
				);

				Swal.fire({
					icon: 'success',
					title: '회원가입되었습니다.',
					text: '마이페이지에서 정보를 수정해주세요.',
				}).then((result) => {
					if (result.isConfirmed) {
						navigate('/useredit');
					}
				});
			} catch (err: any) {
				// 회원가입 이미 해서 에러인 경우 -> 로그인 후 메인페이지로 이동
				if (err.response.status === 500) {
					// 서버 연결 코드
					const loginData = await Api.post('/members/signin', {
						email: getLocalStorage('email'),
						password: `${process.env.REACT_APP_KAKAO_CLIENT_ID}`,
					});
					const {
						memberId,
						accessToken,
						refreshToken,
						accessTokenExpirationTime,
						refreshTokenExpirationTime,
					} = loginData.data.data;
					// 토큰 저장
					setCookie('refreshToken', refreshToken, {
						path: '/',
						sameSite: 'none',
						secure: true,
					});
					setLocalStorage('accessToken', accessToken);
					setLocalStorage('kakao', 'true');
					setLocalStorage('empiresAtAccess', accessTokenExpirationTime);
					setLocalStorage('empiresAtRefresh', refreshTokenExpirationTime);

					const userData = await Api.get(`/members/${memberId}`);
					// 유저 정보 저장
					dispatch(
						UPDATE({
							id: memberId,
							email: userData.data.email,
							nickname: userData.data.nickname,
							mbti: userData.data.mbti,
							img: userData.data.img,
							badge: userData.data.badge,
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
				} else {
					navigate('/error');
				}
			}
		};
		getData();
	}, [dispatch, navigate]);
};
