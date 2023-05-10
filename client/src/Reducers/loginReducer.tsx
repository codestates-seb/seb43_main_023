import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
	isLogin: false,
	accessToken: '',
};

export interface Ilogin {
	isLogin: boolean;
	accessToken: string;
}

const loginSlice = createSlice({
	name: 'isLogin',
	initialState,
	reducers: {
		LOGIN: (
			state: Ilogin,
			action: PayloadAction<{ accessToken: string }>,
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
