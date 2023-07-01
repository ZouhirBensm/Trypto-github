const mongoose = require('mongoose')
const Schema = mongoose.Schema
const SECTION_TYPES = require("../../full-stack-libs/Types/ArticleSectionTypes")

const options = { discriminatorKey: 'type' };

const BlockSchema = new mongoose.Schema({
  order: Number, // id on the front end
}, options);

const ImageSchema = new mongoose.Schema({
  image_name: {
    type: String,
  },
  path: {
    type: String,
  },
  multer_name: {
    type: String
  },
  sharp_format: {
    type: String
  },
  sharp_width: {
    type: Number
  },
  sharp_height: {
    type: Number
  },
  sharp_size: {
    type: Number
  }
});



const Block = mongoose.model('Block', BlockSchema);


const ArticleNestedDataSchema = new Schema({

  blocks: [{
    type: BlockSchema,
    required: true
    // Explanation: KEPT FOR REFERENCE: Seperating blocks with discriminator in own collection and referenced by array of ids. Usuful for commutable and reusable blocks. In this setup, you are required to h2Block.save() (saves to Block collection) and ARR_mongoose_Blocks.push(h2Block.id) and then you create the instance

    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'Block'
  }],

  article_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article',
    required: true
  }
})






// type: H2: DESCRIMINATOR
const H2_Block = Block.discriminator(SECTION_TYPES.H2,
  new mongoose.Schema({
    H2_innerHTML: {
      type: String,
      required: true
    }
  }, options));



// type: H3: DESCRIMINATOR
const H3_Block = Block.discriminator(SECTION_TYPES.H3,
  new mongoose.Schema({
    H3_innerHTML: {
      type: String,
      required: true
    }
  }, options));


// type: SUMMERNOTE: DESCRIMINATOR
const SUMMERNOTE_Block = Block.discriminator(SECTION_TYPES.SUMMERNOTE,
  new mongoose.Schema({
    SUMMERNOTE_innerHTML: {
      type: String,
      required: true
    }
  }, options));



// type: IMG: DESCRIMINATOR
const IMG_Block = Block.discriminator(SECTION_TYPES.IMG,
  new mongoose.Schema({
    img_width: {
      type: Number,
      required: true,
      // TODO !!! should default to whatever sharp width and height retrieved
    },
    img_height: {
      type: Number,
      required: true,
      // TODO !!!!! should default to whatever sharp width and height retrieved
    },
    img_src: String, // Optional
    img_alt: String, // Optional
    img_description: {
      type: String,
      required: true,
    }, 
    image: {
      type: ImageSchema,
    }
  }, options));



// TODO !!!!! HERE continue integrating and testing these types of blocks

// // type: A: DESCRIMINATOR
// const A_Block = Block.discriminator(SECTION_TYPES.A,
//   new mongoose.Schema({
//     A_href: String,
//     A_title: String,
//     newtab: {
//       type: Boolean
//     },
//     newnofollowtab: {
//       type: Boolean
//     },
//     ugc: {
//       type: Boolean
//     },
//     noopener: {
//       type: Boolean
//     },
//     image_mode_on: {
//       type: Boolean,
//     },


//     // image_mode_on, present and true
//     img_width: Number,
//     img_height: Number,
//     img_alt: String,
//     img_description: String,
//     image: {
//       image_name: {
//         type: String
//       }
//     },

//     // image_mode_on, not present
//     A_innerText: String

//   }, options));


// // type: EMBED: DESCRIMINATOR
// const EMBED_Block = Block.discriminator(SECTION_TYPES.EMBED,
//   new mongoose.Schema({
//     embed_width: Number,
//     embed_height: Number,
//     embed_type: String,
//     embed_source: String,
//     embed_title: String
//   }, options));













// CREATE
// const genericBlock = new Block({ order: 123, H2_innerHTML: 'some H2 title' });
// assert.ok(!genericBlock.H2_innerHTML);

// const h2Block = new H2_Block({ order: 123, H2_innerHTML: 'some H2 title' });
// assert.ok(h2Block.H2_innerHTML);

// QUERY
// const h2Blocks = await Block.find({ type: 'H2' }); // USE OF DECRIMINATOR






const ArticleNestedData = mongoose.model('ArticleNestedData', ArticleNestedDataSchema)

module.exports = { ArticleNestedData, H2_Block, H3_Block, SUMMERNOTE_Block, IMG_Block }

// { A_Block, EMBED_Block }