import axios, { AxiosInstance } from 'axios';

// import { refresh, refreshErrorHandle } from './refresh';

const baseURL =
	'http://ec2-15-164-104-51.ap-northeast-2.compute.amazonaws.com:8080';

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
		config.headers.Authorization = `Bearer ${localStorage.getItem(
			'accessToken',
		)}`;
		return config;
	},
	(err) => {
		return Promise.reject(err);
	},
);

/*
Api.interceptors.request.use(refresh, refreshErrorHandle);
실패하면 header에 accessToken만 넣기
*/
