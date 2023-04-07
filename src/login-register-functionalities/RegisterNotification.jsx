function RegisterNotification(props) {
  let notifyDisplays
  notifyDisplays = props.notification?.map((notification, index) => {
    return <p className='popup' key={index}>{notification}</p>
  })

  return (
    <React.Fragment>
      {notifyDisplays}
    </React.Fragment>
  );
}

export default RegisterNotification