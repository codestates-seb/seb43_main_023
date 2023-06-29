import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ISearchMenu {
	menu: string;
}

const initialState: ISearchMenu = {
	menu: '전체',
};

const SearchMenuSlice = createSlice({
	name: 'searchMenu',
	initialState,
	reducers: {
		SEARCHMENU: (
			state: ISearchMenu,
			action: PayloadAction<ISearchMenu>,
		): ISearchMenu => {
			return { menu: action.payload.menu };
		},
	},
});

export const { SEARCHMENU } = SearchMenuSlice.actions;
export default SearchMenuSlice.reducer;
