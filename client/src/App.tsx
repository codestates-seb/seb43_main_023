import './Global.css';

import { lazy, Suspense } from 'react';

import { Route, Routes } from 'react-router-dom';

import { OauthGoogleHandler, OauthNaverHandler } from './apis/OauthHandler';
import Footer from './Components/common/Footer';
import Header from './Components/common/Header';
import Empty from './Components/member/Empty';
import Error from './pages/common/Error';
import Landing from './pages/common/Landing';
import Loading from './pages/common/Loading';
import EtcTalk from './pages/Community/EtcTalk';
import Main from './pages/Community/Main';
import MBTI from './pages/Community/MBTI';
import PostDetail from './pages/Community/PostDetail';
import PostUpdate from './pages/Community/PostUpdate';
import PostUpload from './pages/Community/PostUpload';
import ReviewDetail from './pages/Community/ReiviewDetail';
import TripMate from './pages/Community/TripMate';
import TripReview from './pages/Community/TripReview';
import HotReview from './pages/contents/HotReview';
import HotPlace from './pages/contents/NearbyPlace';
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
	// oauth google클릭 때만 실행되는 로직
	if (new URL(window.location.href).pathname === '/accounts/google/login/')
		OauthGoogleHandler();
	if (new URL(window.location.href).pathname === '/Api/Member/Oauth')
		OauthNaverHandler();
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
					<Route path="/Api/Member/Oauth/*" element={<Empty />} />
				</Routes>
			</Suspense>
			<Footer />
		</div>
	);
}

export default App;
