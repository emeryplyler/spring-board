function App ()
{
	const spacePhenomena = [
		{id: 1, name: "Asteroid Belt", emoji: "☄️"},
		{id: 2, name: "Galactic Nebula", emoji: "🌌"},
		{id: 3, name: "Black Hole", emoji: "🕳️"},
		{id: 4, name: "Supernova Explosion", emoji: "💥"},
		{id: 5, name: "Pulsar", emoji: "⚡"},
		{id: 6, name: "Quasar", emoji: "💫"},
		{id: 7, name: "Exoplanet", emoji: "🪐"},
		{id: 8, name: "Interstellar Cloud", emoji: "☁️"},
		{id: 9, name: "Gamma-Ray Burst", emoji: "🌠"},
		{id: 10, name: "Magnetic Field Reversal", emoji: "🧲"}
	];

	const observationStatuses = ["🔭 Visible", "🌫 Faint", "🚀 Prime for Study"];

    // randomly pick one of the statuses to add to each object
    // conditional rendering, highlight ones that are prime for study and say "<lightbulb emoji> gear up with your best equipment!"
    // <emoji> Asteroid Belt <emoji> Visible
    const gearUp = " 💡 (Gear up with your best equipment!)"

    function observe() {
        let num = Math.floor(Math.random() * 3);
        let status = observationStatuses[num];
        if (num === 2) {
            status = status.concat(gearUp);
        }
        return status;
    }

	return (
		<div>
            <h2>Space Phenomena Tracker</h2>
            <ul>
                { spacePhenomena.map((phen) => (
                    <li>{phen.emoji} {phen.name} {observe()} </li>
                ))}
            </ul>
			
		</div>
	);
}

ReactDOM.render(<App />, document.getElementById("root"));
