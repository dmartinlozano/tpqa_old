class TestProject{
  ok(req, res, next){
  	return res.sendStatus(200);
  };

  //list test projects with permissions
  listWithPermissions = async(req, res, next)=>{
    try{
      //Get all test testprojects
      let tps = await new Promise((resolve,reject)=>{
        mysqlConnection.query('select nd.name, tp.* from  testprojects as tp, nodes_hierarchy as nd where tp.id = nd.id;', function (error, results, fields) {
          if (error) reject(error);
          return resolve(results);
        });
      });
      //get a list with testprojects without permisssions
      let tpWithoutPermissions =  await new Promise((resolve,reject)=>{
        mysqlConnection.query('select testproject_id from user_testproject_roles where user_id=? and role_id=3;', [req.userId],function (error, results, fields) {
          if (error) reject(error);
          return resolve(results);
        });
      });
      //Delete the test projects without permissions
      tpWithoutPermissions = tpWithoutPermissions.map((i)=>{return i.testproject_id;});
      for(let i = 0; i < tps.length; i++) {
          if(tpWithoutPermissions.indexOf(tps[i].id) !== -1) {
              tps.splice(i, 1);
              i--;
          }
      }
      return res.send(tps);
    }catch(error){
      return res.status(500).send(error);
    }
  };

  //details of a test project
  details = async (req, res, next) => {
    mysqlConnection.query(`select nd.name, tp.*
                           from testprojects as tp, nodes_hierarchy as nd
                           where tp.id = nd.id and tp.id=?`, [req.params.testProjectId], function (error, results, fields) {
                             if (error) return res.status(500).send(error);
                             if (results.length === 0) return res.status(404).send("Not found");
                             return res.send(results[0]);
                           });
                         };
}
export default new TestProject();
