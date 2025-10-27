// list all planets
// let user select a planet for travel

import React, { useEffect, useState } from 'react';
import SpaceTravelApi from '../services/SpaceTravelApi';

export default function Planets()
{
    // read planets to display page
    const [planets, setPlanets] = useState([]);

    async function showPlanets()
    {
        let res = await SpaceTravelApi.getPlanets();
        if (res.isError)
        {
            console.error("Fetching planets failed");
        }
        else
        {
            setPlanets(res.data);
        }


    }

    // update planet list on startup
    useEffect(() => { showPlanets(); }, []);

    return (
        <div>
            Planets:
            {
                planets.map((planet, index) => (
                    <div key={index}>{planet.name}</div>
                ))
            }
        </div>
    );
}
