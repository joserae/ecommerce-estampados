

const fs = require('fs');

function recordarmeUser(req, res, next) {
  const rememberUser = req.body["recordarme"] == 'on';
  if (rememberUser && req.session.userToLogin == undefined);
  const userDataJson = fs.readFileSync("src/database/userData.json", { encoding: "utf-8" });
  if (userDataJson) {
    let users = JSON.parse(userDataJson);
    let sessionUser = users.find(user => user.email == req.body.email);

    if (sessionUser) {
      req.session.userToLogin = sessionUser;
    }
  }

  next();
}



module.exports = recordarmeUser;