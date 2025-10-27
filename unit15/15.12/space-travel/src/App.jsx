import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from "react-router-dom";
import styles from "./App.module.css";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={
                <div>
                    homepage here
                </div>
            }
        />
    )
);

function App()
{
    return (
        <>
            <h1>Space Travel</h1>
            <h4>navbar here</h4>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
