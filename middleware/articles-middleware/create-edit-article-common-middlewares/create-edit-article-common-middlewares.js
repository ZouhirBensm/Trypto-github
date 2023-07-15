const { H2_Block, H3_Block, SUMMERNOTE_Block, IMG_Block, IFRAME_Block, A_Block, EMAIL_Block } = require("../../../models/articles-models/ArticleNestedData")

const SECTION_TYPES = require("../../../full-stack-libs/Types/ArticleSectionTypes")






function seeData(req, res, next) {
  console.log("\n\n\nseeData...")

  console.log("____________________________\n\nreq.body.create_true_edit_false: --> ", req.method,req.body.create_true_edit_false, req.url, "\n\n")


  // console.log("____________________________\n\nreq.body: \n\n")
  // console.log(req.body)

  // console.log("____________________________\n\nJSON.parse(req.body.nested_data_copy): \n\n")
  // console.log('\n\n', JSON.parse(req.body.nested_data_copy))

  // console.log("____________________________\n\nreq.files: \n\n")
  // console.log('\n\n', req.files)

  // FOR TESTING
  // return res.status(200).end()

  res.locals.nested_data = JSON.parse(req.body.nested_data_copy)
  
  return next()
}



// TEMPORAL COMMENTED OUT
// function setTheExcerptMiddleware(req, res, next) {
//   console.log("setTheExcerptMiddleware...")

//   let excerpt
//   let split_content = req.body.content.split(" ")
//   let split_excerpt = split_content.slice(0, 12)
//   excerpt = split_excerpt.join(" ")

//   req.body.excerpt = excerpt

//   return next()
// }


// TODO !!!! need to set an exerpt, and pull it from the nested_data_copy, on the back end and integrate it to the Article schema and save
// TODO !!!! need to add the category input on the front end and save it in the Article schema







