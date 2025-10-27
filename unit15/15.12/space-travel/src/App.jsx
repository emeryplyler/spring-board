import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from "react-router-dom";
import styles from "./App.module.css";

import NavBar from "./components/NavBar";
import Homepage from "./pages/Homepage";
import Planets from "./pages/Planets";
import Spacecrafts from "./pages/Spacecrafts";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={
                // create Layout
                <>
                    <NavBar routes={['Planets', 'Spacecraft']} />
                    <Outlet />
                </>
            }
        >
            <Route index element={<Homepage />} />
            <Route path="/planets" element={<Planets />} />
            <Route path="/spacecraft" element={<Spacecrafts />} />

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
