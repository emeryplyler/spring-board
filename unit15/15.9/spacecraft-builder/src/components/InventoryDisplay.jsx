import ItemCard from './ItemCard.jsx';
import ItemAction from './ItemAction.jsx';
import './InventoryDisplay.css';

function InventoryDisplay({ inventory })
{
    return (
        <div className="inventory-display">
            {
                // map over inventory, make one card with an action button attached for each item
                inventory.map(item => (
                    <ItemCard key={item.id} item={item}>
                        <ItemAction id={item.id} />
                    </ItemCard>
                ))
            }
        </div>
    );
}

export default InventoryDisplay;
