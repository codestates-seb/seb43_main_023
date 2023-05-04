import './Global.css';

import { Route, Routes } from 'react-router-dom';

import Footer from './Components/Footer';
import Header from './Components/Header';
import EtcTalk from './Pages/Community/EtcTalk';
import MBTI from './Pages/Community/MBTI';
import Main from './Pages/Community/Main';
import PostDetail from './Pages/Community/PostDetail';
import ReviewDetail from './Pages/Community/ReiviewDetail';
import TripMate from './Pages/Community/TripMate';
import TripReview from './Pages/Community/TripReview';
import HotPlace from './Pages/HotPlace';
import HotReview from './Pages/HotReview';
import Join from './Pages/Join';
import Login from './Pages/Login';
import MainPage from './Pages/MainPage';
import Mypage from './Pages/Mypage';
import RegionRec from './Pages/RegionRecommend';

function App() {
	return (
		<div className="App">
			<Header />
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/join" element={<Join />} />
				<Route path="/login" element={<Login />} />
				<Route path="/mypage" element={<Mypage />} />
				<Route path="/tripreview" element={<TripReview />} />
				<Route path="/tripreview/:id" element={<ReviewDetail />} />
				<Route path="/tripmate" element={<TripMate />} />
				<Route path="/mbti" element={<MBTI />} />
				<Route path="/community" element={<Main />} />
				<Route path="/community/:id" element={<PostDetail />} />
				<Route path="/etctalk" element={<EtcTalk />} />
				<Route path="/hotplace" element={<HotPlace />} />
				<Route path="/hotreview" element={<HotReview />} />
				<Route path="/regionrec" element={<RegionRec />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
