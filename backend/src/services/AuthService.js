const  jwt = require("jsonwebtoken");

class AuthService{

      static generateToken(user,duree){
        return jwt.sign({user},process.env.JWT_SECRET,{
          expiresIn: duree,
        })
      }
}
module.exports = AuthService;