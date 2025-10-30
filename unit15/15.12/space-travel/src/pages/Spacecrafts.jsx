import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { SpaceTravelContext } from '../context/SpaceTravelContext';
import InListSpacecraft from '../components/InListSpacecraft';
import Loading from '../components/Loading';

export default function Spacecrafts()
{
    const {crafts: spacecrafts, destroySpacecraft: dest, update } = useContext(SpaceTravelContext);
    // const dest = useContext(SpaceTravelContext).destroySpacecraft;

    const [loading, setLoading] = useState(false);

    const destroy = async (id) =>
    {
        setLoading(true);
        const res = await dest(id);
        console.log(res);
        if (res.isError)
        {
            console.error("couldn't destroy ship with id " + id);
        }
        else
        {
            await update();
        }
        setLoading(false);
    };

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
