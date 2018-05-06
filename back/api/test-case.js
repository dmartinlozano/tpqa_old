class TestCase{
  ok(req, res, next){
  	return res.sendStatus(200);
  };
  versions =  async (req, res, next) => {
    mysqlConnection.query(`select * from nodes_hierarchy as nd
                           where nd.node_type_id = 4 and nd.parent_id=?
                           order by nd.id`, [req.params.testCaseId], function (error, results, fields) {
                             if (error) return res.status(500).send(error);
                             return res.send(results);
                           });
                         };
  details = async (req, res, next) => {
    mysqlConnection.query(`select * from nodes_hierarchy as nd, tcversions as tcv
                           where nd.id = ? and tcv.id = ?`, [req.params.testCaseId, req.params.testCaseVersionId], function (error, results, fields) {
                             if (error) return res.status(500).send(error);
                             return res.send(results[0]);
                           });
                         };
  steps = async (req, res, next) => {
   mysqlConnection.query(`select * from nodes_hierarchy as nd, tcsteps as tcs
                          where nd.node_type_id=9 and parent_id=? and tcs.id=nd.id`, [req.params.testCaseVersionId], function (error, results, fields) {
                            if (error) return res.status(500).send(error);
                            return res.send(results);
                          });
  };
  keywords = async (req, res, next) => {
   mysqlConnection.query(`select * from nodes_hierarchy as nc, testcase_keywords as tck, keywords as kw
                          where nc.id = ? and nc.id = tck.testcase_id and  kw.id = tck.keyword_id`, [req.params.testCaseId], function (error, results, fields) {
                            if (error) return res.status(500).send(error);
                            return res.send(results);
                          });
                        };
  requirements = async(req,res,next) => {
    mysqlConnection.query(`select req.id, req.req_doc_id, rs.doc_id from nodes_hierarchy as nc, req_coverage as rc, requirements as req, req_specs as rs
                           where nc.id=? and rc.testcase_id=nc.id and req.id=rc.req_id and req.srs_id=rs.id;`, [req.params.testCaseId], function (error, results, fields) {
                              if (error) return res.status(500).send(error);
                                return res.send(results);
                              });
                        };
  related = async(req,res,next) => {
    mysqlConnection.query(`select tr.destination_id as id, tr.relation_type, us.login, nh.name, 0 as type
                           from testcase_relations as tr, nodes_hierarchy as nh, users as us
                           where tr.source_id=? and us.id=tr.author_id and tr.destination_id=nh.id
                           union
                           select tr.source_id as id, tr.relation_type, us.login, nh.name, 1 as type
                           from testcase_relations as tr, nodes_hierarchy as nh, users as us
                           where tr.destination_id=? and us.id=tr.author_id and tr.source_id=nh.id;`, [req.params.testCaseId, req.params.testCaseId], function (error, results, fields) {
                              if (error) return res.status(500).send(error);
                                return res.send(results);
                              });
                        };
}
export default new TestCase();
