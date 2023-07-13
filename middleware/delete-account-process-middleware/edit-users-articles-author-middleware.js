const Article = require('../../models/articles-models/Article');
var ObjectId = require('mongodb').ObjectId;

module.exports = async (req, res, next) => {

  let ret_updated_articles_author_id_fields_to_undefined;
  try {
    ret_updated_articles_author_id_fields_to_undefined = await Article.updateMany(
      { author_id: ObjectId(req.params.userId) },
      { author_id: null }
    );
  } catch (e) {
    res.locals.notifications.push(e);
  }

  console.log("\n\nret_updated_articles_author_id_fields_to_undefined: \n\n", ret_updated_articles_author_id_fields_to_undefined);

  return next();
};
