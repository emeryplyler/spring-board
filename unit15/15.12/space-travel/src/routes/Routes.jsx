import { createBrowserRouter, createRoutesFromElements, Outlet, Route } from "react-router-dom";

import NavBar from "../components/NavBar";
import Homepage from "../pages/Homepage";
import Planets from "../pages/Planets";
import Spacecrafts from "../pages/Spacecrafts";
import Spacecraft from "../pages/Spacecraft";

export const router = createBrowserRouter(
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

            <Route path="ships/:id" element={<Spacecraft />} />

            <Route path="/*" element={<div>404</div>} />

        </Route>
    )
);
