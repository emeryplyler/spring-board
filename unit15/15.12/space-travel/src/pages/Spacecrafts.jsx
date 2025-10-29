import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SpaceTravelContext } from '../context/SpaceTravelContext';

export default function Spacecrafts()
{
    const spacecrafts = useContext(SpaceTravelContext).crafts;

    return (
        <div>
            Spacecrafts
            {
                spacecrafts.map((spacecraft, index) => (
                    <Link key={index} to={`/ships/${spacecraft.id}`}>{spacecraft.name}</Link>
                ))
            }
        </div>
    );
}
