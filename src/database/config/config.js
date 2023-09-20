const PORT = process.env.PORT || 3000;

let MYSQLUSER = "root";
let MYSQLPORT = "7662";
let MYSQLPASSWORD = "GkIrQXRmUacMkEPdBZI3";
let MYSQLHOST = "containers-us-west-108.railway.app"
let MYSQLDATABASE = "railway";
let MYSQLURL = "mysql://root:GkIrQXRmUacMkEPdBZI3@containers-us-west-108.railway.app:7662/railway";

const CONFIG = {
  "development": {
    "username": MYSQLUSER,
    "password": MYSQLPASSWORD || null,
    "database": MYSQLDATABASE || "one_step",
    "host": MYSQLHOST || "127.0.0.1",
    "dialect": "mysql",
    "port": MYSQLPORT || "3307",
    "url": MYSQLURL
  },
  "test": {
    "username": MYSQLUSER,
    "password": MYSQLPASSWORD || null,
    "database": MYSQLDATABASE || "one_step",
    "host": MYSQLHOST || "127.0.0.1",
    "dialect": "mysql",
    "url": MYSQLURL
  },
  "production": {
    "username": MYSQLUSER,
    "port": MYSQLPORT,
    "password": MYSQLPASSWORD,
    "database": MYSQLDATABASE,
    "host": MYSQLHOST,
    "dialect": "mysql",
    "url": "mysql://root:GkIrQXRmUacMkEPdBZI3@containers-us-west-108.railway.app:7662/railway"
  }
}

module.exports = CONFIG, PORT;