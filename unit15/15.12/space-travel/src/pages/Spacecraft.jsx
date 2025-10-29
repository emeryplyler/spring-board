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

import React, { useContext, useEffect, useState } from 'react';
import SpaceTravelApi from '../services/SpaceTravelApi';
import { useLoaderData, useParams } from 'react-router-dom';
import { SpaceTravelContext } from '../context/SpaceTravelContext';
import Loading from '../components/Loading';

// is passed a spacecraft object
export default function Spacecraft()
{
    const { id } = useParams();
    const planets = useContext(SpaceTravelContext).planets;

    const [craft, setCraft] = useState(null);

    // on page load, fetch planet array from api
    useEffect(() =>
    {
        // async function
        const loadCraft = async () =>
        {
            const res = await SpaceTravelApi.getSpacecraftById({ id });
            if (res.isError || !res.data)
            {
                throw new Error(`Spacecraft not found using id ${id}`);
            }
            setCraft(res.data); // update craft
        };

        // call async function:
        loadCraft();
    }, []);

    // make sure to wait for both the Spacecraft api call here and the Planets api call in App.jsx
    if (!craft || planets.length < 1)
    {
        return (
            <Loading />
        );
    }

    return (
        <div>
            <h4>Name: {craft.name}</h4>
            <p>Capacity: {craft.capacity} passengers</p>
            <p>Current location: {planets[craft.currentLocation].name}</p>
            <img src={craft.pictureUrl}></img>
            <p>{craft.description}</p>
        </div>
    );
}
