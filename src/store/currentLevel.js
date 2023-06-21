import { createSlice } from '@reduxjs/toolkit';

const currentLevelSlice = createSlice({
    name: 'level',
    initialState: {
        level: []
    },
    reducers: { 
        setCurrentlevel(state, action) {
            state.level = [...action.payload];
        }
    },
});

// достали наши методы редюсеры
export const {setCurrentlevel} = currentLevelSlice.actions;
export default currentLevelSlice.reducer;