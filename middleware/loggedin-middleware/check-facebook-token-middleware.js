const axios = require("axios");
const User = require("../../models/User");
const { LoggingInError } = require("../../custom-errors/custom-errors");

module.exports = async (req, res, next) => {
  try {
    const { method } = req.params;
    const token = req.body.token;

    // Define provider-specific URI
    const uri =
      method === "facebook"
        ? `https://graph.facebook.com/me?access_token=${token}&fields=id,email`
        : method === "google"
        ? `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${token}`
        : null;

    if (!uri) {
      return next(new LoggingInError("Authentication method is not valid."));
    }

    // Verify the token with provider
    const response = await axios.get(uri);
    const { id } = response.data;

    // Define search criteria based on method
    const query = method === "facebook" ? { facebookId: id } : { googleId: id };

    // Check if user exists in the database
    const user = await User.findOne(query).select("active _id");

    // Check if user is found
    if (!user) {
      return next(new LoggingInError("User not found. Please register."));
    }

    // Check if the user is active
    if (!user.active) {
      return next(
        new LoggingInError("This account is inactive. Please contact support.")
      );
    }

    // Store the user ID in the session and user in res.locals for later use
    req.session.userId = user._id;
    res.locals.user = user;

    return next();
  } catch (error) {
    console.error(`Error during ${method} login: ${error.message}`);
    return next(
      new LoggingInError(`An error occurred during ${method} login.`)
    );
  }
};
