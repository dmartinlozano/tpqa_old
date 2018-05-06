class NodesHierarchy{
  ok(req, res, next){
  	return res.sendStatus(200);
  };
  getTree = async (req, res, next) => {
    mysqlConnection.query('select * from nodes_hierarchy where node_type_id = 1 or node_type_id = 2 or node_type_id = 3', function (error, results, fields) {
      if (error) return res.status(500).send(error);
      let treeList = [];
      let lookup = {};
      results.forEach(function(obj) {
          if (obj["name"] !== ""){
            lookup[obj["id"]] = obj;
            obj["isExpanded"] = true;
            obj["title"] = obj["name"];
            obj["children"] = [];
          };
      });
      results.forEach(function(obj) {
         if (obj["parent_id"] != null) {
             lookup[obj["parent_id"]]["children"].push(obj);
         } else {
             treeList.push(obj);
         }
      });
      return res.send(treeList.filter(x => x.id === parseInt(req.params.testProjectId)));;
    });
  };
}
export default new NodesHierarchy();
