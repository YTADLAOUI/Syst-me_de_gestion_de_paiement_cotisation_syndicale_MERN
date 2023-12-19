const { validateToken } = require("../services/AuthService");
const cookieParser = require('cookie-parser');
class AuthMiddle{
  static userLogged(req, res, next) {
    cookieParser()(req, res, () => {});
    const token = req.cookies.Token; 
    console.log(token, "hello");
    if (token) {
      const verify = validateToken(token);
      console.log(verify, "Verify");
      if (verify.success) return next();
    } else {
      res.json("You should be logged in");
    }
  }

}
module.exports=AuthMiddle