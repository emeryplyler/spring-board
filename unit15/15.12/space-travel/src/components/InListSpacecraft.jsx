import { Link } from 'react-router-dom';

export default function InListSpacecraft({ id, name, capacity, destroy })
{
    return (
        <div className='in-list-spacecraft'>
            <Link to={`/ships/${id}`}>{name}</Link>
            Capacity: {capacity}
            <button onClick={() => destroy(id)}>Destroy Spacecraft</button>
        </div>
    );
}
