// display item details
import './ItemCard.css';

function ItemCard({ item, children })
{
    return (
        <div className="item-card">
            <p>
                <h3>{item.name}</h3>
                Quantity: {item.quantity} <br />
                Purpose: {item.purpose}
            </p>
            {children}
        </div>
    );
}

export default ItemCard;
