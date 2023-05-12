
function DisplayOtherCard(props) {
  console.log(props)
  return (
    <div id="display">
      <div id="col">
        <a href="/messaging/messages">
          <img src="/img/SVG/messaging/chat/return.svg" alt="" />
        </a>
        <img src={props.userB_profile_image_path} alt="" />
        <span>{props.userUsernameB}</span>
      </div>
    </div>
  )
}

export default DisplayOtherCard