const U = require('../Shared/Utils.js')
const html = require('nanohtml')

module.exports = async function (context, req) {
    context.log(`GETEMAILFORM`)

    // TODO: research optimization not to call the server on Cancel button press
    return U.hr(html`
        <form hx-post='api/email' hx-target="this" hx-swap="outerHTML">
            <div class="field is-horizontal">
                <div class="field-body ml-5">
                    <div class="field">
                        <div class="control">
                            <input type="text" name="task" value="" class="input is-primary is-small is-rounded is-focused">
                        </div>
                    </div>
                        <div class="control">
                            <button class="button is-link is-small is-rounded">Save</button>
                        </div>
                        <div class="control">
                            <button hx-get="api/nothing" hx-target="closest form" hx-swap="outerHTML swap:0.5s" class="button is-link is-light is-small is-rounded">Cancel</button>
                        </div>
                </div>
            </div>
        </form>
    `)
}
