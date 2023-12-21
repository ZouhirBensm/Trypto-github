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

// TODO !!!!
// on recap:
// - Product edits
// - Blog Riadh to publish
// - More blogs to come, content
// - Outsource le code (future), google banner, mediavine
// - Outsource for blog article (upwork')

// TODO !!!! reduce banner height in blog articles

// TODO !!!! install a affiliate link for bubble in the bubble article to start getting commmissions

// TODO !!!! refactor todos in a seperate file and assign number importance

// TODO !!!! install profanity filters in public inputs

// TODO !!!! Style the inner spans in articles with same color blue as entire article

// TODO !!!! add the rel="nofollow noindex" to external links in blog articles





// TODO !!!!
// Why color edits in the articles contents? Fix
// Check the real database in prod.
// reboot articles in the development database
// re auto deploy ci/cd, check if works


// TODO !!!! Hide message, CRUD messages.

// TODO !!!! Post Bubble article on social media


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


// TODO !!!! earn answers -> luke bulmar blog, sql set, fix html, crud on articles, log in, white label SEO google search API data dashboard to sell (chrome extention), twitter space downloader -> and then produce SEO tags

// TODO !!!! register to product hunt for bidblock and earnanswers

// TODO !!! Category and subcategory, add to seach filters, and add reall wallet types



module.exports = {
  controller1,
  controller2,
}