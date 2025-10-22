import { useRef, useState } from 'react';
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

    // counter to generate unique ids
    let idCounter = useRef(initialInv.length + 1);

    // function to delete item by id; passed down through inv display to item action using context
    function deleteItem(id)
    {
        // filter out item with matching id, keep every other item and update inventory state
        setInventory(inv => inv.filter(item => item.id !== id));
    }

    // function to add an item
    function addItem(name, quantity, purpose)
    {
        // inv += item
        let newItem = { id: idCounter.current, name, quantity, purpose };
        idCounter.current += 1; // increment id counter for next item
        setInventory(inv => [...inv, newItem]);
    }

    // wrap inv display in context provider; it itself doesn't need the delete function, but its children do
    return (
        <div className="spacecraft-builder">
            <h2>Add Item to Inventory</h2>
            <InventoryContext.Provider value={addItem}>
                <ItemForm />
            </InventoryContext.Provider>
            
            
            <h2>Inventory</h2>
            <InventoryContext.Provider value={deleteItem}>
                <InventoryDisplay inventory={inventory} />
            </InventoryContext.Provider>
        </div>
    );
}

export default SpacecraftBuilder;
