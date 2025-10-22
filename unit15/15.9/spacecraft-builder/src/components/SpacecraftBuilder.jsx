// manage state of inventory
// render item form to allow item submission; to add items to inv on submission, pass down a callback function
// render inventory display to show inventory and delete items; for deletion, pass down a callback function

import { useState } from 'react';
import ItemForm from './ItemForm';
import InventoryDisplay from './InventoryDisplay.jsx';

function SpacecraftBuilder()
{
    // starting items, so there's something to display
    const initialInv = [
        { id: 1, name: 'Oxygen Tank', quantity: 3, purpose: 'Equipment' },
        { id: 2, name: 'Spacesuit', quantity: 2, purpose: 'Equipment' },
        { id: 3, name: 'First Aid Kit', quantity: 4, purpose: 'Medical' },
    ];

    const [inventory, setInventory] = useState(initialInv);

    return (
        <div className="spacecraft-builder">
            <ItemForm />
            <InventoryDisplay inventory={inventory} />
        </div>
    )
}

export default SpacecraftBuilder;
