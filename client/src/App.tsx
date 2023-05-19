import './Global.css';

import { lazy, Suspense } from 'react';

import { Route, Routes } from 'react-router-dom';

import Footer from './Components/common/Footer';
import Header from './Components/common/Header';
import OauthJoinHandler from './Components/mmm/OauthHandler';
import EtcTalk from './ppp/ccc/EtcTalk';
import Main from './ppp/ccc/Main';
import MBTI from './ppp/ccc/MBTI';
import PostDetail from './ppp/ccc/PostDetail';
import PostUpdate from './ppp/ccc/PostUpdate';
import PostUpload from './ppp/ccc/PostUpload';
import ReviewDetail from './ppp/ccc/ReiviewDetail';
import TripMate from './ppp/ccc/TripMate';
import TripReview from './ppp/ccc/TripReview';
import Error from './ppp/common/Error';
import Landing from './ppp/common/Landing';
import Loading from './ppp/common/Loading';
import HotReview from './ppp/contents/HotReview';
import NearbyPlace from './ppp/contents/NearbyPlace';
import RegionRec from './ppp/contents/RegionRecommend';
import Join from './ppp/mmm/Join';
import Login from './ppp/mmm/Login';
import Logout from './ppp/mmm/Logout';
import UserEdit from './ppp/mmm/UserEdit';
import Search from './ppp/Search';

const MainPage = lazy(() => import('./ppp/common/MainPage'));
const Mypage = lazy(() => import('./ppp/mmm/Mypage'));
const RegionDetail = lazy(() => import('./ppp/contents/RegionDetail'));

function App() {
	const url = new URL(window.location.href); // 현재 url 가져오기
	const { hash } = url; // url에서 hash값 가져오기
	if (hash.split('=')[0] === '#access_token') {
		// hash값이 accessToken이 포함된 경우 실행(oauth google클릭 때만 실행됨)
		OauthJoinHandler();
	}

	return (
		<div>
			<Header />
			<Suspense fallback={<Loading />}>
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/main" element={<MainPage />} />
					<Route path="/join" element={<Join />} />
					<Route path="/login" element={<Login />} />
					<Route path="/logout" element={<Logout />} />
					<Route path="/mypage" element={<Mypage />} />
					<Route path="/useredit" element={<UserEdit />} />
					<Route path="/tripreview" element={<TripReview />} />
					<Route path="/tripreview/:id" element={<ReviewDetail />} />
					<Route path="/tripmate" element={<TripMate />} />
					<Route path="/mbti" element={<MBTI />} />
					<Route path="/community" element={<Main />} />
					<Route path="/community/:id" element={<PostDetail />} />
					<Route path="/community/create" element={<PostUpload />} />
					<Route path="/community/:id/update" element={<PostUpdate />} />
					<Route path="/tripreview/:id/update" element={<PostUpdate />} />
					<Route path="/etctalk" element={<EtcTalk />} />
					<Route path="/hotplace" element={<NearbyPlace />} />
					<Route path="/hotreview" element={<HotReview />} />
					<Route path="/error" element={<Error />} />
					<Route path="/loading" element={<Loading />} />
					<Route path="/regionrec" element={<RegionRec />} />
					<Route path="/regiondetail/:id" element={<RegionDetail />} />
					<Route path="/search" element={<Search />} />
				</Routes>
			</Suspense>
			<Footer />
		</div>
	);
}

export default App;
