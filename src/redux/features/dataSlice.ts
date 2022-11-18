import { createSlice } from "@reduxjs/toolkit";
import { IDataType } from "../../constant/interface";

export const initialState: IDataType[] = [
	{
		key: '0',
		firstName: 'Edward',
		secondName: 'King',
		lastName: 'Source',
		cars:[
			{brand: 'ford'},
			{brand: 'mitsubishi'},
			{brand: 'BMW'},
		],
	},
	{
		key: '1',
		firstName: 'Ray',
		secondName: 'King',
		lastName: 'Source',
		cars:[
			{brand: 'ford'},
			{brand: 'mitsubishi'},
			{brand: 'BMW'},
		],
	},
	{
		key: '2',
		firstName: 'Nitoshi',
		secondName: 'King',
		lastName: 'Source',
		cars:[
			{brand: 'ford'},
			{brand: 'mitsubishi'},
			{brand: 'BMW'},
		],
	}
];

export const dataSlice = createSlice({
	name: "data",
	initialState,
	reducers: {
		addState: (state, action ) => {
			const newState = [...state, action.payload];
			return newState
		},
		addMasState: (state, action) => {
			const newState = [...state, ...action.payload];
			return newState
		},
		editState: ( state, action ) => {
			const editState: IDataType[] = [];
			state.forEach((item: IDataType) => {
				editState.push(item.key === action.payload.key ? action.payload : item);
			});
			return editState
		},
		deleteState: ( state, action ) => {
			const deleteState = state.filter(item => item.key !== action.payload);
			return deleteState
		}
	}
});

export const { addState,addMasState, editState, deleteState } = dataSlice.actions;
export default dataSlice.reducer;
