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
 
// TODO !!!! Need to set the document clients can download upon email placement 
// TODO !! Ideally can upload the pdf resource automatically on the email blocks for article creations
// TODO !!!! block same name articles on create and also skip article from sitemaps if no index is on
// TODO !!!! Do not allow duplicate email in email collector
// TODO !!!! get rid of the bottom banner globally and fix the top navigation to display buttons on narrow screens

// TODO !!! Google Ad sense is getting activated waiting on request to use: https://www.google.com/adsense/new/u/6/pub-4796733535912629/onboarding
// TODO !!!! Hit 50,000 sessions a month (usually around 60,000 pageviews), according to Google Analytics.
// TODO !!! Then integrate Mediavine
// TODO !!!! integrate a GOOGLE_ADS or MEDIAVINE_ADS bloc sections when website gets approuved

// TODO !!! Build chatGPT generator on aiaudiotoblog.bidblock.ca on another localhost:3001? and deploy scripts
// TODO !!!! Need to optimise Blog Loads,
// TODO !!!! Contact Meme instagram page owners
// TODO !!!! Check out Surfer AI


// TODO !!!! And also google search console api and build some a page showing the metrics in the operations in the articles link hub
// TODO !!!! Integrate apm
// TODO !!!! Refactor CSS
// TODO !!!! Integrate multi indexes, 

// TODO !!! make bottom home icon navigation bar (white nav bar) available only on mobile layouts (entire app). It is not required on desktops

// TODO !!! global CSS refactor
// TODO !!! several Loading spinners are showing up when the main operations page is loading to show the admin blocks
// TODO !!! top nav icons overflow on a mobile layout, find solution


module.exports = {
  controller1,
  controller2,
}