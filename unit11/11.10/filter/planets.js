const planets = [
	{name: "Mercury", temperature: 440, distance: 0.39},
	{name: "Venus", temperature: 737, distance: 0.72},
	{name: "Earth", temperature: 288, distance: 1},
	{name: "Mars", temperature: 253, distance: 1.5},
	{name: "Jupiter", temperature: 163, distance: 5.2},
	{name: "Saturn", temperature: 133, distance: 9.58},
	{name: "Uranus", temperature: 78, distance: 19.22},
	{name: "Neptune", temperature: 73, distance: 30.05}
];

// filter habitable planets:
// temperature between 253k and 323k inclusive
// distance from sun between 0.75 and 1.5 au inclusive
// print new array that has all names of habitable planets
const habitablePlanets = planets.filter(function(planet) 
{
    if (planet.temperature >= 253 && planet.temperature <= 323)
    {
        if (planet.distance >= 0.75 && planet.distance <= 1.5)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    else
    {
        return false;
    }
});

const habitablePlanetNames = habitablePlanets.map((planet) => 
{
    return planet.name;
});

console.log(habitablePlanetNames);
