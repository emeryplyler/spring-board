function Notification({message})
{
    // disappear after a while? add X button?
    return (
        <div style={{position: 'absolute', right: '30px', top: '30px'}} id="notification">{message}</div>
    )
}

export default Notification;