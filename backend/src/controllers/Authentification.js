const AuthService = require("../services/AuthService");


class Authentification{

  static login(req,res){
      const {email,password} =req.body;
        if(  email!=="youssef@ycode.com"  || password !== "123456789" ){
          return res.json({err:"info incorrect"})
        }
       const token=  AuthService.generateToken("youssef",'48h')
       res.cookie("Token", token, { sameSite: 'none', secure: true,});
        res.status(200).json({ success: "Logged in successfully", dataUser:{token:token,user:"youssef"}});
  }

        static logout(req, res){
          // console.log(req);
          const token =req.cookies.Token
          console.log(token)
          res.clearCookie('Token');
          res.json({ success: 'Logged out successfully' });
      }
}


module.exports=Authentification