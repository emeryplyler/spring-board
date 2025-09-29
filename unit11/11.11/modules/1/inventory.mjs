const items = []; // private; can only be interacted with using exported functions

export function addItem(item)
{
    items.push(item);
    console.log(`Added ${item} to inventory.`);
}
export function removeItem(item)
{
    // javascript doesn't have an Array.remove() function, so we'll have to make one ourselves
    // find the specified item in the array, get its index, then splice around it
    const ind = items.indexOf(item);
    if (ind > -1)
    {
        // splice is supposed to return the item that it removed
        let removed = items.splice(ind, 1); // remove one item at index 'ind'
        console.log(`Removed ${removed} from inventory.`);
    }
    else
    {
        console.log(`Couldn't find ${item} in inventory.`);
    }
}
export function listItems()
{
    console.log(items); // unsure how to print exactly, item's object type isn't specified
}
