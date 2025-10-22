import { useState } from 'react';
import ItemForm from './ItemForm';
import InventoryDisplay from './InventoryDisplay.jsx';
import { InventoryContext } from './InventoryContext.jsx';

function SpacecraftBuilder()
{
    // starting items, so there's something to display
    const initialInv = [
        { id: 1, name: 'Oxygen Tank', quantity: 3, purpose: 'Equipment' },
        { id: 2, name: 'Spacesuit', quantity: 2, purpose: 'Equipment' },
        { id: 3, name: 'First Aid Kit', quantity: 4, purpose: 'Medical' },
    ];

    const [inventory, setInventory] = useState(initialInv);

    // function to delete item by id; passed down through inv display to item action using context
    function deleteItem(id)
    {
        // filter out item with matching id, keep every other item and update inventory state
        setInventory(inv => inv.filter(item => item.id !== id));
    }

    // wrap inv display in context provider; it itself doesn't need the delete function, but its children do
    return (
        <div className="spacecraft-builder">
            <ItemForm />
            <InventoryContext.Provider value={deleteItem}>
                <InventoryDisplay inventory={inventory} />
            </InventoryContext.Provider>
        </div>
    );
}

export default SpacecraftBuilder;
