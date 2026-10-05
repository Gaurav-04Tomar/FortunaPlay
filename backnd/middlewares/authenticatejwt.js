import jwt from 'jsonwebtoken';
const SECRET_KEY="oneandonly1"
const authenticateJwt=(req,res,next)=>{
      const t=req.cookies.token;
      if(!t){
        throw new Error("User not found");
      }
      const d=jwt.verify(t,SECRET_KEY);
      req.data=d;
      next();
}
export default authenticateJwt;
