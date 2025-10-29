import { RouterProvider } from "react-router-dom";
import styles from "./App.module.css";

import SpaceTravelApi from "./services/SpaceTravelApi";
import { useEffect, useState } from "react";
import { SpaceTravelContext } from "./context/SpaceTravelContext";

import { router } from "./routes/Routes";
import Loading from "./components/Loading";

function App()
{
    const [spaceData, setSpaceData] = useState({
        crafts: [],
        planets: []
    });

    // async function that will run on page load and retrieve the list of spacecraft and planets to give to child components
    // also called by Construction and InListSpacecraft when ships are created and deleted
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
            console.error("couldn't get planet array");
        }
        else
        {
            // update planets property
            setSpaceData(prevData => ({ ...prevData, planets: planetRes.data }));
        }
    }
    useEffect(() => { getSpaceData(); }, []);

    // function to delete a spacecraft; called by InListSpacecraft
    const destroySpacecraft = (id) =>
    {
        console.log("destroy ship with id " + id);
    }

    // context value to pass down to child elements
    const contextValue = {
        crafts: spaceData.crafts,
        planets: spaceData.planets,
        destroySpacecraft,
        update: getSpaceData
    }


    if (spaceData.planets.length < 1 || spaceData.crafts.length < 1)
    {
        return (
            <Loading />
        );
    }

    return (
        <>
            <h1>Space Travel</h1>
            <SpaceTravelContext.Provider value={contextValue}>
                <RouterProvider router={router} />
            </SpaceTravelContext.Provider>

        </>
    );
}

export default App;
