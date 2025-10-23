import { NavLink, useLoaderData, useParams } from "react-router-dom";

export default function ContentPage()
{
    const data = useLoaderData(); // retrieve data object

    return (
        <div>
            <h2>{data.name}</h2>
            <p>{data.info}</p>
        </div>
    );
}

// loader function; called by dynamic route in App.jsx
export const contentPageLoader = async ({ params }) =>
{
    const { id } = params; // router provides 'params' argument that has route variables

    const res = await fetch("http://localhost:4000/entries/" + id);

    return res.json();
};
