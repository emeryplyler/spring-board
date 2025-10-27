import { configureStore } from '@reduxjs/toolkit';
import pizzaReducer from './pizzaSlice';
import counterReducer from './counterSlice';

export const store = configureStore({
    reducer: {
        pizza: pizzaReducer,
        counter: counterReducer,
    }
});
