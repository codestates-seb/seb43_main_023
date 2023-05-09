import './Global.css';

import { Route, Routes } from 'react-router-dom';

import Footer from './Components/Footer';
import Header from './Components/Header';
import EtcTalk from './Pages/Community/EtcTalk';
import Main from './Pages/Community/Main';
import MBTI from './Pages/Community/MBTI';
import PostDetail from './Pages/Community/PostDetail';
import ReviewDetail from './Pages/Community/ReiviewDetail';
import TripMate from './Pages/Community/TripMate';
import TripReview from './Pages/Community/TripReview';
import HotPlace from './Pages/HotPlace';
import HotReview from './Pages/HotReview';
import Join from './Pages/Join';
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import MainPage from './Pages/MainPage';
import Mypage from './Pages/Mypage';
import UserEdit from './Pages/UserEdit';
import PostUpload from './Pages/Community/PostUpload';
import PostUpdate from './Pages/Community/PostUpdate';
import RegionDetail from './Pages/RegionDetail';
import RegionRec from './Pages/RegionRecommend';

function App() {
	return (
		<div className="App">
			<Header />
			<Routes>
				<Route path="/" element={<MainPage />} />
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
				<Route path="/etctalk" element={<EtcTalk />} />
				<Route path="/hotplace" element={<HotPlace />} />
				<Route path="/hotreview" element={<HotReview />} />
				<Route path="/regionrec" element={<RegionRec />} />
				<Route path="/regiondetail" element={<RegionDetail />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
