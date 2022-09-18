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
  domain_without_protocol: process.env.DOMAIN_WITHOUT_PROTOCOL,
}