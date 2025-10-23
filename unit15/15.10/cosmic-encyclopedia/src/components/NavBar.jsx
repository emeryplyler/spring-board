import { NavLink } from 'react-router-dom';

export default function NavBar()
{
    return (
        <nav>
            <h1>Encyclopedia of the Cosmos</h1>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
        </nav>
    );
}