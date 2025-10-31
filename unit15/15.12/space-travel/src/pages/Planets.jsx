import { useContext, useRef, useState } from 'react';
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

    // array of refs to planet components/elements
    const planetElements = useRef([]);

    const handlePlanetClick = (ev, id, key) =>
    {
        // is planet already selected? if not, deselect the old one
        if (selectedPlanet && planets[id] != selectedPlanet)
        {
            // planetElements.current[selectedPlanet.id] = "planet";
            planetElements.current.forEach(p => p.className = "planet");
        }
        // select the planet that was clicked on
        setSelectedPlanet(planets[id]);
        // add the 'selected' class to that element using the key
        planetElements.current[key].className = "planet-selected";
    };

    const handleCraftClick = async (ev, id) =>
    {
        ev.stopPropagation();
        // find this ship's object
        let thisCraft = crafts.find(craft => craft.id === id);
        // has a planet been selected?
        if (!selectedPlanet)
        {
            return;
        }
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
        <div id='planet-container'>
            {loading && <Loading />}
            {
                planets.map((planet, index) => (
                    <div 
                        className='planet' 
                        tabIndex={0} 
                        key={index} 
                        onClick={(ev) => handlePlanetClick(ev, planet.id, index)} 
                        // ref accepts a function; the argument passed to it will be the node in the dom
                        ref={element => planetElements.current[index] = element}
                    >
                        <h5>{planet.name}</h5>
                        <img id='planet-icon' src={planet.pictureUrl}></img>
                        {
                            // check if any ships are here
                            (locations.filter(location => location.planet === index).map((locat, ind) =>
                            {
                                return (
                                    <div className='planet-craft' key={ind} onClick={(ev) => handleCraftClick(ev, locat.spacecraft.id)}>
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
