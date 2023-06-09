import './Global.css';

import { lazy, Suspense } from 'react';

import { Route, Routes } from 'react-router-dom';

import { OauthHandler } from './apis/OauthHandler';
import Footer from './Components/common/Footer';
import Header from './Components/common/Header';
import Empty from './Components/member/Empty';
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
import RegionRec from './pages/contents/RegionRecommend';
import Join from './pages/member/Join';
import Login from './pages/member/Login';
import Logout from './pages/member/Logout';
import Manager from './pages/member/Manager';
import MemberPost from './pages/member/MemberPost';
import UserEdit from './pages/member/UserEdit';
import Search from './pages/Search';

const MainPage = lazy(() => import('./pages/common/MainPage'));
const Mypage = lazy(() => import('./pages/member/Mypage'));
const RegionDetail = lazy(() => import('./pages/contents/RegionDetail'));
const NearbyPlace = lazy(() => import('./pages/contents/NearbyPlace'));

function App() {
	// oauth
	OauthHandler();

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
					<Route path="/accounts/google/login/*" element={<Empty />} />
					<Route path="/Api/Member/Oauth/*" element={<Empty />} />
					<Route path="/oauth/*" element={<Empty />} />
					<Route path="/manager" element={<Manager />} />
					<Route path="/memberpost/:id" element={<MemberPost />} />
				</Routes>
			</Suspense>
			<Footer />
		</div>
	);
}

export default App;
