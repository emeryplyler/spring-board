// represents the vast expanse of space. It is responsible for generating stars at random locations within its bounds every 2.5 seconds and manages the lifecycle of these stars.
import { useRef } from "react";
import Star from "./Star";
import { useEffect } from "react";
import { useState } from "react";

function Space()
{
    const STAR_SIZE = 5;
    const [stars, setStars] = useState([]); // array of references to star objects
    let intervalID = useRef(null);
    let idCounter = useRef(0); // increment to make star ids
    // Implement the logic to generate stars at random positions within the viewport (Hint: x position is window.innerWidth - STAR_SIZE multiplied by a random number within 0 and 1). Each star should have a unique identifier.
    function makeStar()
    {
        // get random location on screen
        let posx = Math.floor(Math.random() * (window.innerWidth - STAR_SIZE));
        let posy = Math.floor(Math.random() * (window.innerHeight - STAR_SIZE));

        // make new star object
        let newStar = { x: posx, y: posy, id: idCounter.current };
        idCounter.current++;

        // add it to the array

        // notes: based on the react docs, for updating a state variable based on its previous value, you MUST use an updater function like the arrow function below
        // an updater function has one argument, 'pending state', and returns 'next state'
        // react puts all calls to the updater function in a queue so they will still happen in the correct order
        setStars(prevStars => [...prevStars, newStar]);
    }

    // function to destroy star by id
    // target.id?
    function removeStar(id)
    {
        // locate object in array with this id
        try
        {
            let elem = stars.find(star => star.id === id);
            let ind = stars.indexOf(elem);
            if (ind != -1) 
            {
                // notes: splice doesn't work as expected on state arrays
                // instead, make a new array including everything except what you want to remove, then set state to that
                setStars(stars.filter(star => star.id != id));
            }
        }
        catch (error)
        {
            console.error(error);
            return;
        }

    }

    // useEffect for interval adding new star every 2.5 sec
    let going = false; // on page load, the browser keeps calling this twice so I added this boolean
    useEffect(() =>
    {
        if (!going)
        {
            intervalID.current = setInterval(makeStar, 2500);
            going = true;
        }
    }, []);

    // clean up interval
    function endInterval()
    {
        intervalID.current && clearInterval(intervalID.current);
    }

    // render each star

    return (
        <>
            <button id="end-interval-button" onClick={endInterval}> stop making stars </button>
            <div className="space">
                {
                    stars.map((star) =>
                    {
                        return <Star key={star.id} id={star.id} x={star.x} y={star.y} destroy={removeStar} />;
                    })
                }
            </div>
        </>

    );
}

export default Space;
