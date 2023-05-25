import axios, { AxiosInstance } from 'axios';

import { getLocalStorage } from '../utils/LocalStorage';

// import { refresh, refreshErrorHandle } from './refresh';

const baseURL = 'http://localhost:4000';

// eslint-disable-next-line import/prefer-default-export
export const Api: AxiosInstance = axios.create({
	baseURL,
	timeout: 10000,
	params: {},
});

Api.interceptors.response.use(
	(config) => {
		return config;
	},
	(err) => {
		return Promise.reject(err);
	},
);
Api.interceptors.request.use(
	(config) => {
		// eslint-disable-next-line no-param-reassign
		config.headers.Authorization = `Bearer ${getLocalStorage('accessToken')}`;
		return config;
	},
	(err) => {
		return Promise.reject(err);
	},
);

/*
서버 연결시 이 코드로 변경
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import Swal from 'sweetalert2';

import { getCookie, removeCookie } from '../utils/cookie';
import { getLocalStorage, setLocalStorage } from '../utils/LocalStorage';

const baseURL = process.env.REACT_APP_API_URL;

// eslint-disable-next-line import/prefer-default-export
export const Api: AxiosInstance = axios.create({
	baseURL,
	timeout: 10000,
	params: {},
});

Api.interceptors.response.use(
	(config: AxiosResponse) => {
		return config;
	},
	(err: AxiosError) => {
		return Promise.reject(err);
	},
);

// post, patch 요청 시 header에 토큰을 담아주는 역할!
// accessToken 만료 시 refreshtoken으로 새로운 accessToken발급해주는 역할!
Api.interceptors.request.use(
	async (config) => {
		// eslint-disable-next-line no-param-reassign
		config.headers.Authorization = `Bearer ${getLocalStorage('accessToken')}`;
		return config;
	},
	async (err: AxiosError) => {
		const refreshToken = getCookie('refreshToken');

		if (err.response && err.response.status === 401) {
			try {
				const refreshData = await Api.post(
					'/members/reissue',
					{},
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${refreshToken}`,
						},
						withCredentials: true,
					},
				);

				setLocalStorage('accessToken', refreshData.data.accessToken);
				setLocalStorage('expiresAtAccess', refreshData.data.expiresAtAccess);
				setLocalStorage('expiresAtRefresh', refreshData.data.expiresAtRefresh);

				const originalRequest = err.config;
				originalRequest!.headers.Authorization = `Bearer ${getLocalStorage(
					'accessToken',
				)}`;
				return axios(originalRequest!);
			} catch (refreshError) {
				removeCookie('refreshToken');
				return Swal.fire({
					icon: 'warning',
					title: '토큰만료',
					text: '다시 로그인 하셔야 합니다.',
					showCancelButton: true,
					confirmButtonText: '로그인',
					cancelButtonText: '취소',
				}).then(async (res) => {
					if (res.isConfirmed) {
						window.location.assign('/login');
					} else {
						window.location.assign('/error');
					}
				});
			}
		} else {
			return Promise.reject(err);
		}
	},
);
*/
