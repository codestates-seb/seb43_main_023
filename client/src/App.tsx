import './Global.css';

import { lazy, Suspense } from 'react';

import { Route, Routes } from 'react-router-dom';

import OauthJoinHandler from './apis/OauthHandler';
import Footer from './Components/common/Footer';
import Header from './Components/common/Header';
import Error from './pages/common/Error';
import Landing from './pages/common/Landing';
import Loading from './pages/common/Loading';
import EtcTalk from './pages/community/EtcTalk';
import Main from './pages/community/Main';
import MBTI from './pages/community/MBTI';
import PostDetail from './pages/community/PostDetail';
import PostUpdate from './pages/community/PostUpdate';
import PostUpload from './pages/community/PostUpload';
import ReviewDetail from './pages/community/ReiviewDetail';
import TripMate from './pages/community/TripMate';
import TripReview from './pages/community/TripReview';
import HotReview from './pages/contents/HotReview';
import NearbyPlace from './pages/contents/NearbyPlace';
import RegionRec from './pages/contents/RegionRecommend';
import Join from './pages/member/Join';
import Login from './pages/member/Login';
import Logout from './pages/member/Logout';
import UserEdit from './pages/member/UserEdit';
import Search from './pages/Search';

const MainPage = lazy(() => import('./pages/common/MainPage'));
const Mypage = lazy(() => import('./pages/member/Mypage'));
const RegionDetail = lazy(() => import('./pages/contents/RegionDetail'));

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
