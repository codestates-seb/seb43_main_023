import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../../Util/customAxios';

declare global {
	interface Window {
		kakao: any;
	}
}

interface Type {
	x: string;
	y: string;
}

function MapContainer() {
	const { id } = useParams();

	const postData = useAxios({
		method: 'get',
		url: `/posts/${id}`,
	});

	useEffect(() => {
		if (postData.response) {
			const data: Type = postData.response;
			const markerPosition = new window.kakao.maps.LatLng(
				Number(data.y),
				Number(data.x),
			);

			const marker = {
				position: markerPosition,
			};

			const container = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스
			const options = {
				// 지도를 생성할 때 필요한 기본 옵션
				center: new window.kakao.maps.LatLng(Number(data.y), Number(data.x)), // 지도의 중심좌표.
				level: 3, // 지도의 레벨(확대, 축소 정도)
				marker,
			};

			// const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
			const staticMap = new window.kakao.maps.StaticMap(container, options);
		}
	}, [postData.response]);

	return <div id="map" style={{ width: '84vw', height: '20vh' }} />;
}

export default MapContainer;
