import { useEffect } from 'react';

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { LOGIN } from '../../reducers/loginReducer';
import { UPDATE } from '../../reducers/userInfoReducer';
import { setCookie } from '../../util/cookie';
import { Api } from '../../util/customAPI';

export default function OauthJoinHandler() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// oauth 구글 회원가입, 로그인(if문으로 구분됨)
	useEffect(() => {
		const url = new URL(window.location.href);
		const { hash } = url;
		const accessToken = hash.split('=')[1].split('&')[0];
		async function getData() {
			try {
				// oauth 접근, 로그인 실행
				await axios.get(
					`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`,
					{
						headers: {
							authorization: `token ${accessToken}`,
							accept: 'application/json',
						},
					},
				);
				// oauth 로그인 정보 가져오기(id, email)
				const oauthInfo = await axios.get(
					'https://www.googleapis.com/oauth2/v2/userinfo',
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					},
				);
				// eslint-disable-next-line no-console
				console.log(oauthInfo.data); // oauth data(id, email)

				// 회원가입과 로그인 공통 정보 업데이트
				const mbtiImg = await Api.get('/mbtiInfo');
				const userCheck = await Api.get(`/members`);
				const memberId = Number(oauthInfo.data.id);
				const password = process.env.REACT_APP_GOOGLE_CLIENT_PASSWORD_KEY;
				const refreshToken = 'token2';
				dispatch(LOGIN({ accessToken: `${accessToken}` }));
				setCookie('refreshToken', refreshToken, {
					path: '/',
					sameSite: 'none',
					secure: true,
				});
				localStorage.setItem('accessToken', accessToken);
				localStorage.setItem('empiresAtAccess', '1800000');
				localStorage.setItem('empiresAtRefresh', '9900000');

				// 서버 연결하면 사용할 코드(수정 필요)
				/*
				const loginData = await Api.post('/auth/login', {
					email: oauthInfo.data.email,
					password: oauthInfo.data.id,
				});
				const memberId = loginData.response.data.memberId;
				const accessToken = loginData.response.data.accessToken
				const refreshToken = loginData.response.data.refreshToken
				const empiresAtAccess = loginData.response.data.accessTokenExpirationTime;
				const empiresAtRefresh = loginData.response.data.refreshTokenExpirationTime;
				axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
				*/

				// 회원가입이 안되있다면
				if (
					userCheck.data.filter((el: { id: number }) => el.id === memberId)
						.length === 0
				) {
					// 회원가입 post 요청
					await Api.post('/members', {
						id: memberId,
						nickname: oauthInfo.data.id,
						mbti: 'INFP',
						email: oauthInfo.data.email,
						password,
						img: mbtiImg.data.find((v: { mbti: string }) => v.mbti === 'INFP')
							.img,
						badge: null,
					});
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
					const userInfo = await Api.get(`/members/${memberId}`);
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
