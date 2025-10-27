import { increment, decrement, reset, incrementByAmount } from './counterSlice';
import { useDispatch, useSelector } from 'react-redux';

import { useState } from 'react';

export default function Counter()
{
    const count = useSelector((state) => state.counter.count);
    const dispatch = useDispatch();

    const [incrementAmount, setIncrementAmount] = useState(0);

    // sanitize incrementAmount:
    const addValue = Number(incrementAmount) || 0; // if user doesn't enter a number, we add 0
    // when incrementAmount is changed, addValue changes too

    const resetAll = () =>
    {
        setIncrementAmount(0); // reset state variable
        dispatch(reset());
    };

    return (
        <section>
            <p>{count}</p>
            <div>
                <button onClick={() => dispatch(increment())}>+</button>
                <button onClick={() => dispatch(decrement())}>-</button>
            </div>

            <input
                type='text'
                value={incrementAmount}
                onChange={(e) => setIncrementAmount(e.target.value)}
            />

            <div>
                <button onClick={() => dispatch(incrementByAmount(addValue))}>Add Amount</button>
                <button onClick={resetAll}>Reset</button>
            </div>
        </section>
    );
}
