const NodeCache = require( "node-cache" );
const roleCache = new NodeCache();

Array.prototype.unique=function(a){
  return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});

class RoleCache{
  setRole = async (userId) => {
    let roleId = await this._roleByUserId(userId);
    let roleByTestProject = await this._roleByTestProject(userId);
    let roleByTestCase = await this._roleByTestCase(userId);
    let rolesAux = [roleId];
    if (roleByTestProject){
      roleByTestProject.forEach(function(item){
        rolesAux.push(item.role_id);
      });
    }
    if (roleByTestCase){
      roleByTestCase.forEach(function(item){
        rolesAux.push(item.role_id);
      });
    }
    let roles = await this._rightsByRoles(rolesAux.unique());
    let toWrite = {
      "roleId": roleId,
      "roleByTestProject": roleByTestProject,
      "roleByTestCase": roleByTestCase,
      "roles": roles
    }
    roleCache.set( userId, toWrite );
    return;
  };

  getRole = async (userId) => {
    try{
        return roleCache.get(userId, true );
    } catch( err ){
        throw err;
    }
  };


  _roleByUserId =  (userId) => {
      return new Promise((resolve, reject) => {
        mysqlConnection.query(`select role_id from users where users.id = ?;`, [userId], function (error, results, fields) {
                            if (error) return reject(error);
                            return resolve(results[0].role_id);
                          });
                        });
                      };
  _roleByTestProject = (userId) => {
    return new Promise((resolve, reject) => {
      mysqlConnection.query(`select * from user_testproject_roles as utr where utr.user_id = ?`,[userId], function (error, results, fields) {
                          if (error) return reject(error);
                          return resolve(results);
                        });
                      });
                    };
  _roleByTestCase = (userId) => {
    return new Promise((resolve, reject) => {
      mysqlConnection.query(`select * from user_testplan_roles as utr where utr.user_id = ?`,[userId], function (error, results, fields) {
                          if (error) return reject(error);
                          return resolve(results);
                        });
                      });
                    };
  _rightsByRoles = (roles) => {
    return new Promise((resolve, reject) => {
      mysqlConnection.query(`select rr.role_id, ro.description, ro.notes, rr.right_id, ri.description
                           from roles as ro, rights as ri, role_rights as rr
                           where ri.id = rr.right_id and ro.id = rr.role_id and role_id in (?);`,[roles.join()], function (error, results, fields) {
                             if (error) return reject(error);
                             return resolve(results);
                           });
                         });
                       };
}export default new RoleCache();
