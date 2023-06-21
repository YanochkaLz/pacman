import {configureStore} from '@reduxjs/toolkit';
import positionPacmanSlice from './positionPacmanSlice';
import coinsSlice from './coinsSlice';
import soudsSlice from './soudsSlice';
import currentLevel from './currentLevel';
import fruitsSlice from './fruitsSlice';

export default configureStore({
    reducer: { // хранятся все редюсеры
        position: positionPacmanSlice,
        coins: coinsSlice,
        soundsSlice: soudsSlice,
        level: currentLevel,
        fruits: fruitsSlice
    }
});