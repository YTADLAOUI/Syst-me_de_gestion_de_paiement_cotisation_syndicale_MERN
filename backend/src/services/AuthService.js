const  jwt = require("jsonwebtoken");

class AuthService{

      static generateToken(user,duree){
        return jwt.sign({user},process.env.JWT_SECRET,{
          expiresIn: duree,
        })
      }
      static validateToken(token) {
        try{
            let decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            let obj = {"success": "Token is valid", "data": decodedToken};
            return obj;
        } catch (err) {
            return {"error": "Token is invalid"}
        }
      }
}
module.exports = AuthService;