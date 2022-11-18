import { configureStore } from "@reduxjs/toolkit";
import dataReduser from "./features/dataSlice";
import modalReduser from './features/modalSlice'

export const store = configureStore({
	reducer: {
		data: dataReduser,
		modal: modalReduser
	}
	
});

