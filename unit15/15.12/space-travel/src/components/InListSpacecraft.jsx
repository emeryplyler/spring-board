import { Link } from 'react-router-dom';
import { SpaceTravelContext } from '../context/SpaceTravelContext';
import { useContext } from 'react';

export default function InListSpacecraft({ id, name, capacity, destroy })
{
    // const { destroySpacecraft } = useContext(SpaceTravelContext);
    return (
        <div className='in-list-spacecraft'>
            <Link to={`/ships/${id}`}>{name}</Link>
            Capacity: {capacity}
            <button onClick={() => destroy(id)}>Destroy Spacecraft</button>
        </div>
    );
}
