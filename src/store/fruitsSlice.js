import { createSlice } from '@reduxjs/toolkit';

const fruitsSlice = createSlice({
    name: 'fruits',
    initialState: {
        fruits: []
    },
    reducers: { 
        setFruits(state, action) {
            state.fruits = [...action.payload];
        }
    },
});

// достали наши методы редюсеры
export const {setFruits} = fruitsSlice.actions;
export default fruitsSlice.reducer;