import { useEffect, useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type AxiosProps = {
	method: 'get';
	url: string;
};

const useAxios = ({ url, method }: AxiosProps) => {
	const [response, setResponse] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		axios[method](`${process.env.REACT_APP_API_URL}${url}`)
			.then((res) => {
				setResponse(res.data);
			})
			.catch(() => {
				console.log(`error: ${url}`);
				navigate('/error');
			});
	}, [method, navigate, url]);

	return { response };
};

export default useAxios;
