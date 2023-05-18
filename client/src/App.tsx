import './Global.css';

import { lazy, Suspense } from 'react';

import { Route, Routes } from 'react-router-dom';

import Footer from './Components/Footer';
import Header from './Components/Header';
import OauthJoinHandler from './Components/member/OauthHandler';
import EtcTalk from './pages/Community/EtcTalk';
import Main from './pages/Community/Main';
import MBTI from './pages/Community/MBTI';
import PostDetail from './pages/Community/PostDetail';
import PostUpdate from './pages/Community/PostUpdate';
import PostUpload from './pages/Community/PostUpload';
import ReviewDetail from './pages/Community/ReiviewDetail';
import TripMate from './pages/Community/TripMate';
import TripReview from './pages/Community/TripReview';
import Error from './pages/Error';
import HotPlace from './pages/HotPlace';
import HotReview from './pages/HotReview';
import Landing from './pages/Landing';
import Loading from './pages/Loading';
import Join from './pages/member/Join';
import Login from './pages/member/Login';
import Logout from './pages/member/Logout';
import UserEdit from './pages/member/UserEdit';
import RegionRec from './pages/RegionRecommend';
import Search from './pages/Search';

const MainPage = lazy(() => import('./pages/MainPage'));
const Mypage = lazy(() => import('./pages/member/Mypage'));
const RegionDetail = lazy(() => import('./pages/RegionDetail'));

function App() {
	const url = new URL(window.location.href); // 현재 url 가져오기
	const { hash } = url; // url에서 hash값 가져오기
	// hash값이 accessToken이 포함된 경우 실행(oauth google클릭 때만 실행됨)
	if (hash.split('=')[0] === '#access_token') OauthJoinHandler();

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
					<Route path="/hotplace" element={<HotPlace />} />
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
