import { useEffect, useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type AxiosProps = {
	method: 'get' | 'post' | 'patch' | 'delete';
	url: string;
	body?: object;
};

const useAxios = ({ url, method, body }: AxiosProps) => {
	const [response, setResponse] = useState(null);
	const [loading, setloading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		axios[method](`http://localhost:4000${url}`, body)
			.then((res) => {
				setResponse(res.data);
			})
			.catch(() => {
				navigate('/error');
			})
			.finally(() => {
				setloading(false);
			});
	}, [body, method, navigate, url]);

	return { response, loading };
};

export default useAxios;

/*
const SERVER_ADDRESS = 'http://localhost:4000';
const customAxios: AxiosInstance = axios.create({
	baseURL: `${SERVER_ADDRESS}`,
	headers: {
		Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
	},
	withCredentials: true,
});
export default customAxios;

import { customAxios } from '../../Util/customAxios';

const requestPost = async (postDto) => {
  const res = await customAxios.post('/write-post', postDto);
}
 */
