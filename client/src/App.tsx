import './Global.css';

import { lazy, Suspense } from 'react';

import { Route, Routes } from 'react-router-dom';

import OauthJoinHandler from './apis/OauthHandler';
import Footer from './Components/common/Footer';
import Header from './Components/common/Header';
import Empty from './Components/member/Empty';
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
import HotReview from './pages/HotReview';
import Landing from './pages/Landing';
import Loading from './pages/Loading';
import Join from './pages/member/Join';
import Login from './pages/member/Login';
import Logout from './pages/member/Logout';
import UserEdit from './pages/member/UserEdit';
import HotPlace from './pages/NearbyPlace';
import RegionRec from './pages/RegionRecommend';
import Search from './pages/Search';

const MainPage = lazy(() => import('./pages/MainPage'));
const Mypage = lazy(() => import('./pages/member/Mypage'));
const RegionDetail = lazy(() => import('./pages/RegionDetail'));

function App() {
	// oauth google클릭 때만 실행되는 로직
	if (new URL(window.location.href).pathname === '/accounts/google/login/')
		OauthJoinHandler();

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
					<Route path="/accounts/google/login/*" element={<Empty />} />
				</Routes>
			</Suspense>
			<Footer />
		</div>
	);
}

export default App;
