// This should be working and enabling the load of the process env variables in dev and prod
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

module.exports = {
  database_link: process.env.DATABASE_LINK,
  express_session_secret: process.env.EXPRESS_SECRET,
  port: process.env.PORT,
  // domain: process.env.REACT_APP_DOMAIN,
  database_name: process.env.DATABASE_NAME,
  environment: process.env.ENVIRONMENT,
  // All credentials generated through the https://developer.paypal.com/ URL, logged in as businessZBRS@gmail.com, in a sandbox context
  paypal_product_id: process.env.PAYPAL_PRODUCT_ID, // Product linked to sb-mzq9r20359069@business.example.com, throught to the BidBlock Development Staging created app
  paypal_client_id: process.env.PAYPAL_CLIENT_ID, // BidBlock Development Staging created app client ID linked to sb-mzq9r20359069@business.example.com
  paypal_secret: process.env.PAYPAL_SECRET, // BidBlock Development Staging created app secret linked to sb-mzq9r20359069@business.example.com
  paypal_api_root: process.env.PAYPAL_API_ROOT,
  domain_without_protocol: process.env.DOMAIN_WITHOUT_PROTOCOL,
  paypal_plan_id: process.env.PAYPAL_PLAN_ID,
  console_cloud_google_api_key: process.env.CONSOLE_CLOUD_GOOGLE_API_KEY,
  bidblock_email: process.env.BIDBLOCK_EMAIL,
  bidblock_email_app_pass_code: process.env.BIDBLOCK_EMAIL_APP_PASS_CODE,
  google_maps_api_url: process.env.GOOGLE_MAPS_API_URL,
}