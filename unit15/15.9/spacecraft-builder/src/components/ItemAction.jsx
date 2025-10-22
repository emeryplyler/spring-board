// lets user delete an item

import { useContext } from 'react';
import { InventoryContext } from './InventoryContext.jsx';

function ItemAction({ id })
{
    const removeItem = useContext(InventoryContext); // retrieve delete function from context

    return (
        <button onClick={() => removeItem(id)} className="item-action">Remove</button>
    );
}

export default ItemAction;
