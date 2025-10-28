// list all planets
// let user select a planet for travel

import React, { useContext, useEffect, useState } from 'react';
import SpaceTravelApi from '../services/SpaceTravelApi';
import Loading, { showLoading, hideLoading } from '../components/Loading';
import { SpaceTravelContext } from '../context/SpaceTravelContext';

import "./Planets.css";

export default function Planets()
{
    // read planets to display page
    // const [planets, setPlanets] = useState([]);

    // async function showPlanets()
    // {
    //     showLoading();

    //     let res = await SpaceTravelApi.getPlanets();
    //     if (res.isError)
    //     {
    //         console.error("Fetching planets failed");
    //     }
    //     else
    //     {
    //         setPlanets(res.data);
    //     }

    //     hideLoading();
    // }

    // // update planet list on startup
    // useEffect(() => { showPlanets(); }, []);

    const planets = useContext(SpaceTravelContext).planets;

    return (
        <div>
            Planets:
            {
                planets.map((planet, index) => (
                    <div key={index}>
                        <h5>{planet.name}</h5>
                        <img src={planet.pictureUrl}></img>
                    </div>
                ))
            }
        </div>
    );
}
