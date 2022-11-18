import { createSlice } from "@reduxjs/toolkit";
import { ModalType } from "../../constant/enum";

export const initialState = false;

export const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		switchModal: (state, action) => {
			if (action.payload === ModalType.OPEN_MODAL) {
				return true
			};
			if (action.payload === ModalType.CLOSED_MODAL) {
				return false
			};
		}
	}
});

export const { switchModal } = modalSlice.actions

export default modalSlice.reducer