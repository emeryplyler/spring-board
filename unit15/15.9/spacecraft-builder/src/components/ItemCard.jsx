// display item details
import './ItemCard.css';

function ItemCard({ item, children })
{
    return (
        <div className="item-card">
            <p>
                {item.name}; quantity: {item.quantity}; purpose: {item.purpose}
            </p>
            {children}
        </div>
    );
}

export default ItemCard;
