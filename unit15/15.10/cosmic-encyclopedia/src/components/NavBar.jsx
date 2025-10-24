import { NavLink } from 'react-router-dom';
import './NavBar.css'

export default function NavBar({data})
{
    let counter = 1; // index 0 is for home link
    return (
        <nav>
            <h1>Cosmic Encyclopedia</h1>
            <NavLink key={0} to={"/"}>Home</NavLink>
            {
                data.entries.map(entry => (
                    <NavLink key={counter++} to={`/${entry.id}`}>{entry.name}</NavLink>
                ))
            }
        </nav>
    );
}
