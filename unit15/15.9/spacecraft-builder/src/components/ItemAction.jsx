// lets user delete an item

function ItemAction({ onDelete })
{
    return (
        <button onClick={onDelete} className="item-action">Remove</button>
    );
}

export default ItemAction;
