import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IKeyword {
	keyword: string;
}

const initialState: IKeyword = {
	keyword: '',
};

const KeywordSlice = createSlice({
	name: 'searchKeyword',
	initialState,
	reducers: {
		KEYWORD: (state: IKeyword, action: PayloadAction<IKeyword>): IKeyword => {
			return { keyword: action.payload.keyword };
		},
	},
});

export const { KEYWORD } = KeywordSlice.actions;
export default KeywordSlice.reducer;
