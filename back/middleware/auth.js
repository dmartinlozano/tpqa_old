const JWT_SECRET = process.env.JWT_SECRET||'TPQA-MOLA-UN-MONTON';
import RoleCache from '../cache/role';

class AuthMiddleware{

  permissions = (role) =>{
    return async (req, res, next) => {
      console.log("pasa por aqui 1");
      //check jwt
      let token = req.headers.authorization;
      let payload, userId;
      if (!token) {
        return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
      }
      try {
        payload = jwt.decode(token, JWT_SECRET);
      }catch (err) {
        return res.status(401).send({ message: err.message });
      }
      if (payload.exp <= moment().unix()) {
        return res.status(401).send({ message: 'Token has expired' });
      }
      userId = payload.sub;
      console.log("pasa por aqui 2");
      console.log(userId);
      let role = RoleCache.getRole(userId);
      console.log("pasa por aqui 3");
      console.log(role);
    }
  }
}
export default new AuthMiddleware();
