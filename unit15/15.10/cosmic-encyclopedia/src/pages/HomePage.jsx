import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function HomePage()
{
    return (
        <div>
            <header>
                <nav>
                    <h1>Cosmic Encyclopedia</h1>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    );
}
