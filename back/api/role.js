
class Role{
  ok(req, res, next){
  	return res.sendStatus(200);
  };
  list = async (req, res, next) => {
    mysqlConnection.query(`select * from roles`, function (error, results, fields) {
                             if (error) return res.status(500).send(error);
                             return res.send(results);
                           });
                         };
  listByTestProject = async (req, res, next) => {
    mysqlConnection.query(`select 	us.id,
		                                us.login,
                                      us.role_id as global_role_id,
                                      ro1.description as global_role_description,
                                      utr.testproject_id,
                                      nh.name,
                                      ro2.id as tp_role_id,
                                      ro2.description as tp_role_description
                                      from users as us
                                      left join roles as ro1 on us.role_id=ro1.id
                                      left join user_testproject_roles as utr on us.id=utr.user_id
                                      left join roles as ro2 on utr.role_id=ro2.id
                                      left join nodes_hierarchy as nh on nh.id=utr.testproject_id;`, function (error, results, fields) {
                             if (error) return res.status(500).send(error);
                             if (results.length === 0) return res.status(404).send("Not found");
                             return res.send(results);
                           });
                         };
}
export default new Role();
