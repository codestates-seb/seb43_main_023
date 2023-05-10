// eslint-disable-next-line import/no-extraneous-dependencies
import { combineReducers } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { persistReducer } from 'redux-persist';
// eslint-disable-next-line import/no-extraneous-dependencies
import storage from 'redux-persist/lib/storage/session';

import { configureStore, Store } from '@reduxjs/toolkit';

import loginReducer, { Ilogin } from '../Reducers/loginReducer';
import userInfoReducer, { Iuser } from '../Reducers/userInfoReducer';

const reducers = combineReducers({
	user: userInfoReducer,
	login: loginReducer,
});

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['user', 'login'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export type RootState = {
	user: Iuser;
	login: Ilogin;
};

const store: Store<RootState> = configureStore({
	reducer: persistedReducer,
});

export default store;
