const { existsSync, mkdirSync } = require('fs')


function neededFolderEnclosuresMiddleware(req, res, next) {
  console.log("makeSureDestinationFolderPresentMiddleware...")

  let directory_enclosure_path = `/img/bidblock-article-images/per-article-enclosure`
  
  res.locals.directory_enclosure_path = directory_enclosure_path


  if (!existsSync(`public/${directory_enclosure_path}`)) {
    mkdirSync(`public/${directory_enclosure_path}`, { recursive: true });
  }

  return next()

}


function neededFolderHoldingPerArticleFoldersMiddleware(req, res, next) {
  console.log("makeSureDestinationFolderPresentMiddleware...")

  let directory_article_images_folder_path = '/img/bidblock-article-images/per-article-folders-for-images'

  res.locals.directory_article_images_folder_path = directory_article_images_folder_path


  if (!existsSync(`public/${directory_article_images_folder_path}`)) {
    mkdirSync(`public/${directory_article_images_folder_path}`, { recursive: true });
  }

  return next()

}



const createArticlesMiddleware1 = {
  neededFolderEnclosuresMiddleware: neededFolderEnclosuresMiddleware,
  neededFolderHoldingPerArticleFoldersMiddleware: neededFolderHoldingPerArticleFoldersMiddleware,
}



module.exports = createArticlesMiddleware1