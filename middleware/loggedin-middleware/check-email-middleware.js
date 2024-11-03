const User = require("../../models/User"); // Adjust the path as needed

const checkEmailUsed = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    // Query the database to find the user by email
    const user = await User.findOne({ email: email });

    // If user exists, email is taken
    if (user) {
      return res.status(409).json({ message: "Email is already in use." });
    }

    // If user does not exist, proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error(`Error checking email: ${error.message}`);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = checkEmailUsed;
