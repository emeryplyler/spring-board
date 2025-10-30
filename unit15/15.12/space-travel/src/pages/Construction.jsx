import { useContext, useState } from 'react';
import SpaceTravelApi from '../services/SpaceTravelApi';
import NavigateBackButton from '../components/NavigateBackButton';
import { SpaceTravelContext } from '../context/SpaceTravelContext';
import Loading from '../components/Loading';

export default function Construction()
{
    const INITIAL_STATE = {
        name: "",
        capacity: "",
        description: "",
        pic: ""
    };

    const [formData, setFormData] = useState(INITIAL_STATE);
    const { update } = useContext(SpaceTravelContext);

    const [loading, setLoading] = useState(false);

    const handleChange = (ev) =>
    {
        const { name, value } = ev.target;
        setFormData(
            oldData => ({
                ...oldData,
                [name]: value // set the property specified by name
            })
        );
    };

    const handleSubmit = async (ev) =>
    {
        ev.preventDefault();
        setLoading(true);

        await SpaceTravelApi.buildSpacecraft(formData); // send information to db
        await update(); // update state array tracking list of spacecraft

        setFormData(INITIAL_STATE);
        setLoading(false);
    };

    return (
        <div className='construction-form' onSubmit={handleSubmit}>
            {loading && <Loading />}
            <h3>Spacecraft Construction</h3>
            <form>
                <input
                    type='text'
                    name='name'
                    placeholder='Spacecraft Name or Identification'
                    required
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    type='number'
                    name='capacity'
                    placeholder='Passenger capacity'
                    required
                    value={formData.capacity}
                    onChange={handleChange}
                />
                <input
                    type='text'
                    name='description'
                    placeholder='Description of spacecraft'
                    required
                    value={formData.description}
                    onChange={handleChange}
                />
                <input
                    type='text'
                    name='pic'
                    placeholder='Link to image (optional)'
                    value={formData.pic}
                    onChange={handleChange}
                />

                <button type='submit'>Submit</button>
            </form>

            <NavigateBackButton />
        </div>
    );
}

