const express = require('express')
const operationsBackend_app_router = express.Router()
var ObjectId = require('mongodb').ObjectId;

const { CreateArticleError } = require('../custom-errors/custom-errors')


const MulterSetup = require('../services/multer-services/multer.src')
const multerinstance = new MulterSetup(`./public/img/temporal-new`, new CreateArticleError("Directory: temporal-new directory is not present."), new CreateArticleError('Only images with proper extensions are allowed'))



// Environment variables and types
const ENV = require('../config/base')
const NAVBAR = require('../full-stack-libs/Types/Navbar')
const ROLE = require('../full-stack-libs/Types/Role')
const CATEGORY = require('../full-stack-libs/Types/ArticleCategories')

//Models
const Message = require('../models/messaging-models/Message')
const Protagonist = require('../models/messaging-models/Protagonist')
const Article = require('../models/articles-models/Article')
const User = require('../models/User')
const UserProfileImage = require('../models/UserProfileImage')



const operationsControllers = require('../controllers/operations-controllers/operations-controllers')


const { requester_auth_middleware } = require('../middleware/generic-middleware/requester-auth-middleware')
const paginatingSetupMiddleware = require('../middleware/generic-middleware/paginating-setup-middleware')

const articlesMiddleware = require('../middleware/articles-middleware/articles-middleware')

const usersRetrievalMiddleware = require('../middleware/operations-middleware/users-retrieval-middleware')
const messagesRetrievalMiddleware = require('../middleware/operations-middleware/messages-retrieval-middleware')

const destructureURLandRefererMiddleware = require('../middleware/generic-middleware/destructure-URL-&-referer-middleware')


const distributePaginatedDataController = require('../controllers/generic-controllers/distribute-paginated-data-controller')

const {getDetailedUserSubscriptionInfo} = require('../middleware/generic-middleware/get-detailed-user-subsciption-information-middleware')
const {getProfilePicNameIfAnyMiddleware} = require('../middleware/generic-middleware/get-profile-pic-name-if-any-middleware')



// Use this to check the role, requires a res.locals.user.role
const { set_user_if_any } = require("../middleware/generic-middleware/set-user-if-any-middleware")
const { authenticate_role_for_pages, authenticate_role_for_data } = require("../middleware/generic-middleware/authenticate-role-middleware")
const { require_loggedin_for_pages, require_loggedin_for_data } = require("../middleware/generic-middleware/check-loggedin-middleware")


// Errors
const {MongoError} = require('../custom-errors/custom-errors')







// Start middleware for this operationsBackend_app_router
// Route is called upon as request from browser as '/operations'
operationsBackend_app_router.use(set_user_if_any, (req, res, next) => {
  // Might need this as a "script endpoint global" variable!
  // res.locals.CATEGORY = CATEGORY;
  res.locals.userId = req.session.userId
  navBars = NAVBAR.OPERATORS
  next()
})



operationsBackend_app_router.get(['/help-for-orders/:userID', '/monitor-messages/:userID', '/help-for-market-orders/:userID', '/set-settings/:userID'], require_loggedin_for_pages(true), 
authenticate_role_for_pages([ROLE.MASTER]), 
operationsControllers.getOperationsPagesController)







operationsBackend_app_router.get('/paginated-users/users-for-display', require_loggedin_for_data(true), 
authenticate_role_for_data([ROLE.MASTER]), 
paginatingSetupMiddleware, 
destructureURLandRefererMiddleware, 
usersRetrievalMiddleware, 
distributePaginatedDataController)




operationsBackend_app_router.get('/detailed-user-information/:userID', require_loggedin_for_data(true), authenticate_role_for_data([ROLE.MASTER]), requester_auth_middleware(2), getDetailedUserSubscriptionInfo("PATHPARAM", "subscriptionID"), (req,res) => {

  res.status(200).json({
    selectedUser: res.locals.selectedUser
  })

})






operationsBackend_app_router.get('/manage-subs/:userID', require_loggedin_for_pages(true), authenticate_role_for_pages([ROLE.MASTER]), getProfilePicNameIfAnyMiddleware("PATHPARAM"), operationsControllers.getOperationsPagesController)






operationsBackend_app_router.get(['/', '/articles-dashboard'], require_loggedin_for_pages(true), authenticate_role_for_pages([ROLE.MASTER]), (req, res) => {


  console.log("\n\n\n_____________", req.session.userId)
  var JSX_to_load
  JSX_to_load = 'Operations';

  // console.log("Response locals: ___________________/n", res.locals, navBars, loggedIn, "\n\n____________________")
  
  res.render('bodies/generic-boilerplate-ejs-to-render-react-components-operations', {
    JSX_to_load: JSX_to_load,
  })

  console.log("done")
})


