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
import { SpaceTravelContext } from "./context/SpaceTravelContext";

function App()
{
    const [spaceData, setSpaceData] = useState({
        crafts: [],
        planets: []
    });

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route
                path="/"
                element={
                    // create Layout
                    <>
                        <NavBar routes={['Planets', 'Spacecraft']} />
                        <SpaceTravelContext.Provider value={spaceData}>
                            <Outlet />
                        </SpaceTravelContext.Provider>

                    </>
                }
            >
                <Route index element={<Homepage />} />
                <Route path="/planets" element={<Planets />} />
                <Route path="/spacecraft" element={<Spacecrafts />} />

                <Route path="ships/:id" element={<Spacecraft />} loader={craftLoader} />

                <Route path="/*" element={<div>404</div>} />

            </Route>
        )
    );

    // async function that will run on page load and retrieve the list of spacecraft and planets to give to child components
    async function getSpaceData() 
    {
        let craftRes = await SpaceTravelApi.getSpacecrafts();
        if (craftRes.isError || !craftRes.data)
        {
            console.error("couldn't get the list of spacecrafts");
        }
        else
        {
            // update the crafts property to the new spacecraft list
            setSpaceData(prevData => ({ ...prevData, crafts: craftRes.data }));
        }

        let planetRes = await SpaceTravelApi.getPlanets();
        if (planetRes.isError || !planetRes.data)
        {
            console.error("couldn't get planet array")
        }
        else
        {
            // update planets property
            setSpaceData(prevData => ({ ...prevData, planets: planetRes.data}))
        }
    }
    useEffect(() => { getSpaceData(); }, []);

    return (
        <>
            <h1>Space Travel</h1>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
