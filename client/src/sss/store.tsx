// eslint-disable-next-line import/no-extraneous-dependencies
import { combineReducers } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { persistReducer } from 'redux-persist';
// eslint-disable-next-line import/no-extraneous-dependencies
import storage from 'redux-persist/lib/storage/session';

import { configureStore, Store } from '@reduxjs/toolkit';

import loginReducer, { Ilogin } from '../rrr/loginReducer';
import searchKeywordReducer, { IKeyword } from '../rrr/searchKeywordReducer';
import userInfoReducer, { Iuser } from '../rrr/userInfoReducer';

const reducers = combineReducers({
	user: userInfoReducer,
	login: loginReducer,
	search: searchKeywordReducer,
});

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['user', 'login', 'search'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export type RootState = {
	user: Iuser;
	login: Ilogin;
	search: IKeyword;
};

const store: Store<RootState> = configureStore({
	reducer: persistedReducer,
});

export default store;