operationsBackend_app_router.get('/create-article', require_loggedin_for_pages(true), authenticate_role_for_pages([ROLE.MASTER]), (req, res) => {

  res.locals.CATEGORY = CATEGORY;


  var JSX_to_load
  JSX_to_load = 'CreateArticle';

  // console.log("Response locals: ___________________/n", res.locals, navBars, loggedIn, "\n\n____________________")
  res.render('bodies/generic-boilerplate-ejs-to-render-react-components-operations', {
    JSX_to_load: JSX_to_load,
  })
})



operationsBackend_app_router.get('/article-selector', require_loggedin_for_pages(true), authenticate_role_for_pages([ROLE.MASTER]), (req, res) => {

  var JSX_to_load
  JSX_to_load = 'ArticleSelector';

  // console.log("Response locals: ___________________/n", res.locals, navBars, loggedIn, "\n\n____________________")

  res.render('bodies/generic-boilerplate-ejs-to-render-react-components-operations', {
    JSX_to_load: JSX_to_load,
  })
})


operationsBackend_app_router.get(['/help-for-orders', '/monitor-messages', '/manage-subs', '/help-for-market-orders', '/set-settings'], require_loggedin_for_pages(true), authenticate_role_for_pages([ROLE.MASTER]), (req, res) => {

  // res.locals.CATEGORY = CATEGORY;

  


  var JSX_to_load
  JSX_to_load = 'Operations';

  // console.log("Response locals: ___________________/n", res.locals, navBars, loggedIn, "\n\n____________________")
  res.render('bodies/generic-boilerplate-ejs-to-render-react-components-operations', {
    JSX_to_load: JSX_to_load,
  })
})








// , require_loggedin_for_data(true), authenticate_role_for_data([ROLE.MASTER]), requester_auth_middleware(2)
operationsBackend_app_router.get('/monitor-messages/:userID/edit-see', require_loggedin_for_data(true), authenticate_role_for_data([ROLE.MASTER]), requester_auth_middleware(2), (req, res) => {

  var JSX_to_load
  JSX_to_load = 'Operations';

  
  // console.log("Response locals: ___________________/n", res.locals, navBars, loggedIn, "\n\n____________________")
  res.render('bodies/generic-boilerplate-ejs-to-render-react-components-operations', {
    JSX_to_load: JSX_to_load,
  })
})




operationsBackend_app_router.post('/create-article', require_loggedin_for_pages(true), authenticate_role_for_pages([ROLE.MASTER]), multerinstance.upload.single('image'), articlesMiddleware.setTheExcerptMiddleware, articlesMiddleware.makeSureDestinationFolderPresentMiddleware,  articlesMiddleware.createArticleInstanceMiddleware, articlesMiddleware.processArticleImageMiddleware,  articlesMiddleware.createArticleEnclosureImageInstanceMiddleware, articlesMiddleware.saveTheArticleEntryMiddleware, articlesMiddleware.saveTheArticleEnclosureImageEntryMiddleware,  operationsControllers.responseCreateArticleController)





operationsBackend_app_router.get('/paginated-messages/:userID', require_loggedin_for_data(true), authenticate_role_for_data([ROLE.MASTER]), requester_auth_middleware(2), paginatingSetupMiddleware, destructureURLandRefererMiddleware, messagesRetrievalMiddleware, distributePaginatedDataController)


operationsBackend_app_router.delete('/deletions/message/:userA/:userB/:msg_stream_element_id', require_loggedin_for_data(true), authenticate_role_for_data([ROLE.MASTER]), async (req, res, next) => {
  console.log("we got on the server: ", req.params.userA, req.params.userB, req.params.msg_stream_element_id)

  // Do the deletion

  let identifyProtagonistIDoftheConvo_ID = await Protagonist.find({
    $and: [
      { protagonists: { $elemMatch: { "$in": [req.params.userA] } } },
      { protagonists: { $elemMatch: { "$in": [req.params.userB] } } }
    ]
  }).select('_id')

  console.log(identifyProtagonistIDoftheConvo_ID[0])

  if (!identifyProtagonistIDoftheConvo_ID[0]) return next(new Error("no conversation from Protagonist"))


  let qquery = Message.find({ protagonists: identifyProtagonistIDoftheConvo_ID[0]._id })

  let originalMsg_StreamLength = await qquery.exec()
  originalMsg_StreamLength = originalMsg_StreamLength[0].msg_stream.length


  let deleteMessageReturn
  let query = Message.findOneAndUpdate({ protagonists: identifyProtagonistIDoftheConvo_ID[0]._id }, { $pull: { msg_stream: { _id: req.params.msg_stream_element_id } } }, { rawResult: true, strict: false, new: true })


  deleteMessageReturn = await query.exec()


  console.log(deleteMessageReturn)
  let afterMsg_StreamLength = deleteMessageReturn.value.msg_stream.length



  if (originalMsg_StreamLength > afterMsg_StreamLength) {
    res.status(200).json({
      SERVER: "Deletion success!"
    })
  } else {
    res.status(202).json({
      SERVER: "No deletion took place!"
    })
  }
})




module.exports = operationsBackend_app_router
