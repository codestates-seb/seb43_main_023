import './Global.css';

import { lazy, Suspense } from 'react';

import { Route, Routes } from 'react-router-dom';

import Footer from './Components/common/Footer';
import Header from './Components/common/Header';
import OauthJoinHandler from './Components/Member/OauthHandler';
import Error from './Pages/common/Error';
import Landing from './Pages/common/Landing';
import Loading from './Pages/common/Loading';
import EtcTalk from './Pages/Community/EtcTalk';
import Main from './Pages/Community/Main';
import MBTI from './Pages/Community/MBTI';
import PostDetail from './Pages/Community/PostDetail';
import PostUpdate from './Pages/Community/PostUpdate';
import PostUpload from './Pages/Community/PostUpload';
import ReviewDetail from './Pages/Community/ReiviewDetail';
import TripMate from './Pages/Community/TripMate';
import TripReview from './Pages/Community/TripReview';
import HotReview from './Pages/contents/HotReview';
import NearbyPlace from './Pages/contents/NearbyPlace';
import RegionRec from './Pages/contents/RegionRecommend';
import Join from './Pages/Member/Join';
import Login from './Pages/Member/Login';
import Logout from './Pages/Member/Logout';
import UserEdit from './Pages/Member/UserEdit';
import Search from './Pages/Search';

const MainPage = lazy(() => import('./Pages/common/MainPage'));
const Mypage = lazy(() => import('./Pages/Member/Mypage'));
const RegionDetail = lazy(() => import('./Pages/contents/RegionDetail'));

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
