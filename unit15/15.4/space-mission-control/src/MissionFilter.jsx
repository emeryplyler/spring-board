// mechanism to view missions by specific criteria
function MissionFilter({changeFilter})
{
    // each button changes the current filter variable, which will update the mission list because it's stateful
    return (
        <div id="filter-buttons">
            <button onClick={() => changeFilter("All")}>All</button>
            <button onClick={() => changeFilter("Planned")}>Planned</button>
            <button onClick={() => changeFilter("Active")}>Active</button>
            <button onClick={() => changeFilter("Completed")}>Completed</button>
        </div>
    );
}

export default MissionFilter;
