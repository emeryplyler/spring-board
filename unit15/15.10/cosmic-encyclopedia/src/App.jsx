import { BrowserRouter, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import HomePage from './pages/HomePage';
import ContentPage, { contentPageLoader } from './pages/ContentPage';

import './App.css';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />

            <Route
                path=":id"
                element={<ContentPage />}
                loader={contentPageLoader}
            />

            <Route path="*" element={<h1>404</h1>} />
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
