import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Iuser } from '../type/Iuser';

const initialState: Iuser = {
	id: 0,
	email: '',
	nickname: '',
	mbti: '',
	img: '',
	badge: null,
};

const userInfoSlice = createSlice({
	name: 'changeInfo',
	initialState,
	reducers: {
		UPDATE: (state: Iuser, action: PayloadAction<Iuser>): Iuser => {
			return { ...state, ...action.payload };
		},
		DELETE: (): Iuser => {
			return { ...initialState };
		},
	},
});

export const { UPDATE, DELETE } = userInfoSlice.actions;
export default userInfoSlice.reducer;
