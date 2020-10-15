const U = require("../Shared/Utils.js")
const html = require("nanohtml")
const {uuid} = require('uuidv4')

function isString(x) {
  return Object.prototype.toString.call(x) === "[object String]"
}

// function uuidv4() {
//   return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
//     (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
//   );
// }

module.exports = async function (context, req) {
  const user = U.getUser(req)
  const task = context.bindingData.task
  const id = uuid()
  context.log(`POSTEMAIL: id=${id}, task=${task}`)

  // TODO: Add to db

  if(user)
    return U.hr(U.drawEmail({id: id, text: task}))
  else
    throw "Unable to retrieve user"
};
