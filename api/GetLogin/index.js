const utils = require("../Shared/Utils.js")

module.exports = async function (context, req) {
  return utils.htmlResponse('<a class="button is-primary" href="/.auth/login/github">Login</a>')
};
