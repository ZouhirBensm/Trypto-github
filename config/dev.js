module.exports = {
  database_link: 'mongodb://localhost:27017/mern_database',
  express_session_secret: 'keyboard cat',
  port: 3000,
  domain: 'http://localhost:3000',
  database_name: 'mern_database',
  environment: 'developement',
  // All credentials generated through the https://developer.paypal.com/ URL, logged in as businessZBRS@gmail.com, in a sandbox context
  paypal_product_id: 'PROD-6NP19803R0467982A', // Product linked to sb-mzq9r20359069@business.example.com, throught to the BidBlock Development Staging created app
  paypal_client_id: 'ATXJhXxcZNV30C3S1vll7GE8VfNhZLnRfkz1dfS7ic1PTRQI8k7e8FwQWIOwoFBJs6nMM49JIVnESF_f',  // BidBlock Development Staging created app client ID linked to sb-mzq9r20359069@business.example.com
  paypal_api_root: 'https://api-m.sandbox.paypal.com/v1',
  paypal_access_token: 'A21AAJkruharCMNbZQWgxwOhJWjdr4GmTh0JpynOyE2gztLXSjMN5_i_DtsIqIYtt_YzwILVELfXHxQOXYDkG9vHbA93_sc6A', // Generated from developer.paypal.com, linked to the sb-mzq9r20359069@business.example.com sandbox account, linked to the BidBlock Development Staging app, generated with client_id:secret
}