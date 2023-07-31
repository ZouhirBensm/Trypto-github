import './styles/OnPageFooter.css'

function OnPageFooter() {

  console.log(JSX_to_load)

  return (
    <React.Fragment>
      <div id='footer-on-page'>


        <img src="/img/PNG/logo/logoBLCSmall.png" alt="" />
        <div id='nav401'>
          <div>© Bidblock</div>
          <div><a href="/contact">Contact</a></div>
          <div><a href="/terms-conditions">Terms and Conditions</a></div>
          {/* {
            loggedInUserId ?
            <div><a href="/terms-conditions">Terms and Conditions</a></div> :
            null
          } */}

          <div><a href="/FAQ">FAQ</a></div>
          <div><a href="/sitemap/html-sitemap">Sitemap</a></div>
        </div>

        <div id='nav402'>
          {/* <span>Follow us</span> */}
          <a href="https://www.facebook.com/Bidblock"><img src="/img/SVG/social/facebook.svg" alt="" /></a>
          <a href="https://www.instagram.com/bidblock/"><img src="/img/SVG/social/instagram.svg" alt="" /></a>
          <a href="https://twitter.com/bidblockcanada"><img src="/img/SVG/social/twitter.svg" alt="" /></a>

          <a href="https://www.pinterest.ca/bidblock/"><img className="small" src="/img/SVG/social/pinterest.svg" alt="" /></a>
          <a href="https://www.youtube.com/@bidblock"><img className="small" src="/img/SVG/social/youtube.svg" alt="" /></a>
          <a href="https://www.tiktok.com/@bidblock"><img className="small" src="/img/SVG/social/tiktok.svg" alt="" /></a>

          <a href="https://www.reddit.com/user/bidblockcanada/"><img className="small" src="/img/SVG/social/reddit.svg" alt="" /></a>
          <a href="https://www.quora.com/profile/Bidblock"><img className="small" src="/img/SVG/social/quora.svg" alt="" /></a>
          <a href="https://www.linkedin.com/company/bidblock/"><img className="small" src="/img/SVG/social/linkedin.svg" alt="" /></a>

          <a href="https://discord.gg/Uznyz2Fa"><img className="small" src="/img/SVG/social/discord.svg" alt="" /></a>

        </div>

        <img src="/img/SVG/on-page-footer/group.svg" alt="" />
      </div>
    </React.Fragment>
  );
}

if(JSX_to_load === "OnPageFooter"){
  const element = <OnPageFooter />;
  ReactDOM.render(element, document.getElementById('react-div'));
}

export default OnPageFooter;