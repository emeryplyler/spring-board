// Doesn't need to be its own component, but I didn't want to re-use code when making two ships
function Ship({name, health}) {
    return (
        <>
            <div>
                {name} health: {health} <br /> 
                <progress value={health} max={100}/>
            </div>
        </>
        
    )
}

export default Ship;
