// has a form for users to input new items into inv
// updates inventory state array in SpacecraftBuilder
// make all fields required
// validate each field on submission; if field missing, highlight
// clear form on successful submission
import { useState } from 'react';
import { useContext } from 'react';
import { InventoryContext } from './InventoryContext.jsx';
import './ItemForm.css';

function ItemForm()
{
    // formData base state
    const INITIAL_STATE = {
        name: '',
        quantity: '',
        purpose: ''
    };

    // initialize using base state
    const [formData, setFormData] = useState(INITIAL_STATE);

    // called when any of the form's fields have changed
    const handleChange = (ev) =>
    {
        const { name, value } = ev.target; // destructure
        setFormData(
            data => ({
                ...data,
                [name]: value // update object property based on key
            })
        );
    };

    const addItem = useContext(InventoryContext); // retrieve add function from context

    // called on submit button press
    const handleSubmit = (ev) => 
    {
        ev.preventDefault(); // no refresh

        const { name, quantity, purpose } = formData; // grab info that user entered
        alert(`Added item: ${name}, quantity: ${quantity}, purpose: ${purpose}`); // notify user

        addItem(name, quantity, purpose); // call addItem function from context
        setFormData(INITIAL_STATE); // reset form fields
    };

    return (
        <form className="item-form" onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Item Name"
                required
                value={formData.name}
                onChange={handleChange}
            />
            <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                min="1"
                required
                value={formData.quantity}
                onChange={handleChange}
            />
            <input
                type="text"
                name="purpose"
                placeholder="Purpose"
                required
                value={formData.purpose}
                onChange={handleChange}
            />

            <button type="submit">Add Item</button>
        </form>
    );
}

export default ItemForm;
