const CATEGORY = require('../../../../full-stack-libs/Types/ArticleCategories');

function determineCategory(arr_of_categories_from_third_party_article_item) {
  // console.log(arr_of_categories_from_third_party_article_item)
  let category = undefined

  for (let j = 0; j < arr_of_categories_from_third_party_article_item.length; j++) {
    const category_from_third_party_article_item = arr_of_categories_from_third_party_article_item[j];
    
    for (const key in CATEGORY) {
      if (Object.hasOwnProperty.call(CATEGORY, key)) {
        const value = CATEGORY[key];
        const regex = new RegExp(value, "i");
        const bool = regex.test(category_from_third_party_article_item)
        // console.log(bool)
        if(bool) {
          category = value
          break
        }
        continue
      }
    }

    if (category) break
    continue
  }


  return category
}


module.exports = determineCategory