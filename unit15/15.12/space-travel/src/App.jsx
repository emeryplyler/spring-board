import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from "react-router-dom";
import styles from "./App.module.css";

import NavBar from "./components/NavBar";
import Homepage from "./pages/Homepage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<Homepage />}
        />
    )
);

function App()
{
    return (
        <>
            <h1>Space Travel</h1>
            <NavBar routes={['home', 'info', 'about']} />
            <RouterProvider router={router} />
        </>
    );
}

export default App;
