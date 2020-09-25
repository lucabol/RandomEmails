const U = require('../Shared/Utils.js')
const html = require('nanohtml')

module.exports = async function (context, req) {
    const user = U.getUser(req)
    context.log(`USER RETRIEVED:${JSON.stringify(user)}`)

    if(user)
        return U.hr(html`
        <a class="button is-danger" href="/.auth/logout">
            <span class="icon is-small"><i class="fas fa-sign-out-alt"></i></span>
            <span><strong>Logout</strong></span>
        </a>`)
    else
        return U.hr(html`
        <a class="button is-danger" href="/.auth/login/aad">
            <span class="icon is-small"><i class="fab fa-microsoft" /></span>
            <strong>Login</strong>
        </a>`)
}
