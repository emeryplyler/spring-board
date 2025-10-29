// list all planets
// let user select a planet for travel

import { useContext } from 'react';
import { SpaceTravelContext } from '../context/SpaceTravelContext';

import "./Planets.css";

export default function Planets()
{
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
