import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from "react-router-dom";
import styles from "./App.module.css";

import NavBar from "./components/NavBar";
import Homepage from "./pages/Homepage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={
                // create Layout
                <>
                    <NavBar routes={['about']} />
                    <Outlet />
                </>
            }
        >
            <Route index element={<Homepage />} />
            <Route path="/about" element={<div>about</div>} />

        </Route>
    )
);

function App()
{
    return (
        <>
            <h1>Space Travel</h1>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
