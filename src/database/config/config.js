const urlDB = `mysql://root:GkIrQXRmUacMkEPdBZI3@containers-us-west-108.railway.app:7662/railway`;

module.exports = {
  "development": {
    "username": "root",
    "password": null,
    "database": "one_step",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "port": "3307",
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "port": "7662",
    "password": "GkIrQXRmUacMkEPdBZI3",
    "database": "railway",
    "host": "containers-us-west-108.railway.app",
    "dialect": "mysql",
    "url": "mysql://root:GkIrQXRmUacMkEPdBZI3@containers-us-west-108.railway.app:7662/railway"
  }
}
