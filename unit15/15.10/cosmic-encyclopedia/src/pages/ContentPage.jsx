export default function ContentPage({data})
{
    // const data = useLoaderData(); // retrieve data object

    return (
        <div>
            <h2>{data.name}</h2>
            <p>{data.info}</p>
        </div>
    );
}
