// display inventory; receive inv as props
// render itemcard for each item to display its info
// render itemaction for each item to delete it

import ItemCard from './ItemCard.jsx';
import ItemAction from './ItemAction.jsx';

function InventoryDisplay({ inventory })
{

    // delete item function here

    return (
        <div className="inventory-display">
            {
                inventory.map(item => (
                    <ItemCard key={item.id} item={item}>
                        <ItemAction />
                    </ItemCard>
                ))
            }
        </div>
    );
}

export default InventoryDisplay;
