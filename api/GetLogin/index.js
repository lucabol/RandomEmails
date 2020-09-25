const U = require('../Shared/Utils.js')
const html = require('nanohtml')

module.exports = async function (context, req) {
    const user = U.getUser(req)
    context.log(`USER RETRIEVED:${JSON.stringify(user)}`)

    if(user)
        return U.hr(html`<a class="button is-primary" href="/.auth/logout"><strong>Logout</strong></a>`)
    else
        return U.hr(html`<a class="button is-primary" href="/.auth/login/aad"><strong>Login</strong></a>`)
}
