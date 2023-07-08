const SECTION_TYPES = require("../../full-stack-libs/Types/ArticleSectionTypes");

async function controller1(req, res, next) {
  return next()
}



async function controller2(req, res, next) {

  var JSX_to_load = 'OnPageFooter';

  var JSX_to_load2 = 'EmailMarketingCollector';


  res.render('bodies/bidblock-blog-article', {
    JSX_to_load: JSX_to_load,
    ...(res.locals.EMAIL_blocks && { JSX_to_load2: JSX_to_load2 }),
  })

}


// TODO !!!! Test schemas and renders


// TODO !!!! add table of content blocks. dialog


// a bunch of google errors on the article page on staging, test without the embed
// the send button on the article page (email collector) has a higher z index than the sidenav
// resave the back up

// TODO !!!!! sitemap build
// TODO !!!!! CRUDE Capabilities for blog articles
// TODO !!!!! build HTML sitemap
// TODO !!!!! google search console register
// TODO !!!!! google analitics register
// TODO !!! Need to add itemprops for EMBED component and for EMAIL component, and table of content also
// TODO !!! Look into surfer ai
// TODO !!! Build chatGPT generator on aiaudiotoblog.bidblock.ca on another localhost:3001? and deploy scripts
// TODO !!!! Need to optimise Blog Loads,

// TODO !!! make bottom home icon navigation bar (white nav bar) available only on mobile layouts (entire app). It is not required on desktops


module.exports = {
  controller1,
  controller2,
}