class CodeTracker{
  ok(req, res, next){
  	return res.sendStatus(200);
  };
  list =  async (req, res, next) => {
    mysqlConnection.query(`select * from testproject_codetracker as tc
                           right join codetrackers as ct on ct.id=tc.codetracker_id;`,  function (error, results, fields) {
                             if (error) return res.status(500).send(error);
                             return res.send(results);
                           });
                         };
}
export default new CodeTracker();
