// holds the state for space missions, renders missions details and actions, manages mission list and statuses
import { useState } from "react";
import MissionCard from "./MissionCard";
import MissionAction from "./MissionAction";
import MissionFilter from "./MissionFilter";

function MissionControl(props)
{
    // passed an array of mission objects {id, name, status, crew}

    // need to be able to update information about missions; need to make whole array stateful
    const [missionStates, updateMission] = useState(props.missions);

    function updateStatus(newStatus, missionId)
    {
        // status is a string, missionIndex is the int index of the mission to update in missionStates
        let newMissions = missionStates.map(mission =>
        {
            if (mission.id === missionId)
            {
                // copy all other properties from mission, only change status
                return { ...mission, status: newStatus };
            }
            else
            {
                return mission;
            }
        });

        updateMission(newMissions);
    }

    const [currentFilter, updateCurrentFilter] = useState("All");

    // updateStatus("Completed", 1);

    // map missions array to array of MissionCards
    return (
        <>
            <h1>Mission Control Center</h1>
            <MissionFilter changeFilter={updateCurrentFilter} />
            <div id="mission-list">
                {missionStates.map((mission) =>
                {
                    if (currentFilter === "All" || currentFilter === mission.status)
                    {
                        return (
                            <div key={mission.id} id="mission">
                                <MissionCard
                                    name={mission.name}
                                    status={mission.status}
                                    crew={mission.crew}
                                />
                                <MissionAction
                                    id={mission.id}
                                    stat={mission.status}
                                    onClick={updateStatus}
                                />
                            </div>

                        );
                    }

                })}
            </div>
        </>
    );

    // mission action for each mission

    // mission filter 
}

export default MissionControl;