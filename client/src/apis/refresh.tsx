// post, update요청을 보내다가 accesstoken이 만료될 시 refreshtoken을 가지고 accesstoken을 발급해주는 함수
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';

import { getCookie, removeCookie } from '../utils/cookie';

const refresh = async (
	config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => {
	const refreshToken = getCookie('refreshToken');
	let expiresAtAccess = localStorage.getItem('expiresAtAccess');
	const expiresAtRefresh = localStorage.getItem('expiresAtRefresh');
	let accessToken = localStorage.getItem('accessToken');

	// refreshToken, accessToken 모두 만료되었을 때
	if (moment(Number(expiresAtRefresh)).diff(moment()) < 0) {
		window.localStorage.clear();
		window.location.href = '/login';
	}
	// 토큰이 만료되었고, refreshToken 이 저장되어 있을 때
	//  or if (error.response.status === 401)
	else if (moment(Number(expiresAtAccess)).diff(moment()) < 0 && refreshToken) {
		// 토큰 갱신 서버통신
		const data = await axios.post('http://localhost:4000/members/reissue', {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${refreshToken}`,
			},
			withCredentials: true,
		});

		accessToken = data.headers.Authorization;
		expiresAtAccess = data.headers.AccessTokenExpirationTime;

		localStorage.setItem('accessToken', data.data.accessToken);
		localStorage.setItem(
			'expiresAtAccess',
			moment().add(1, 'hour').format('yyyy-MM-DD HH:mm:ss'),
		);
	}
	// eslint-disable-next-line no-param-reassign
	config.headers.Authorization = `Bearer ${accessToken}`;
	return config;
};

const refreshErrorHandle = (err: AxiosError) => {
	removeCookie('refreshToken');
	return Promise.reject(err);
};

export { refresh, refreshErrorHandle };
