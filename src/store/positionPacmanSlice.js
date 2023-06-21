import { createSlice } from '@reduxjs/toolkit';

const positionPacmanSlice = createSlice({
    name: 'position',
    initialState: {
        coordinate: {
            x: 0,
            y: 0
        },
        speed: 500

    },
    reducers: { 
        changePosition(state, action) {
            state.coordinate.x = action.payload.x;
            state.coordinate.y = action.payload.y;
        },
        setSpeed(state, action) {
            state.speed = action.payload;
        }
        
    },
});

// достали наши методы редюсеры
export const {changePosition, setSpeed} = positionPacmanSlice.actions;

export default positionPacmanSlice.reducer;