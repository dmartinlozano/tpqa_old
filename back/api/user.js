import md5 from 'md5';
import jwt from 'jwt-simple';
import moment from 'moment';
import RoleCache from '../cache/role';
import {isValidPassword} from '../validators/password';

const JWT_SECRET = process.env.JWT_SECRET||'TPQA-MOLA-UN-MONTON';

class User{
  ok(req, res, next){
  	return res.sendStatus(200);
  };
  login =  async (req, res, next) => {
    mysqlConnection.query(`select * from users where login = ? and password=?`, [req.body.username, md5(req.body.password)], function (error, results, fields) {
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
                               return res.status(404).send("User and password not found");
                             }
                           });
                         };

  resetPassword =  async (req, res, next) => {
    //check passwords
    if (isValidPassword(req.body.oldPassword)) return res.status(500).send("Old Password is invalid");
    if (isValidPassword(req.body.newPassword1)) return res.status(500).send("New Password is invalid");
    if (req.body.newPassword1 !== req.body.newPassword2) return res.status(500).send("New Passwords are not equals");

    mysqlConnection.query('update users set password=? where id = ?', [md5(req.body.newPassword), req.body.id],function (error, results, fields) {
      if (error) reject(error);
      return res.sendStatus(200);
    });
  };

  checkIfExistsAdminUser = async(req,res,next)=>{
    let countUsers = await new Promise((resolve,reject)=>{return resolve(this.count(req,res,next)) ;});
    if (countUsers === 0){
      req.body.login="admin";
      req.body.newPassword =process.env.FIRST_ADMIN_PASSWORD;
      req.body.role_id=8; //admin role
      await new Promise((resolve,reject)=>{return this.create(req,res,next);});
      console.log("admin user created for first time");
      return;
    };
  };

  rights =  async (req, res, next) => {
   mysqlConnection.query(`select user.id, user.login, rr.right_id, ri.description
                          from users as user, rights as ri, role_rights as rr
                          where user.id = ? and user.role_id =  rr.role_id and ri.id = rr.right_id;`, [req.body.username], function (error, results, fields) {
                            if (error) return res.status(500).send(error);
                            return res.send(results);
                          });
                        };
  list = async (req, res, next) => {
    mysqlConnection.query(`select us.id, us.login, us.email, us.first, ro.description, us.last, us.active, us.creation_ts, us.expiration_date
                            from users as us, roles as ro
                            where us.role_id = ro.id;`, function (error, results, fields) {
                             if (error) return res.status(500).send(error);
                             return res.send(results);
                           });
                         };
  count = async (req, res, next) => {
    console.log("hola 1:");
    console.log(res);
     mysqlConnection.query(`select count(*) from users;`, function (error, results, fields) {
                              if (error) return res.status(500).send(error);
                              return res.send(results[0]);
                            });
                          };
  create = async (req, res, next) => {
    mysqlConnection.query(`insert into users posts set ?`,
                            {login: req.body.login,
                             password: md5(req.body.newPassword),
                             role_id: req.body.role_id,
                             active: 1
                             },
                          function (error, results, fields) {
                             if (error) return res.status(500).send(error);
                             return res.send(results);
                           });
                         };

}
export default new User();