// TODO !!!!! merge this middleware with the create one (same)
async function commonArticleNestedDatatMiddleware1(req, res, next) {
  console.log("commonArticleNestedDatatMiddleware1...");


  let ARR_mongoose_Blocks = []




  for (let i = 0; i < res.locals.nested_data.length; i++) {


    const nested_data_block = res.locals.nested_data[i];

    switch (nested_data_block.type) {
      
      case SECTION_TYPES.H2:
        const h2Block = new H2_Block({
          id: nested_data_block.id,
          H2_innerHTML: nested_data_block.H2_innerHTML,
        });

        // await h2Block.save(); // Save the H2_Block instance to the database
        
        // Validating the block against it's schema. Otherwise would have not and just saved.
        try { await h2Block.validate(); } catch (error) { return next(error) }

        ARR_mongoose_Blocks.push(h2Block);
        break;
      case SECTION_TYPES.H3:
        const h3Block = new H3_Block({
          id: nested_data_block.id,
          H3_innerHTML: nested_data_block.H3_innerHTML,
        });

        // await h3Block.save(); // Save the H2_Block instance to the database
        try { await h3Block.validate(); } catch (error) { return next(error) }

        ARR_mongoose_Blocks.push(h3Block);
        break;

      case SECTION_TYPES.SUMMERNOTE:
        const summernoteBlock = new SUMMERNOTE_Block({
          id: nested_data_block.id,
          SUMMERNOTE_innerHTML: nested_data_block.SUMMERNOTE_innerHTML,
        });

        // await summernoteBlock.save(); // Save the H2_Block instance to the database
        try { await summernoteBlock.validate(); } catch (error) { return next(error) }

        ARR_mongoose_Blocks.push(summernoteBlock);
        break;

      case SECTION_TYPES.IMG:

        let image = undefined

        if (nested_data_block.image) {

          image = {
            path: `${res.locals.directory_article_images_folder_path}/${nested_data_block.image?.multer_name}`,
            image_name: nested_data_block.image?.image_name,
            multer_name: nested_data_block.image?.multer_name,
            sharp_format: nested_data_block.image?.sharp_format,
            sharp_width: nested_data_block.image?.sharp_width,
            sharp_height: nested_data_block.image?.sharp_height,
            sharp_size: nested_data_block.image?.sharp_size,
          }

        }

        const imgBlock = new IMG_Block({
          id: nested_data_block.id,
          img_width: nested_data_block.img_width,
          img_height: nested_data_block.img_height,
          img_src: nested_data_block.img_src,
          // If missing, the field does not register
          img_alt: nested_data_block.img_alt,
          img_description: nested_data_block.img_description,
          image: image,
        });



        // await imgBlock.save(); // Save the H2_Block instance to the database
        try { await imgBlock.validate(); } catch (error) { return next(error) }

        ARR_mongoose_Blocks.push(imgBlock);
        break;
      case SECTION_TYPES.IFRAME:

        const iframeBlock = new IFRAME_Block({
          id: nested_data_block.id,
          iframe_width: nested_data_block.iframe_width ? parseInt(nested_data_block.iframe_width) : undefined,
          iframe_height: nested_data_block.iframe_height ? parseInt(nested_data_block.iframe_height) : undefined,
          // iframe_type: nested_data_block.iframe_type,
          iframe_name: nested_data_block.iframe_name,
          iframe_description: nested_data_block.iframe_description,
          iframe_source: nested_data_block.iframe_source,
          // iframe_title: nested_data_block.iframe_title,
        });

        // await iframeBlock.save();

        try { await iframeBlock.validate(); } catch (error) { return next(error) }

        ARR_mongoose_Blocks.push(iframeBlock);
        break;
      case SECTION_TYPES.A:

        // TEMPORAL
        let image2 = undefined

        if (nested_data_block.image) {

          image2 = {
            path: `${res.locals.directory_article_images_folder_path}/${nested_data_block.image?.multer_name}`,
            image_name: nested_data_block.image?.image_name,
            multer_name: nested_data_block.image?.multer_name,
            sharp_format: nested_data_block.image?.sharp_format,
            sharp_width: nested_data_block.image?.sharp_width,
            sharp_height: nested_data_block.image?.sharp_height,
            sharp_size: nested_data_block.image?.sharp_size,
          }

        }

        const aBlock = new A_Block({
          id: nested_data_block.id,
          A_href: nested_data_block.A_href,
          A_title: nested_data_block.A_title,

          newtab: nested_data_block.newtab,
          nofollow: nested_data_block.nofollow,
          ugc: nested_data_block.ugc,
          noopener: nested_data_block.noopener,
          image_mode_on: nested_data_block.image_mode_on,

          A_innerText: nested_data_block.A_innerText,

          img_width: nested_data_block.img_width,
          img_height: nested_data_block.img_height,
          img_src: nested_data_block.img_src,
          img_alt: nested_data_block.img_alt,
          img_description: nested_data_block.img_description,
          image: image2,
        });

        // await aBlock.save(); // Save the IFRAME_Block instance to the database
        try { await aBlock.validate(); } catch (error) { return next(error) }


        ARR_mongoose_Blocks.push(aBlock);
        break;
      case SECTION_TYPES.EMAIL:
        const emailBlock = new EMAIL_Block({
          id: nested_data_block.id,
          EMAIL_title: nested_data_block.EMAIL_title,
          EMAIL_subtitle: nested_data_block.EMAIL_subtitle,
        });

        // await emailBlock.save(); // Save the H2_Block instance to the database
        try { await emailBlock.validate(); } catch (error) { return next(error) }


        ARR_mongoose_Blocks.push(emailBlock);
        break;


      default:
        break;
    }

  }

  res.locals.ARR_mongoose_Blocks = ARR_mongoose_Blocks

  return next()


}







const commonCreateEditArticleMiddleware = {
  seeData: seeData,
  commonArticleNestedDatatMiddleware1: commonArticleNestedDatatMiddleware1
}



module.exports = commonCreateEditArticleMiddleware