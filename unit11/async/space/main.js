// Task 1: Declare The Task Array and The Interval ID
const oneTimeTasks = [];
let monitoringTaskId = null;

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
    console.log("Starting to monitor...");
    // set the monitoring task; setInterval() returns an ID which will be stored in monitoringTaskId
    // the function passed to setInterval() will be called every delayMS milliseconds

    let fuel = 0;
    let o2 = 0;
    let shields = 0;
    const maxFuel = 1500;
    const maxO2 = 2000;
    const maxShields = 100;

    monitoringTaskId = setInterval(
        () => 
        {
            // console.log("Working..."); // print message every few seconds
            // check fuel, oxygen, and shield levels; 
            // .toFixed(2) limits to two decimal places
            console.log(`Current fuel level: ${fuel.toFixed(2)}/1500.00, Oxygen Mix Tank: ${o2.toFixed(2)}/2000.00, Shields: ${shields.toFixed(2)}%`);

            // increase over time
            fuel = Math.min(maxFuel, fuel + Math.random() * (maxFuel / 2)); // increase by random amount up to half of max in one cycle
            o2 = Math.min(maxO2, o2 + Math.random() * (maxO2 / 2));
            shields = Math.min(maxShields, shields + Math.random() * (maxShields / 2));
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
    console.log("Preparing for takeoff, please stand behind the yellow line"); // don't want anyone too close to the jets
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
    
    // note: it turns out the delays need to be additive, not relative to the previous tasks
    // I'm using a variable to track the total delay so I can focus on the time between tasks instead of the total time, which I might mess up
    let delay = 0;
    console.log("Beginning launch preparation sequence");

    // do some one time tasks first: start to load fuel, start to load oxygen, load research equipment, initialize shields
    delay += 200; // just add to the delay variable
    addOneTimeTask(()=>{console.log("Beginning fuel load")}, delay);
    delay += 200;
    addOneTimeTask(()=>{console.log("Now loading oxygen mixture")}, delay);
    delay += 100;
    addOneTimeTask(()=>{console.log("Loading research equipment")}, delay);
    delay += 2000;
    addOneTimeTask(()=>{console.log("Initializing shields")}, delay); // longer delay after starting to load equipment since it takes a little while

    // monitor
    delay += 100;
    addOneTimeTask(startMonitoring, delay); // start monitoring
    delay += 13000;
    addOneTimeTask(stopMonitoring, delay); // finish monitoring

    // once they're done, do three final checks (one time tasks)
    delay += 100;
    addOneTimeTask(()=>{console.log("Running final checks...")}, delay);
    delay += 1000;
    addOneTimeTask(()=>{console.log("Fuel: 1500.00/1500.00, Oxygen Mix Tank: 2000.00/2000.00")}, delay);
    delay += 1000;
    addOneTimeTask(()=>{console.log("Research equipment and samples: STABLE")}, delay);
    delay += 100;
    addOneTimeTask(()=>{console.log("Shield battery: 100.00%, Shield status: ONLINE")}, delay);
    delay += 1000;
    addOneTimeTask(()=>{console.log("Crew status: READY")}, delay);
    
    // start launch sequence
    delay += 1500;
    addOneTimeTask(()=>{startCountdown(10)}, delay); // start countdown after all checks are done

    runOneTimeTasks(); // run all tasks
}

scheduleMission(); // Starts the mission.
