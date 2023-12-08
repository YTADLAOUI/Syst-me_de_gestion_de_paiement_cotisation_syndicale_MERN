const AuthService = require("../services/AuthService");


class Authentification{

  static login(req,res){
      const {name,password} =req.body;
        if(  name!=="arbi"  || password !== "123456789" ){
          return res.status(400).json({err:"info incorrect"})
        }
       const token=  AuthService.generateToken(name,'48h')
          res.cookie("authToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        
        res.status(200).json({ success: "Logged in successfully", user: name });
  }

}


module.exports=Authentification