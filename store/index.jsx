import { configureStore } from '@reduxjs/toolkit';
import { passportReducer } from './passportSlice';


export const store = configureStore({ reducer: {passport: passportReducer} });