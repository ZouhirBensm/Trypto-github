import './styles/OnPageFooter.css'

function OnPageFooter() {
  return (
    <React.Fragment>
      <div id='footer-on-page'>


        <img src="/img/PNG/logoBLCSmall.png" alt="" />
        <div id='nav401'>
          <div>© Bidblock</div>
          <div><a href="">Contact</a></div>
          <div><a href="">Privacy and Terms</a></div>
          <div><a href="">FAQ</a></div>
        </div>

        <div id='nav402'>
          <span>Follow us</span>
          <a href="#"><img src="/img/SVG/social/facebook.svg" alt="" /></a>
          <a href="#"><img src="/img/SVG/social/instagram.svg" alt="" /></a>
          <a href="#"><img src="/img/SVG/social/twitter.svg" alt="" /></a>
        </div>

        <img src="/img/SVG/sub/group.svg" alt="" />
      </div>
    </React.Fragment>
  );
}

export default OnPageFooter