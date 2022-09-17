module.exports = {
  database_link: process.env.DATABASE_LINK,
  express_session_secret: process.env.EXPRESS_SECRET,
  port: process.env.PORT,
  domain: process.env.REACT_APP_DOMAIN,
  database_name: process.env.DATABASE_NAME,
  environment: process.env.ENVIRONMENT,
  // All credentials generated through the https://developer.paypal.com/ URL, logged in as businessZBRS@gmail.com, in a sandbox context
  paypal_product_id: process.env.PAYPAL_PRODUCT_ID, // Product linked to sb-mzq9r20359069@business.example.com, throught to the BidBlock Development Staging created app
  paypal_client_id: process.env.PAYPAL_CLIENT_ID, // BidBlock Development Staging created app client ID linked to sb-mzq9r20359069@business.example.com
  paypal_secret: process.env.PAYPAL_SECRET, // BidBlock Development Staging created app secret linked to sb-mzq9r20359069@business.example.com
  paypal_api_root: process.env.PAYPAL_API_ROOT,
}


// TODO set up prod enrivonments on the server
// DATABASE_LINK: mongodb+srv://Maestro:DB%24%251993@cluster0.81z5d.mongodb.net/mern_database_atlas
// EXPRESS_SECRET: keyboard cat
// PORT: 3000
// REACT_APP_DOMAIN: https://hidden-plateau-87550.herokuapp.com
// DATABASE_NAME: mern_database_atlas
// ENVIRONMENT: production
// PAYPAL_PRODUCT_ID: PROD-6NP19803R0467982A
// PAYPAL_CLIENT_ID: ATXJhXxcZNV30C3S1vll7GE8VfNhZLnRfkz1dfS7ic1PTRQI8k7e8FwQWIOwoFBJs6nMM49JIVnESF_f
// PAYPAL_SECRET: EMCZmiBejeSf5Hkik7HrtjZewPE3-5JCrjwkzWVZOEUw1jvzfg-3gBS6XKeg_vVhuIA00OEuLBvId8of
// PAYPAL_API_ROOT: https://api-m.sandbox.paypal.com/v1