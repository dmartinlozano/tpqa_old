class NodesHierarchy{
  ok(req, res, next){
  	return res.sendStatus(200);
  };
  getTree(req, res, next){
    mysqlConnection.query('select * from nodes_hierarchy', function (error, results, fields) {
      if (error) return res.status(500).send(error);
      return res.send(results);
    });
  };
}
export default new NodesHierarchy();
