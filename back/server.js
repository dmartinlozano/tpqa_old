import express from 'express';

let app = express();

// Create link to Angular build directory
if (__dirname.endsWith("dist")){
  app.use(express.static(__dirname + "/../../front/dist/"));
}else{
  app.use(express.static(__dirname + "/../front/dist/"));
}


// node server running =========================================================
app.listen(8080, function(){
  console.log("Running server!");
});

export default app;
