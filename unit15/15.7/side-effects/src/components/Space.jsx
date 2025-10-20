// represents the vast expanse of space. It is responsible for generating stars at random locations within its bounds every 2.5 seconds and manages the lifecycle of these stars.
import { useRef } from "react";
import Star from "./Star";

function Space()
{
    const STAR_SIZE = 5;
    const stars = []; // array of references to star objects
    // Implement the logic to generate stars at random positions within the viewport (Hint: x position is window.innerWidth - STAR_SIZE multiplied by a random number within 0 and 1). Each star should have a unique identifier.
    function makeStar()
    {
        // get random location on screen
        let x = Math.floor(Math.random() * (window.innerWidth - STAR_SIZE));
        let y = Math.floor(Math.random() * (window.innerHeight - STAR_SIZE));

        // make new star object
        let newStar = useRef({x: x, y: y});
        stars.push(newStar);
        console.log(newStar);
    }

    makeStar();

    // function to destroy star by id
    // useEffect for interval adding new star every 2.5 sec
    // clean up interval
    // render each star

    return (
        <div className="space">
            {
                stars.map((star) => {
                    return <Star x={star.current.x} y={star.current.y} />
                })
            }
        </div>
    );
}

export default Space;
