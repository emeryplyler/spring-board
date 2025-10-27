import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Outlet } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { addTopping } from './pizzaSlice';
import Counter from './Counter';

import './App.css';

function App()
{

    const pizza = useSelector(state => state.pizza);
    const dispatch = useDispatch();

    return (
        <div>
            redux-practice
            {pizza.toppings.map(topping => (
                <div key={topping}>{topping}</div>
            ))}

            <button onClick={() => dispatch(addTopping('pepperoni'))}>Add pepperoni</button>
            <Counter></Counter>
        </div>
    );
}

export default App;
