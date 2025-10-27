import React from 'react';

export default function NavBar({ routes })
{
    return (
        <div>
            {routes.map((route) => (
                <div>{route}</div>
            ))}
        </div>
    );
}
