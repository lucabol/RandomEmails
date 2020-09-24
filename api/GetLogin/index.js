const utils = require("../Shared/Utils.js")

module.exports = async function (context, req) {
    utils.htmlResponse('<a class="button is-primary" href="/.auth/login/aad?post_login_redirect_uri=%2Ftable">Login</a>')
}
