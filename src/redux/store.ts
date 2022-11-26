import {configureStore} from "@reduxjs/toolkit";
import filterReducer from "./features/filterSlice";
import cartSlice from "./features/cartSlice";
import pizzaSlice from "./features/pizzaSlice";

export const store = configureStore({
    reducer: {
        filter: filterReducer,
        cart: cartSlice,
        pizza: pizzaSlice
    },
})