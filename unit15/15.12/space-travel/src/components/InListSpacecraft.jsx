import { Link } from 'react-router-dom';

import './InListSpacecraft.css';

export default function InListSpacecraft({ id, name, capacity, destroy })
{
    // spacecraft on the spacecrafts page
    return (
        <div className='in-list-spacecraft'>
            <Link to={`/ships/${id}`}>{name}</Link>
            <p>Capacity: {capacity}</p>
            <button onClick={() => destroy(id)}>Destroy Spacecraft</button>
        </div>
    );
}
