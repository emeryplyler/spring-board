// represents individual stars that are randomly placed in space. These components need to be focusable and destructible upon user interaction

function Star({id, x, y, destroy}) 
{
    // add event listener to click, destroy
    return (
        <div tabIndex="0" className="star" onClick={() => destroy(id)} style={{position: 'absolute', left: x, top: y}}> </div>
    );
}

export default Star;
