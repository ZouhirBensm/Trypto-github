import './styles/OnPageFooter.css'

function OnPageFooter() {

  // console.log("loggedInUserId: ", loggedInUserId)

  return (
    <React.Fragment>
      <div id='footer-on-page'>


        <img src="/img/PNG/logo/logoBLCSmall.png" alt="" />
        <div id='nav401'>
          <div>© Bidblock</div>
          <div><a href="">Contact</a></div>
          <div><a href="/terms-conditions">Terms and Conditions</a></div>
          {/* {
            loggedInUserId ?
            <div><a href="/terms-conditions">Terms and Conditions</a></div> :
            null
          } */}

          <div><a href="/FAQ">FAQ</a></div>
        </div>

        <div id='nav402'>
          <span>Follow us</span>
          <a href="#"><img src="/img/SVG/social/facebook.svg" alt="" /></a>
          <a href="#"><img src="/img/SVG/social/instagram.svg" alt="" /></a>
          <a href="#"><img src="/img/SVG/social/twitter.svg" alt="" /></a>
        </div>

        <img src="/img/SVG/on-page-footer/group.svg" alt="" />
      </div>
    </React.Fragment>
  );
}

const element = <OnPageFooter />;
ReactDOM.render(element, document.getElementById('react-div'));

export default OnPageFooter;