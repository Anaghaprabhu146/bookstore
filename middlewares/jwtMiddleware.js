const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {

  // tokens is passed from cilent to server via request headers in authroziation key in request headers

  // we user bearer token here,so we need to remove the bearer keyword and separeta toke from it
  // since it is a string ,we converted it into n RRy using split method
  // and we will get the token form 1st index
  let token = req.headers.authorization.split(" ")[1];

  try {
    if (token) {
      let decodedData = jwt.verify(token, process.env.jwtSecertKey);

      if (decodedData) {
        // ?next and update the req
        req.user = decodedData.email;
        next();
      } else {
        res.status(401).json({ message: "invalid token ,please login" });
      }
    } else {
      res.status(401).json({ message: "token is required,please login" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      messsage:
        "something went wrong while validating token,please try login again",
    });
  }
};

module.exports=jwtMiddleware