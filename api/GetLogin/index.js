const utils = require("../Shared/Utils.js")

module.exports = async function (context, req) {
    const user =  utils.getUser(req)
    context.log(user)
    if(user && user != {})
        //return utils.htmlResponse('<a class="button is-primary" href="/.auth/login/aad">Login</a>')
        return utils.htmlResponse('<p>Got user:' + JSON.stringify(user) + '</p>')
    else
        return utils.htmlResponse('<p>Not logged in</p>')
}
