import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import NavigateBackButton from './components/NavigateBackButton';
import HomePage from './pages/HomePage';
import ContentPage from './pages/ContentPage';

import data from './data/data.json';

import './App.css';

const router = createBrowserRouter(
    createRoutesFromElements(
        // root element is a header and main; the navbar goes in the header, the child components go in main
        <Route
            path="/"
            element={
                <div>
                    <header>
                        <NavBar data={data} />
                    </header>

                    <main>
                        <Outlet />
                        <NavigateBackButton />
                    </main>
                </div>
            }>

            <Route index element={<HomePage />} />

            {
                // create content pages dynamically using data.json
                data.entries.map(
                    item => (
                        <Route
                            path={`/${item.id}`}
                            element={<ContentPage data={item} />}
                        />
                    )
                )
            }

            <Route path="*" element={
                <>
                    <h1>404</h1> <p>Couldn't find page</p>
                </>}
            />

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
