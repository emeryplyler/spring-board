// Task 1: Declare The Task Array and The Interval ID
const oneTimeTasks = [];
let monitoringTaskId = -1;

// Task 2: Add One-Time Task Function
function addOneTimeTask(func, delay)
{
    // add to task list as object; left of colon is property name, right of colon is value
    // confusing when they're the same, but these are the names that make most sense
    oneTimeTasks.push({ function: func, delay: delay });
}

// Task 3: Run One-Time Tasks Function
function runOneTimeTasks()
{
    for (const i in oneTimeTasks)
    {
        if (!Object.hasOwn(oneTimeTasks, i)) continue; // added by default by the "for-in" snippet; error handling just in case

        const task = oneTimeTasks[i];
        // after waiting task.delay amount of seconds, run task.function
        setTimeout(task.function, task.delay);
    }
    // notes: after looking at the solution file, it turns out what I wanted - a for x in y loop like other languages - is actually a for-of loop in javascript and not for-in
    // I'll leave the for-in loop since it should work just as well, it's just less readable
}

// Task 4: Start Monitoring Function
function startMonitoring()
{
    const delayMS = 3000; // 3000 milliseconds is 3 seconds
    console.log("Starting to monitor");
    // set the monitoring task; setInterval() returns an ID which will be stored in monitoringTaskId
    // the function passed to setInterval() will be called every delayMS milliseconds

    let fuel = 0;
    let o2 = 0;
    let shields = 0;

    monitoringTaskId = setInterval(
        () => 
        {
            // console.log("Working..."); // print message every few seconds
            // check fuel, oxygen, and shield levels; 
            console.log(`Current fuel level: ${fuel}/1500, Oxygen Mix Tank: ${o2}/2000, Shields: ${shields}%`);

            // increase over time
            fuel = Math.min(1500, fuel + Math.random() * 600); // increase by random amount up to 20 out of a max of 1500
            o2 = Math.min(2000, o2 + Math.random() * 850);
            shields = Math.min(100, shields + Math.random() * 49);
            // Min takes the smaller of two values, the maximum and the current level
            // This is in case the current level goes over the maximum

            // Whether these do or don't reach their maximum here, the final checks will show that they are full
        },
        delayMS
    );
}

// Task 5: Stop Monitoring Function
function stopMonitoring()
{
    console.log("Stopping monitoring");
    clearInterval(monitoringTaskId); // use monitor interval id to stop interval
}

// Task 6: Start Countdown Function
function startCountdown(duration)
{
    let timeLeft = duration; // will decrease over time
    console.log(`Launch sequence starting: ${timeLeft} seconds remaining`);
    const countdown = setInterval( // store id to stop interval later
        () =>
        {
            timeLeft--; // decrement first; I want timeleft to only count whole seconds remaining, not the fraction
            
            if (timeLeft <= 0)
            {
                console.log("Liftoff!");
                // note: an interval callback can end its own interval:
                clearInterval(countdown); // end countdown interval
            }
            else
            {
                console.log(`${timeLeft} seconds remaining`);
            }
        },
        1000
    );
}

// Task 7: Schedule Pre-Launch Activities and Launch
function scheduleMission()
{
    // Prompt: Use the functions you've created to schedule the pre-launch system check, start and stop monitoring, and execute the countdown. Make sure to adjust the delays appropriately to simulate a real mission timeline.
    
    // do some one time tasks first: start to load fuel, start to load oxygen, load research equipment, initialize shields
    addOneTimeTask(()=>{console.log("Beginning fuel load")}, 200);
    addOneTimeTask(()=>{console.log("Now loading oxygen mixture")}, 200);
    addOneTimeTask(()=>{console.log("Loading research equipment")}, 100);
    addOneTimeTask(()=>{console.log("Initializing shields")}, 2000); // longer delay after starting to load equipment since it takes a little while

    // monitor
    addOneTimeTask(startMonitoring, 100); // start monitoring
    addOneTimeTask(stopMonitoring, 13000); // finish monitoring
    // once they're done, do three final checks (one time tasks)

    addOneTimeTask(()=>{console.log("Running final checks...")}, 100);
    addOneTimeTask(()=>{console.log("Fuel: 1500/1500, Oxygen Mix Tank: 2000/2000")}, 200);
    addOneTimeTask(()=>{console.log("Research equipment and samples: STABLE")}, 1000);
    addOneTimeTask(()=>{console.log("Shield battery: 100%, Shields: ONLINE")}, 100);
    addOneTimeTask(()=>{console.log("Crew status: READY")}, 1000);
    // start launch sequence

    addOneTimeTask(()=>{startCountdown(10)}, 1500); // start countdown after all checks are done

    runOneTimeTasks(); // run all tasks
}

scheduleMission(); // Starts the mission.
