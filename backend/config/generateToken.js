const jwt = require("jsonwebtoken");
// sign a token and then return it
const generateToken = (user) => {
  console.log(user);
  return jwt.sign({ id: user._id,  isAdmin: user.isAdmin}, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
};

module.exports = generateToken;
