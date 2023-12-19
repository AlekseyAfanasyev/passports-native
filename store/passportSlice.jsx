import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    passports: [],
    passport: {},
};

export const passportSlice = createSlice({
    name: 'passport',
    initialState,
    reducers: {
        setPassports: (state, { payload }) => {
            console.log('setPassports');
            state.passports = payload;
        },
        setPassport: (state, { payload }) => {
            console.log('setPassport');
            state.passport = payload;
        },
        resetPassport: (state) => {
            console.log('resetPassport');
            state.passport = {};
        },
    },
});

export const passportReducer = passportSlice.reducer;

export const { setPassports, setPassport, resetPassport } = passportSlice.actions;