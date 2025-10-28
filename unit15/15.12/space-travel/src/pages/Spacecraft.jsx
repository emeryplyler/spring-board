// display detailed info on specific spacecraft
/*

{
    id: <string>,
    name: <string>,
    capacity: <int>,
    description: <string>,
    pictureUrl: [<string>],
    currentLocation: <int>
  }

*/
// dynamic page

import React, { useContext, useState } from 'react';
import SpaceTravelApi from '../services/SpaceTravelApi';
import { useLoaderData } from 'react-router-dom';
import { SpaceTravelContext } from '../context/SpaceTravelContext';

// is passed a spacecraft object
export default function Spacecraft()
{
    const craft = useLoaderData();

    // load the craft's current planet;
    // it needs an initial value and then after fetching from the api a real value
    // because it needs to change later, it has to be stateful
    // currentLocation is the only one that needs to be decoded after another api call, so we don't need the entire craft to be stateful

    // const [location, setLocation] = useState("Locating spacecraft...");

    const planets = useContext(SpaceTravelContext).planets;

    // on page load, fetch planet array from api
    // const getPlanet = async (planet) =>
    // {
    //     const res = await SpaceTravelApi.getPlanets();
    //     if (res.isError || !res.data)
    //     {
    //         console.error;
    //     }
    // };
    // getPlanet(); // setPlanet to real value

    return (
        <div>
            <h4>Name: {craft.name}</h4>
            <p>Capacity: {craft.capacity} passengers</p>
            <p>Current location: {planets[craft.currentLocation].name}</p>
            <p>{craft.description}</p>
        </div>
    );
}

// loader function
export const craftLoader = async ({ params }) =>
{
    const id = params.id;
    const res = await SpaceTravelApi.getSpacecraftById({ id });

    if (res.isError || !res.data)
    {
        console.error("Couldn't fetch spacecraft data in craftLoader");
    }
    else
    {
        return res.data;
    }
};

