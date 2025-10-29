import { useContext } from 'react';
import { SpaceTravelContext } from '../context/SpaceTravelContext';

import "./Planets.css";

export default function Planets()
{
    const planets = useContext(SpaceTravelContext).planets;

    // find which ships are on which planets
    const crafts = useContext(SpaceTravelContext).crafts;
    // { planet index, spacecraft name and link, icon }
    const locations = crafts.map(craft => ({ planet: craft.currentLocation, spacecraft: craft.name, icon: craft.pictureUrl }));

    return (
        <div>
            Planets:
            {
                planets.map((planet, index) => (
                    <div key={index}>
                        <h5>{planet.name}</h5>
                        <img src={planet.pictureUrl}></img>
                        {
                            // check if any ships are here
                            (locations.filter(location => location.planet === index).map((locat, ind) =>
                            {
                                return (
                                    <div key={ind}>
                                        <p>{locat.spacecraft}</p>
                                        {/* TODO: add a default icon for ships without pictures? */}
                                        <img id='craft-icon' src={locat.icon}></img>
                                    </div>
                                );
                            }))
                        }
                    </div>
                ))
            }
        </div>
    );
}
