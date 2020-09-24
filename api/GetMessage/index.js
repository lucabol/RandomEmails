const utils = require("../Shared/Utils.js")

module.exports = async function (context, req) {
  return utils.htmlResponse("<h2>From Func.</h2>")
};
