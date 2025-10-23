import { NavLink } from 'react-router-dom';

export default function NavBar()
{
    return (
        <nav>
            <h1>Cosmic Encyclopedia</h1>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/earth">Earth</NavLink>
            <NavLink to="/mercury">Mercury</NavLink>
            <NavLink to="/venus">Venus</NavLink>
            <NavLink to="/mars">Mars</NavLink>
            <NavLink to="/jupiter">Jupiter</NavLink>
            <NavLink to="/saturn">Saturn</NavLink>
            <NavLink to="/uranus">Uranus</NavLink>
            <NavLink to="/neptune">Neptune</NavLink>
            <NavLink to="/pluto">Pluto</NavLink>
            <NavLink to="/sun">The Sun</NavLink>
        </nav>
    );
}