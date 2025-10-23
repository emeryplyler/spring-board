import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';

export default function Layout()
{
    return (
        <div>
            <header>
                <NavBar />
            </header>

            <main>
                {/* Anything inside the <HomePage> tags in App.jsx will be rendered here */}
                <Outlet />
            </main>
        </div>
    );
}
