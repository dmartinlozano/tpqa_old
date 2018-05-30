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
      let payload, userId, role;
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
        role = await RoleCache.getRole(userId);
      } catch( err ){
          console.log("Recover role from db")
          role = await RoleCache.setRole(userId);
      }

      //check permissions by test project
      if (req.params.testProjectId){
        //check if exists specific no rights over the testProject
        if (role.testProjectsWithoutPermissions.find(x => x.testproject_id === req.params.testProjectId)){
          return res.status(403).send({ message: `The user has not specific permissions for the testProjectid ${req.params.testProjectId}`});
        }
        //check if exists specific permissions over the testProject
        if (rightToCheck !== "NO_CHECK"){
          let rightsByTestProject = role.rightsByTestProject.find(x => x.testproject_id === req.params.testProjectId && x.description === rightToCheck);
          if (rightsByTestProject){
            next();
          }else{
            return res.status(403).send({ message: `The user has not permissions for the testProjectid ${req.params.testProjectId} with role assigned`});
          }
        }
      }

      //TODO check permissions by testplan: como el bloque anterior

      //check global permissions
      if (rightToCheck !== "NO_CHECK"){
        let rights = role.rights.find(x => x.description === rightToCheck);
        if (rights){
          next();
        }else{
          return res.status(403).send({ message: `The user has not permissions for this action`});
        }
      }
      next();
    }
  }
}
export default new AuthMiddleware();
