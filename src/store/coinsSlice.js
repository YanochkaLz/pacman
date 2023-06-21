import { createSlice } from '@reduxjs/toolkit';

const coinsSlice = createSlice({
    name: 'coins',
    initialState: {
        coins: [],
        score: 0,
        totalCoins: 0
    },
    reducers: { 
        setCoinsArray(state, action) {
            state.coins = [...action.payload];
            state.score++;
        },
        setScore(state, action) {
            state.score = action.payload;
        },
        setTotalCoins(state, action) {
            state.totalCoins = action.payload;
        }
    },
});

// достали наши методы редюсеры
export const {setCoinsArray, setScore, setTotalCoins} = coinsSlice.actions;

export default coinsSlice.reducer;