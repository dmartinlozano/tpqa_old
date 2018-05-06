class TestProject{
  ok(req, res, next){
  	return res.sendStatus(200);
  };
  list = async (req, res, next) => {
    mysqlConnection.query('select nd.name, tp.* from  testprojects as tp, nodes_hierarchy as nd where tp.id = nd.id;', function (error, results, fields) {
      if (error) return res.status(500).send(error);
      return res.send(results);
    });
  };
  details = async (req, res, next) => {
    mysqlConnection.query(`select nd.name, tp.*
                           from testprojects as tp, nodes_hierarchy as nd
                           where tp.id = nd.id and tp.id=?`, [req.params.testProjectId], function (error, results, fields) {
                             if (error) return res.status(500).send(error);
                             return res.send(results[0]);
                           });
                         };
}
export default new TestProject();
