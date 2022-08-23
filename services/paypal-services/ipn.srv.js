const request = require('request')
const Promise = require('bluebird')
const ENV = require('../../config/base')

class PayPalService {

  static validate(body = {}) {
    return new Promise((resolve, reject) => {
      // Prepend 'cmd=_notify-validate' flag to the post string
      let postreq = 'cmd=_notify-validate';
      
      // Iterate the original request payload object
      // and prepend its keys and values to the post string

      console.log("body in service BEFORE: \n", body)
      Object.keys(body).map((key) => {
        console.log("\nkey", key)
        postreq = `${postreq}&${key}=${body[key]}`;
        return key;
      });
      console.log("\n\npostreq in service AFTER: ", postreq)

      console.log(ENV.paypal_ipn_verification_url)
      // In Development and Staging environment: 'https://ipnpb.sandbox.paypal.com/cgi-bin/webscr'
      // IPN URL setup from developer.paypal.com in DEV is for e.g: https://7da8-74-15-215-31.ngrok.io/paypal/ipn Note: Don't forget to activate ngrok locally to receive IPN webhooks
      // in STAG is https://hidden-plateau-87550.herokuapp.com/paypal/ipn
      
      // In Production environment: 'https://ipnpb.paypal.com/cgi-bin/webscr'
      // IPN URL setup from paypal.com in PROD is for e.g: https://bidblock.ca/paypal/ipn 
      

      const options = {
        url: ENV.paypal_ipn_verification_url, 
        method: 'POST',
        headers: {
          'Content-Length': postreq.length,
          'Connection': 'close'
        },
        encoding: 'utf-8',
        body: postreq,

        // strictSSL: true,
        // rejectUnauthorized: false,
        // requestCert: true,
        // agent: false
      };

      // Make a post request to PayPal
      // TODO swap this request library to a fetch because it is deprecated!
      request(options, (error, response, resBody) => {
        console.log("resBody: ", resBody)
        console.log("response.statusCode: ", response.statusCode)
        if (error || response.statusCode !== 200) {
          reject(new Error(error));
          return;
        }

        console.log("test: ", resBody.substring(0, 8))
        // Validate the response from PayPal and resolve / reject the promise.
        if (resBody.substring(0, 8) === 'VERIFIED') {
          resolve(true);
        } else if (resBody.substring(0, 7) === 'INVALID') {
          reject(new Error('IPN Message is invalid.'));
        } else {
          reject(new Error('Unexpected response body.'));
        }
      });
    });
  }

}

module.exports = PayPalService