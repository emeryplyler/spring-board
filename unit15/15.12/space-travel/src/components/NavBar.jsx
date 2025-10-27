import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar({ routes })
{
    return (
        <nav>
            <NavLink key={0} to={`/`}>Home</NavLink>
            {routes.map((route, index) => (
                <NavLink key={index + 1} to={`/${route.toLowerCase()}`}>{route}</NavLink>
            ))}
        </nav>
    );
}
