import React, { useEffect } from 'react';

declare global {
	interface Window {
		kakao: any;
	}
}

function MapContainer() {
	useEffect(() => {
		const container = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스
		const options = {
			// 지도를 생성할 때 필요한 기본 옵션
			center: new window.kakao.maps.LatLng(34.7604, 127.6622), // 지도의 중심좌표.
			level: 3, // 지도의 레벨(확대, 축소 정도)
		};

		const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
	}, []);

	return <div id="map" style={{ width: '84vw', height: '20vh' }} />;
}

export default MapContainer;
