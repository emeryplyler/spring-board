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
import { useLoaderData } from 'react-router-dom';

// is passed a spacecraft object
export default function Spacecraft()
{
    const craft = useLoaderData();

    return (
        <ul>
            Spacecraft
            <li>Name: {craft.name}</li>
            <li>Description: {craft.description}</li>
        </ul>
    );
}

// loader function
export const craftLoader = async ({ params }) =>
{
    const id = params.id;
    const res = await SpaceTravelApi.getSpacecraftById({id});

    if (res.isError)
    {
        console.error("Couldn't fetch spacecraft data in craftLoader");
    }
    else
    {
        return res.data;
    }
};
