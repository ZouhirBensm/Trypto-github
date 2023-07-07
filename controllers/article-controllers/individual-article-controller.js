const SECTION_TYPES = require("../../full-stack-libs/Types/ArticleSectionTypes");

async function controller1(req, res, next) {
  // res.locals.article_title = req.params.article_title ?  req.params.article_title : undefined
  res.locals.head = 2

  let EMAIL_blocks = await res.locals.article.articlenesteddata_id.blocks.filter(block => { return block.type == SECTION_TYPES.EMAIL });


  if (!EMAIL_blocks) return next()

  res.locals.EMAIL_blocks = EMAIL_blocks


  for (let index = 0; index < EMAIL_blocks.length; index++) {
    let block = EMAIL_blocks[index];

    // TODO !!!! look at diff between new3, new2 and new
    // TODO !!!!! HERE figure out why requires a copy object?

    const copiedObj = JSON.parse(JSON.stringify(block));

    const titleKey = `title${index}`;
    const subtitleKey = `subtitle${index}`;

    res.locals[titleKey] = copiedObj.EMAIL_title;
    res.locals[subtitleKey] = copiedObj.EMAIL_subtitle;
  }


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




// TODO !!!!! Need to optimise Footer and loads, and also add email inputs and table of content blocks.


module.exports = {
  controller1,
  controller2,
}