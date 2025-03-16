const jwt = require('jsonwebtoken');

const verifyAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    // const token = req.headers.authorization;
    // console.log("token", token);  
    

    if (!token) {
        return res.status(401).json({
            data: null,
            message: "Please login first",
        });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if(!decoded){
        return res.status(401).json({
            data: null,
            message: "Please login first",
        });
    }

    req.user = decoded;
    next();

  } catch (error) {
    return res.status(409).json({
      data: null,
      error: error.message,
      message: 'failed to verify',
    });
  }
}

module.exports = verifyAuth;