const U = require("../Shared/Utils.js")
const html = require("nanohtml")

function isString(x) {
  return Object.prototype.toString.call(x) === "[object String]"
}

module.exports = async function (context, req) {
  const user = U.getUser(req)
  const param = context.bindingData.id
  const group = context.bindingData.group
  const period = context.bindingData.period
  const id = isString(param) ? param : param.string

  await U.deleteTask(user, id, group, period)

  if(user)
    return U.hr(html``)
  else
    throw "Unable to retrieve user"
};
