import { createSlice } from '@reduxjs/toolkit';

const soundsSlice = createSlice({
    name: 'sound',
    initialState: {
        isMuted: true,
        isGameOver: false,
        isWin: false
    },
    reducers: { 
        changeState(state, action) {
            state.isMuted = action.payload;
        },
        handleGameOver(state, action) {
            state.isGameOver = action.payload;
        },
        handelWin(state, action) {
            state.isWin = action.payload;
        }
        
    },
});

// достали наши методы редюсеры
export const {changeState, handleGameOver, handelWin} = soundsSlice.actions;

export default soundsSlice.reducer;