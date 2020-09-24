const utils = require("../Shared/Utils.js")

module.exports = async function (context, req) {
    const user = utils.getUser(req)
    context.log(user)

    if(user)
        return utils.htmlResponse('<a class="button is-primary" href="/.auth/logout"><strong>Logout</strong></a>' + user.userDetails)
    else
        return utils.htmlResponse('<a class="button is-primary" href="/.auth/login/aad"><strong>Login</strong></a>')
}
