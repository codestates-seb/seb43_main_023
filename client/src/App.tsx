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
import Error from './Pages/Error';
import HotPlace from './Pages/HotPlace';
import HotReview from './Pages/HotReview';
import Loading from './Pages/Loading';
import MainPage from './Pages/MainPage';
import Join from './Pages/member/Join';
import Login from './Pages/member/Login';
import Logout from './Pages/member/Logout';
import Mypage from './Pages/member/Mypage';
import UserEdit from './Pages/member/UserEdit';

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
				<Route path="/etctalk" element={<EtcTalk />} />
				<Route path="/hotplace" element={<HotPlace />} />
				<Route path="/hotreview" element={<HotReview />} />
				<Route path="/error" element={<Error />} />
				<Route path="/loading" element={<Loading />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
