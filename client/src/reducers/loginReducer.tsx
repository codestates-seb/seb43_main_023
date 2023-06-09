import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Ilogin } from '../type/Ilogin';

const initialState: Ilogin = {
	isLogin: false,
	accessToken: undefined,
};

const loginSlice = createSlice({
	name: 'isLogin',
	initialState,
	reducers: {
		LOGIN: (
			state: Ilogin,
			action: PayloadAction<{ accessToken?: string }>,
		): Ilogin => {
			return { isLogin: true, ...action.payload };
		},
		LOGOUT: (): Ilogin => {
			return { ...initialState };
		},
	},
});

export const { LOGIN, LOGOUT } = loginSlice.actions;
export default loginSlice.reducer;
