import { BrowserRouter, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';

import './App.css';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<HomePage />}>
            <Route index element={<div>f</div>} />
            <Route path="/about" element={<h1>Change to dynamic routign</h1>} />
        </Route>
    )
);

function App()
{
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
