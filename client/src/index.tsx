// eslint-disable-next-line import/no-extraneous-dependencies
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { persistStore } from 'redux-persist';
// eslint-disable-next-line import/no-extraneous-dependencies
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import ScrollToTop from './hooks/ScrollToTop';
import store from './sss/store';

const persistor = persistStore(store);

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);
root.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<CookiesProvider>
				<BrowserRouter>
					<ScrollToTop />
					<App />
				</BrowserRouter>
			</CookiesProvider>
		</PersistGate>
	</Provider>,
);
