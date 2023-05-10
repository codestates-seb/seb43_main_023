import { configureStore, Store } from '@reduxjs/toolkit';

import loginReducer from '../Reducers/loginReducer';
import userInfoReducer, { Iuser } from '../Reducers/userInfoReducer';

export type RootState = {
	userInfoReducer: Iuser;
	loginReducer: object;
};

const store: Store<RootState> = configureStore({
	reducer: {
		userInfoReducer,
		loginReducer,
	},
});

export default store;
