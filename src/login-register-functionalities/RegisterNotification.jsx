function RegisterNotification(props) {
  let notifyDisplays
  notifyDisplays = props.notification?.map((notification, index) => {
    return <div key={index}>{notification}</div>
  })

  return (
    <React.Fragment>
      {notifyDisplays}
    </React.Fragment>
  );
}

export default RegisterNotification