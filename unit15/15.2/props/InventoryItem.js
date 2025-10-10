function InventoryItem ({name, type, quantity = 1, price = 0})
{ // render item's details, render message if quantity below 5 saying low stock, render message if quantity*price > 10000 saying extra protection
	// notes: had to look this one up. Your function's arguments must be one object (props). If you want to set defaults,
    // you either have to do the defaultProps thing or break apart the object in the parentheses like above
    // Otherwise, the console will give a confusing and unrelated error
    return (
		<div>
			<h2>{name} ({type}) </h2>
            {
                // ternary operator good for if else, and operator good for if with no else
                quantity < 5 && <Message>⚠️ALERT: low stock - only {quantity} left⚠️</Message>
            }
            {
                quantity * price > 1000 && <Message>⚠️ALERT: high value - extra protection recommended⚠️</Message>
            }
            {
                // all good
                // AND operator can have more than two operands
                !(quantity < 5) && !(quantity * price > 1000) && <Message>✅</Message>
            }
		</div>
	);
}
