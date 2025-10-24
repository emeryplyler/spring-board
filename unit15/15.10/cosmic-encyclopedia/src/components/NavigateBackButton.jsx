import { useNavigate } from 'react-router-dom';

export default function NavigateBackButton()
{
    let navigate = useNavigate();
    return (
        <button onClick={() => navigate(-1)}>Back</button>
    );
}
