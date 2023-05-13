import './Global.css';

import { lazy, Suspense } from 'react';

import { Route, Routes } from 'react-router-dom';

import Footer from './Components/Footer';
import Header from './Components/Header';
import EtcTalk from './Pages/Community/EtcTalk';
import Main from './Pages/Community/Main';
import MBTI from './Pages/Community/MBTI';
import PostDetail from './Pages/Community/PostDetail';
import PostUpdate from './Pages/Community/PostUpdate';
import PostUpload from './Pages/Community/PostUpload';
import ReviewDetail from './Pages/Community/ReiviewDetail';
import TripMate from './Pages/Community/TripMate';
import TripReview from './Pages/Community/TripReview';
import Error from './Pages/Error';
import HotPlace from './Pages/HotPlace';
import HotReview from './Pages/HotReview';
import Landing from './Pages/Landing';
import Loading from './Pages/Loading';
import Join from './Pages/member/Join';
import Login from './Pages/member/Login';
import Logout from './Pages/member/Logout';
import UserEdit from './Pages/member/UserEdit';
import RegionDetail from './Pages/RegionDetail';
import RegionRec from './Pages/RegionRecommend';

const MainPage = lazy(() => import('./Pages/MainPage'));
const Mypage = lazy(() => import('./Pages/member/Mypage'));

function App() {
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
				</Routes>
			</Suspense>
			<Footer />
		</div>
	);
}

export default App;
