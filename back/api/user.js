import md5 from 'md5';
import jwt from 'jwt-simple';
import moment from 'moment';
import RoleCache from '../cache/role';
const JWT_SECRET = process.env.JWT_SECRET||'TPQA-MOLA-UN-MONTON';

class User{
  ok(req, res, next){
  	return res.sendStatus(200);
  };
  login =  async (req, res, next) => {
    var username = req.body.username;
    mysqlConnection.query(`select * from users where login = ? and password=?`, [username, md5(req.body.password)], function (error, results, fields) {
                             if (error) return res.status(500).send(error);
                             if (results.length === 1){
                               let payload = {
                                    sub: results[0].id,
                                    iat: moment().unix(),
                                    exp: moment().add(1, 'days').unix()
                                  };
                              let token = jwt.encode(payload, JWT_SECRET);
                              RoleCache.setRole(results[0].id);
                              return res.send({ token:token });
                             }else{
                               return res.sendStatus(404);
                             }
                           });
                         };
  rights =  async (req, res, next) => {
   var username = req.body.username;
   mysqlConnection.query(`select user.id, user.login, rr.right_id, ri.description
                          from users as user, rights as ri, role_rights as rr
                          where user.id = ? and user.role_id =  rr.role_id and ri.id = rr.right_id;`, [username], function (error, results, fields) {
                            if (error) return res.status(500).send(error);
                            return res.send(results);
                          });
                        };
}
export default new User();
