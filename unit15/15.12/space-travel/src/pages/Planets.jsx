import { useContext, useState } from 'react';
import { SpaceTravelContext } from '../context/SpaceTravelContext';

import "./Planets.css";
import Loading from '../components/Loading';

export default function Planets()
{
    const { planets, moveSpacecraft, update } = useContext(SpaceTravelContext);

    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const [loading, setLoading] = useState(false);

    // find which ships are on which planets
    const crafts = useContext(SpaceTravelContext).crafts;
    // { planet index, spacecraft name and link, icon }
    const locations = crafts.map(craft => ({ planet: craft.currentLocation, spacecraft: craft, icon: craft.pictureUrl }));

    const handlePlanetClick = (ev, id) =>
    {
        // select the planet that was clicked on
        setSelectedPlanet(planets[id]);
    };

    const handleCraftClick = async (ev, id) =>
    {
        // find this ship's object
        console.log(id);
        let thisCraft = crafts.find(craft => craft.id === id);
        // check if ship is already on selectedPlanet; if so, return
        if (thisCraft.currentLocation === selectedPlanet.id)
        {
            console.log("Ship is already on that planet");
        }
        else
        {
            // put up loading screen
            setLoading(true);
            // moveSpacecraft(craft id, planet id) and wait
            const res = await moveSpacecraft(id, selectedPlanet.id);
            if (res.isError)
            {
                console.error("Couldn't send ship");
            }
            else
            {
                // update and wait
                await update();
            }
            // take down loading screen
            setLoading(false);
        }
    };



    return (
        <div>
            { loading && <Loading />}
            Planets:
            {
                planets.map((planet, index) => (
                    <div tabIndex={0} key={index} onClick={(ev) => handlePlanetClick(ev, planet.id)}>
                        <h5>{planet.name}</h5>
                        <img id='planet-icon' src={planet.pictureUrl}></img>
                        {
                            // check if any ships are here
                            (locations.filter(location => location.planet === index).map((locat, ind) =>
                            {
                                return (
                                    <div key={ind} onClick={(ev) => handleCraftClick(ev, locat.spacecraft.id)}>
                                        <p>{locat.spacecraft.name}</p>
                                        {/* TODO: add a default icon for ships without pictures? */}
                                        <img id='craft-icon' src={locat.icon} ></img>
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
