const JWT_SECRET = process.env.JWT_SECRET||'TPQA-MOLA-UN-MONTON';
import jwt from 'jwt-simple';
import moment from 'moment';
import RoleCache from '../cache/role';

class AuthMiddleware{

  permissions = (rightToCheck) =>{
    return async (req, res, next) => {
      //check jwt
      if (!req.headers.authorization){
        return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
      }
      let token = req.headers.authorization.split("Bearer ")[1];
      let payload, userId, rights;
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
      req.userId = userId;

      //get roles
      try{
        rights = await RoleCache.getRole(userId);
      } catch( err ){
          console.log("Recover role from db for user "+userId);
          rights = await RoleCache.setRole(userId);
      }

      //check permissions by test project
      if (req.params.testProjectId){
        let rightsByProject = rights.filter(x => x.testproject_id === parseInt(req.params.testProjectId));
        let projectWithoutPermissions = rightsByProject.find(x => x.tp_role_id === 3);
        if (projectWithoutPermissions !== undefined){
          return res.status(403).send({ message: `The user has not permissions for the testProjectid ${req.params.testProjectId}`});
        }
        if (rightToCheck !== "VIEW_TEST_PROJECT" && rightsByProject.length>0){
          let right = rightsByProject.find(x => x.tp_right_description.toUpperCase() === rightToCheck.toUpperCase());
          if (right === undefined){
            return res.status(403).send({ message: `The user has not permissions for the testProjectid ${req.params.testProjectId} with specific role assigned`});
          }
        }
      }

      //TODO check permissions by testplan: como el bloque anterior

      //check global permissions
      if (rightToCheck !== "VIEW_TEST_PROJECT"){
        let right = rights.find(x => x.global_right_description.toUpperCase() === rightToCheck.toUpperCase());
        if (right === undefined){
          return res.status(403).send({ message: `The user has not permissions`});
        }
      }
      return next();
    }
  }
}
export default new AuthMiddleware();
