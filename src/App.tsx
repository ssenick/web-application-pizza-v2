import "./scss/app.scss"
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages";
import Layout from "./Layout/Layout";
import React, {Suspense, lazy} from "react";
import {Loading} from "./components";

const Cart = lazy(() => import('./pages/Cart'));
const ItemPage = lazy(() => import('./pages/ItemPage/ItemPage'));

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="cart" element={
                        <Suspense fallback={<Loading/>}>
                            <Cart/>
                        </Suspense>
                    }/>
                    <Route path=":id" element={
                        <Suspense fallback={<Loading/>}>
                            <ItemPage/>
                        </Suspense>
                    }/>
                    <Route path="cart/:id" element={
                        <Suspense fallback={<Loading/>}>
                            <ItemPage/>
                        </Suspense>
                    }/>
                    <Route path="*" element={<Home/>}/>
                </Route>
            </Routes>

        </div>
    )
}

export default App;

