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

// Pinterest

// Facebook done
// Tiktok can't
// Instagram done
// Discord done
// Reddit done
// Quora done
// Linked done
// Twitter done


// TODO !!!!! Add github copilot
// TODO !!!!! Implement andf See and test if rich display are working
// TODO !!!!! post articles on social media

// TODO !!!!! link bottom to social media

// TODO !!!!! top nav icons overflow on a mobile layout, find solution


// TODO !!!! And also google search console api and build some a page showing the metrics in the operations in the articles link hub
// TODO !!!! Integrate apm
// TODO !!!! Global Refactor CSS
// TODO !!!! Integrate multi indexes, 

// TODO !!!! Contact Meme instagram page owners
// TODO !!! Build chatGPT generator on aiaudiotoblog.bidblock.ca on another localhost:3001? and deploy scripts
// TODO !!!! Need to optimise Blog Loads,

// TODO !!! Google Ad sense is getting activated waiting on request to use: https://www.google.com/adsense/new/u/6/pub-4796733535912629/onboarding
// TODO !! Ideally can upload the pdf resource automatically on the email blocks for article creations
// TODO !!!! Hit 50,000 sessions a month (usually around 60,000 pageviews), according to Google Analytics.
// TODO !!! Then integrate Mediavine
// TODO !!!! integrate a GOOGLE_ADS or MEDIAVINE_ADS bloc sections when website gets approuved


// TODO !!! several Loading spinners are showing up when the main operations page is loading to show the admin blocks



module.exports = {
  controller1,
  controller2,
}