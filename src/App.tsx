import React, {createContext, useContext, useEffect, useState} from 'react';
import "./scss/app.scss"
import Header from "./components/Header/Header";
import {
    Routes,
    Route,
} from "react-router-dom";
import Main from "./pages/Main/Main";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart/Cart";
import PizzaDetails from "./pages/PizzaDetails";
import MainLayout from "./layouts/MainLayout";


function App() {
    return (
        <Routes >
            <Route to={"/"} element={<MainLayout/>}>
                <Route path={""} element={<Main/>}/>
                <Route path={"cart"} element={<Cart/>}/>
                <Route path={"pizza/:id"} element={<PizzaDetails/>}/>
                <Route path={"*"} element={<NotFound/>}/>
            </Route>
        </Routes>

    );
}

export default App