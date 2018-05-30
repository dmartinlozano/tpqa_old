import NodeCache from 'node-cache';
const roleCache = new NodeCache();

class RoleCache{
  setRole = async (userId) => {
    let roleId = await this._roleByUserId(userId);
    let rights = await this._rightsByRoles(roleId);
    let rightsByTestProject = await this._rightsByTestProject(userId);
    let rightsByTestPlan = await this._rightsByTestPlan(userId);
    let testProjectsWithoutPermissions = await this._testProjectsWithoutPermissions(userId)
    let testPlansWithoutPermissions = await this._testPlansWithoutPermissions(userId);

    let toWrite = {
      "roleId": roleId,
      "rights": rights,
      "rightsByTestProject": rightsByTestProject,
      "rightsByTestPlan": rightsByTestPlan,
      "testProjectsWithoutPermissions": testProjectsWithoutPermissions,
      "testPlansWithoutPermissions": testPlansWithoutPermissions
    }
    roleCache.set( userId, toWrite );
    return toWrite;
  };

  getRole = async (userId) => {
    try{
        return roleCache.get(userId, true );
    } catch( err ){
        throw err;
    }
  };

  //get general role of an user
  _roleByUserId =  (userId) => {
      return new Promise((resolve, reject) => {
        mysqlConnection.query(`select role_id from users where users.id = ?;`, [userId], function (error, results, fields) {
                            if (error) return reject(error);
                            return resolve(results[0].role_id);
                          });
                        });
                      };
  //get the rights of a role.
  _rightsByRoles = (roleId) => {
    return new Promise((resolve, reject) => {
      mysqlConnection.query(`select rr.role_id, ro.description, ro.notes, rr.right_id, ri.description
                           from roles as ro, rights as ri, role_rights as rr
                           where ri.id = rr.right_id and ro.id = rr.role_id and role_id = ?;`,[roleId], function (error, results, fields) {
                             if (error) return reject(error);
                             return resolve(results);
                           });
                         });
                       };
  //get roles and rights of an user for testprojects.
  _rightsByTestProject = (userId) => {
    return new Promise((resolve, reject) => {
      mysqlConnection.query(`select utr.testproject_id, utr.role_id, rr.right_id, ri.description
                             from user_testproject_roles as utr, rights as ri, role_rights as rr
                             where utr.user_id=? and utr.role_id=rr.role_id and rr.right_id=ri.id;`,[userId], function (error, results, fields) {
                          if (error) return reject(error);
                          return resolve(results);
                        });
                      });
                    };
  //get roles and rights of an user for testplans.
  _rightsByTestPlan = (userId) => {
    return new Promise((resolve, reject) => {
      mysqlConnection.query(`select utr.testplan_id, utr.role_id, rr.right_id, ri.description
                             from user_testplan_roles as utr, rights as ri, role_rights as rr
                             where utr.user_id=? and utr.role_id=rr.role_id and rr.right_id=ri.id;`,[userId], function (error, results, fields) {
                          if (error) return reject(error);
                          return resolve(results);
                        });
                      });
                    };
  //get testprojects without permissions by user
  _testProjectsWithoutPermissions = (userId) => {
    return new Promise((resolve, reject) => {
      mysqlConnection.query(`select testproject_id from user_testproject_roles where user_id=? and role_id=3;`,[userId], function (error, results, fields) {
                          if (error) return reject(error);
                          return resolve(results);
                        });
                      });
                    };
  //get testplans without permissions by user
  _testPlansWithoutPermissions = (userId) => {
    return new Promise((resolve, reject) => {
      mysqlConnection.query(`select testplan_id from user_testplan_roles where user_id=? and role_id=3;`,[userId], function (error, results, fields) {
                          if (error) return reject(error);
                          return resolve(results);
                        });
                      });
                    };

}export default new RoleCache();
