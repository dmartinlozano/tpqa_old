class TestProject{
  ok(req, res, next){
  	return res.sendStatus(200);
  };
  list = async (req, res, next) => {
    mysqlConnection.query('select * from testprojects', function (error, results, fields) {
      if (error) return res.status(500).send(error);
      return res.send(results);
    });
  };
}
export default new TestProject();
