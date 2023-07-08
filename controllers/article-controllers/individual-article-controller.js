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




// TODO !!!! Youtube iframe source of errors
// TODO !!! Need to add itemprops for IFRAME component and for EMAIL component.

// TODO !!!! redeploy, resave the back up


// TODO !!!! add table of content blocks in dialog
// TODO !!! Need to add itemprops for  table of content.



// TODO !!!!! sitemap build
// TODO !!!!! CRUDE Capabilities for blog articles
// TODO !!!!! build HTML sitemap
// TODO !!!!! google search console register
// TODO !!!!! google analitics register
// TODO !!! Look into surfer ai
// TODO !!! Build chatGPT generator on aiaudiotoblog.bidblock.ca on another localhost:3001? and deploy scripts
// TODO !!!! Need to optimise Blog Loads,

// TODO !!! make bottom home icon navigation bar (white nav bar) available only on mobile layouts (entire app). It is not required on desktops

// TODO !!! global CSS refactor
// TODO !!! top nav icons overflow on a mobile layout, find solution


module.exports = {
  controller1,
  controller2,
}