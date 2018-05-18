import md5 from 'md5';
import jwt from 'jwt-simple';
import moment from 'moment';
const JWT_SECRET = process.env.JWT_SECRET||'TPQA-MOLA-UN-MONTON';

class Login{
  ok(req, res, next){
  	return res.sendStatus(200);
  };
  login =  async (req, res, next) => {
    var username = req.body.username;
    mysqlConnection.query(`select * from users where login = ? and password=?`, [username, md5(req.body.password)], function (error, results, fields) {
                             if (error) return res.status(500).send(error);
                             if (results.length === 1){
                               let payload = {
                                    sub: username,
                                    userId: results[0].id,
                                    email: results[0].email,
                                    roleId: results[0].role_id,
                                    iat: moment().unix(),
                                    exp: moment().add(1, 'days').unix()
                                  };
                              let token = jwt.encode(payload, JWT_SECRET);
                              return res.send({ token:token });
                             }else{
                               return res.sendStatus(404);
                             }
                           });
                         };
}
export default new Login();
