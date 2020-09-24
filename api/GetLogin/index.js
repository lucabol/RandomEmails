const utils = require("../Shared/Utils.js")

module.exports = async function (context, req) {
  const user = await utils.getUser(req)
  context.log(user)
  return (user ?
    utils.htmlResponse('<a class="button is-primary" href="/.auth/login/aad">Login</a>') :
    utils.htmlResponse('<a class="button is-primary" href="/.auth/logout">Logout</a>'))
};
