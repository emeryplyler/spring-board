import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from "react-router-dom";
import styles from "./App.module.css";

import NavBar from "./components/NavBar";
import Homepage from "./pages/Homepage";
import Planets from "./pages/Planets";
import Spacecrafts from "./pages/Spacecrafts";
import SpaceTravelApi from "./services/SpaceTravelApi";
import Spacecraft, { craftLoader } from "./pages/Spacecraft";
import { useEffect, useState } from "react";
import { hideLoading, showLoading } from "./components/Loading";

function App()
{
    const [crafts, setCrafts] = useState([]);

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

                {/* {
                    crafts.map(craft => (
                        // use stateful array to dynamically make pages for each spacecraft?
                        <Route
                            key={craft.id}
                            path={`/ships/${craft.id}`}
                            element={<Spacecraft />}
                            loader={craftLoader}
                        />
                    ))
                } */}

                <Route path="ships/:id" element={<Spacecraft />} loader={craftLoader} />

                <Route path="/*" element={<div>404</div>} />

            </Route>
        )
    );

    // TODO: using the loading trick in getCrafts doesn't work;
    // when the page first loads, it goes straight to the 404 because the spacecraft's page and route havent been created yet
    // it then switches to the spacecraft's page once they're done being made, but the timing is messed up and the 'Loading...' just stays there
    // TRY LOADERS
    async function getCrafts() 
    {
        let res = await SpaceTravelApi.getSpacecrafts();
        if (res.isError)
        {
            console.error("couldn't get the list of spacecrafts to make pages");
        }
        else
        {
            setCrafts(res.data);
        }
    }
    useEffect(() => { getCrafts(); }, []);

    return (
        <>
            <h1>Space Travel</h1>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
