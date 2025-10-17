// stateless
// display info about mission; name status crew; receives props from mission control

function MissionCard({name, status, crew})
// is passed a mission object
{
    return (
        <div className="mission-card">
            Mission: {name} <br />
            Status: {status} <br />
            Crew: {crew.join(", ")}
        </div>
    );
}

export default MissionCard;
