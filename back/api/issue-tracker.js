class IssueTracker{
  ok(req, res, next){
  	return res.sendStatus(200);
  };
  list =  async (req, res, next) => {
    mysqlConnection.query(`select * from testproject_issuetracker as ti
                           right join issuetrackers as it on it.id=issuetracker_id;`,  function (error, results, fields) {
                             if (error) return res.status(500).send(error);
                             return res.send(results);
                           });
                         };
}
export default new IssueTracker();
