import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import cors from 'cors';
import routes from './routes';

let app = express();
let mysql_host = process.env.MYSQL_HOST || 'localhost';
let mysql_user = process.env.MYSQL_USER || 'root';
let mysql_password = process.env.MYSQL_PASSWORD || '';
let mysql_database = process.env.MYSQL_DATABASE || 'bitnami_testlink';

// Create link to Angular build directory
if (__dirname.endsWith("dist")){
  app.use(express.static(__dirname + "/../../front/dist/"));
}else{
  app.use(express.static(__dirname + "/../front/dist/"));
}

// set up our express application
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Mount API routes
app.use("/api", routes);

// mysql connection
let mysqlConnection = mysql.createConnection({
  host: mysql_host,
  user: mysql_user,
  password: mysql_password,
  database: mysql_database
});

global.mysqlConnection = mysqlConnection;

mysqlConnection.connect(function (err){
  if (err){
     console.log("Error connecting mysql.");
     process.exit(1);
  }else{
    console.log("Mysql connection ok.");
  }
});

// node server running =========================================================
app.listen(8080, function(){
  console.log("Running server!");
});

// node server closing

//do something when app is closing,
process.on('exit', function(){mysqlConnection.end(); process.exit(0);});

//catches ctrl+c event
process.on('SIGINT', function(){mysqlConnection.end(); process.exit(0);});

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', function(){mysqlConnection.end(); process.exit(0);});
process.on('SIGUSR2', function(){mysqlConnection.end(); process.exit(0);});

export default app;
