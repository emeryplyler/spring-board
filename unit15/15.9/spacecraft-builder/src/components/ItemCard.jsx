// display item details

function ItemCard({ item, children })
{
    return (
        <div className="item-card">
            {item.name}; quantity: {item.quantity}; purpose: {item.purpose}
            {children}
        </div>
    );
}

export default ItemCard;
