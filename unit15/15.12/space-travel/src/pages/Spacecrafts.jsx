import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { SpaceTravelContext } from '../context/SpaceTravelContext';
import InListSpacecraft from '../components/InListSpacecraft';
import Loading from '../components/Loading';

export default function Spacecrafts()
{
    const {crafts: spacecrafts, destroySpacecraft, update } = useContext(SpaceTravelContext);
    const [selectedCraft, setSelectedCraft] = useState(null);
    const [loading, setLoading] = useState(false);

    const destroy = async (id) =>
    {
        setLoading(true); // start the delete process; hide behind loading screen
        const res = await destroySpacecraft(id); // retrieve promise from destroy function in App.jsx and wait for it
        if (res.isError)
        {
            console.error("couldn't destroy ship with id " + id);
        }
        else
        {
            await update(); // call the update function to update the state array of ships and wait for it to finish updating
        }
        setLoading(false); // done loading
    };

    const handleClick = (ev) =>
    {
        // select the craft that was clicked on 
    }

    if (loading)
    {
        return (
            <Loading />
        );
    }

    return (
        <div>
            Spacecrafts
            {
                spacecrafts.map((spacecraft, index) => (
                    <InListSpacecraft key={index} id={spacecraft.id} name={spacecraft.name} capacity={spacecraft.capacity} destroy={destroy} />
                ))
            }
            <Link to={"/construction"} >Construct new spacecraft</Link>
        </div>
    );
}
