const AuthService = require("../services/AuthService");


class Authentification{

  static login(req,res){
    console.log("first")
      const {email,password} =req.body;
        if(  email!=="youssef@tadlaoui.com"  || password !== "123456789" ){
          return res.json({err:"info incorrect"})
        }
       const token=  AuthService.generateToken("youssef",'48h')
          res.cookie("Token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        res.status(200).json({ success: "Logged in successfully", dataUser:{token:token,user:"youssef"}});
  }
}


module.exports=Authentification