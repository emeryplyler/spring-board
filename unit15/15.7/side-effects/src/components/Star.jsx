// represents individual stars that are randomly placed in space. These components need to be focusable and destructible upon user interaction

import { useEffect, useRef } from "react";

function Star({ id, x, y, destroy }) 
{
    // make reference to star when star is created
    // notes: to keep a reference to the element, initialize the reference to a placeholder value (null), then set it in the element using ref={starRef}
    const starRef = useRef(null);

    // focus on star when star is created (empty dependency list)
    useEffect(() =>
    {
        starRef.current.focus();
    }, []);

    // add event listener to click, destroy
    return (
        <div ref={starRef} tabIndex="0" className="star" onClick={() => destroy(id)} style={{ position: 'absolute', left: x, top: y }}> </div>
    );
}

export default Star;
