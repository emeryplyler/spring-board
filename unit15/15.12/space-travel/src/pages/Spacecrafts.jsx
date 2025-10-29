import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SpaceTravelContext } from '../context/SpaceTravelContext';
import InListSpacecraft from '../components/InListSpacecraft';

export default function Spacecrafts()
{
    const spacecrafts = useContext(SpaceTravelContext).crafts;

    return (
        <div>
            Spacecrafts
            {
                spacecrafts.map((spacecraft, index) => (
                    <InListSpacecraft key={index} id={spacecraft.id} name={spacecraft.name} capacity={spacecraft.capacity} />
                    // <Link key={index} to={`/ships/${spacecraft.id}`}>{spacecraft.name}</Link>
                ))
            }
            <Link to={"/construction"} >Construct new spacecraft</Link>
        </div>
    );
}
