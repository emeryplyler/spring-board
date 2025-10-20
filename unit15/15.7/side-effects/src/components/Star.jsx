// represents individual stars that are randomly placed in space. These components need to be focusable and destructible upon user interaction

function Star({x, y}) 
{
    console.log(x, y)
    return (
        <div className="star" style={{position: 'absolute', left: x, top: y}}> </div>
    );
}

export default Star;
