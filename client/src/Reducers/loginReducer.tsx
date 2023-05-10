import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLogin: false,
};

const loginSlice = createSlice({
	name: 'isLogin',
	initialState,
	reducers: {
		LOGIN: () => {
			return { isLogin: true };
		},
		LOGOUT: () => {
			return { isLogin: false };
		},
	},
});

export const { LOGIN, LOGOUT } = loginSlice.actions;
export default loginSlice.reducer;
