import NodeCache from 'node-cache';
const roleCache = new NodeCache();

class RoleCache{
  setRole = async (userId) => {
    let rights = await this._rigths(userId);
    roleCache.set( userId, rights );
    return rights;
  };

  getRole = async (userId) => {
    try{
        return roleCache.get(userId, true );
    } catch( err ){
        throw err;
    }
  };

  _rigths =  (userId) => {
      return new Promise((resolve, reject) => {
        mysqlConnection.query(`select 	us.id,
		                                    us.login,
                                        us.role_id as global_role_id,
                                        rr1.right_id as global_right_id,
                                        rights1.description as global_right_description,
                                        utr.testproject_id,
                                        utr.role_id as tp_role_id,
                                        rr2.right_id as tp_right_id,
                                        rights2.description as tp_right_description
                               from users as us
                               left join role_rights as rr1 on rr1.role_id=us.role_id
                               left join rights as rights1 on rights1.id = rr1.right_id
                               left join user_testproject_roles as utr on us.id=utr.user_id
                               left join role_rights as rr2 on rr2.role_id=utr.role_id
                               left join rights as rights2 on rights2.id=rr2.role_id
                               where us.id=?;`,[userId], function (error, results, fields) {
                          if (error) return reject(error);
                          return resolve(results);
                        });
                      });
                    };

}export default new RoleCache();
