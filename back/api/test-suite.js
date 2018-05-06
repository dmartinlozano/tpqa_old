class TestSuite{
  ok(req, res, next){
  	return res.sendStatus(200);
  };
  details = async (req, res, next) => {
    mysqlConnection.query(`select nd.name, ts.*
                           from testsuites as ts, nodes_hierarchy as nd
                           where ts.id = nd.id and ts.id=?`, [req.params.testSuiteId], function (error, results, fields) {
                             if (error) return res.status(500).send(error);
                             return res.send(results[0]);
                           });
                         };
  keywords = async (req, res, next) => {
   mysqlConnection.query(`select k.*
                          from object_keywords as ts , keywords as k
                          where ts.fk_id = ? and k.id=ts.keyword_id;`, [req.params.testSuiteId], function (error, results, fields) {
                            if (error) return res.status(500).send(error);
                            return res.send(results);
                          });
                        };
}
export default new TestSuite();
