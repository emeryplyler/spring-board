function mysteryOperation ()
{
	const outcome = Math.random(); // Generates a random number between 0 and 1.

	if (outcome < 0.5)
	{
		console.log("The operation is completed successfully!");
	}
	else
	{
		throw new Error("The operation is failed mysteriously!");
	}
}

const numberOfMissions = 20;
// day amounts saved as consts; it's good practice in case they need to be changed later
const successDays = 13;
const failureDays = 1;
const alwaysDays = 3;

let vacationDays = 0; // how many you have earned

for (let i = 0; i < numberOfMissions; i++)
{
    try
    {
        mysteryOperation();
        vacationDays += successDays; // 13 days for success; go straight to finally
    }
    catch(e)
    {
        console.log(e.message);
        vacationDays += failureDays; // you get one day for failing; now go to finally
    }
    finally
    {
        // get another three days anyway
        vacationDays += alwaysDays; // this runs after try or catch has finished
    }
}

console.log(`You deserve ${vacationDays} days of vacation.`);
