import fs from 'fs';

class Attachments{
  ok(req, res, next){
  	return res.sendStatus(200);
  };
  list = async (req, res, next) => {
    mysqlConnection.query('select * from attachments where fk_id=?;', [req.params.id], function (error, results, fields) {
      if (error) return res.status(500).send(error);
      let at = results.map((x)=>{
        let file = '/tpqa/attachments/'+x.file_name;
        if (fs.existsSync(file)){
          x.url='http://localhost:8080/attachments/'+x.id;
          x.testlink_url=null;
        }else{
          x.url=null;
          x.testlink_url=testlink_url+'lib/attachments/attachmentdownload.php?id='+x.id;
        }
        return x;
      });
      return res.send(at);
    });
  };
}
export default new Attachments();
