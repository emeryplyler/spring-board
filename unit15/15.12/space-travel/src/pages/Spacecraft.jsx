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

import React from 'react';
import SpaceTravelApi from '../services/SpaceTravelApi';

// is passed a spacecraft object
export default function Spacecraft({ spacecraft })
{
    return (
        <ul>
            Spacecraft
            <li>Name: {spacecraft.name}</li>
            <li>Description: {spacecraft.description}</li>
        </ul>
    );
}

// loader function
const craftLoader = async (id) =>
{
    const res = await SpaceTravelApi.getSpacecraftById(id);

    if (res.isError)
    {
        console.error("Couldn't fetch spacecraft data in craftLoader");
    }
    else
    {
        return res.data;
    }
}
