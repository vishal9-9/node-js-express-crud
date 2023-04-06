const authenticateUser = (req, res, next) => {
  console.log("Authenticating User...");
  next();
};

module.exports = authenticateUser;
