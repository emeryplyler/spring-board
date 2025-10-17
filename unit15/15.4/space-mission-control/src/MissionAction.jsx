// handle user interactions for missions, allow status updates throjgh buttons
// calls functions that were passed down from missioncontrol

function MissionAction(props)
{
    // notes: must set onClick to a function, but not a function call
    // use an anon function that calls the function that we need to call
    return (
        <button onClick={() => props.onClick("Complete", props.id)}>Launch Mission</button>
    )
}

export default MissionAction;
