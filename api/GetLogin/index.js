const utils = require("../Shared/Utils.js")

module.exports = async function (context, req) {
    const user =  utils.getUser(req)
    context.log(user)

    if(user)
        return utils.htmlResponse('<a class="button is-primary" href="/.auth/logout">Logout</a>')
    else
        return utils.htmlResponse('<a class="button is-primary" href="/.auth/login/aad">Login</a>')
}
