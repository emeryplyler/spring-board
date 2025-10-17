// handle user interactions for missions, allow status updates throjgh buttons
// calls functions that were passed down from missioncontrol

function MissionAction({ id, stat, onClick })
{
    // notes: must set onClick to a function, but not a function call
    // use an anon function that calls the function that we need to call
    return (
        <div id="mission-actions">
            {/* <button onClick={() => props.onClick("Complete", props.id)}>Launch Mission</button> */}
            <select
                name="missionStatus"
                id="buttons"
                value={stat} // passed in from props
                onChange={changeEvent => onClick(changeEvent.target.value, id)}
            >
                <option value="Planned">Planned</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
            </select>
        </div>

    );
}

export default MissionAction;
