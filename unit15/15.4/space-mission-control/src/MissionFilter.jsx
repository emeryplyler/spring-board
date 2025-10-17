// mechanism to view missions by specific criteria
function MissionFilter({changeFilter})
{
    // each button changes the current filter variable, which will update the mission list because it's stateful
    return (
        <div id="filter-buttons">
            <button id="buttons" onClick={() => changeFilter("All")}>All</button>
            <button id="buttons" onClick={() => changeFilter("Planned")}>Planned</button>
            <button id="buttons" onClick={() => changeFilter("Active")}>Active</button>
            <button id="buttons" onClick={() => changeFilter("Completed")}>Completed</button>
        </div>
    );
}

export default MissionFilter;
