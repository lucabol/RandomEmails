const U = require("../Shared/Utils.js")
const html = require("nanohtml")

const drawIntroPage = () =>
    U.hr(html`
      <div class="section">
      <div class="container">
        <article class="level">
          <div class="level-item">
            <figure class="image">
              <img src="/img/roll-the-dice-phone.jpg" alt="Image">
            </figure>
          </div>
          <div class="level-item">
            <p class="has-text-centerd is-size-5">
            <strong>Do things randomly !</strong>
            </p>
          </div>
        </article>
        </div>
      </div>
    `)

const pB = ({id, text}, classText) => html`
  <a class="panel-block ${classText}"
  ${!id ? html`hx-post="api/email"` : html``}
  >
    ${!id ? html`
      ${text}
      <span class="panel-icon ml-2">
        <i class="fas fa-plus-circle" aria-hidden="true"></i>
      </span>
    ` : html`
      <span class="panel-icon ml-2" hx-delete="api/email/${id}" hx-swap="outerHTML swap:0.5s" hx-target="closest a">
        <i class="fas fa-minus-circle" aria-hidden="true"></i>
      </span>
      ${text}
    `}
  </a>
`
const getGroupEmails = (userData, tabIndex) => {
  const groupName = Object.keys(userData.groups)[tabIndex]
  const group = userData.groups[groupName]
  const weekly = group.weekly
  const monthly = group.monthly
  return html`
    ${pB({id:"", text:"Weekly"}, "has-text-danger is-uppercase has-text-weight-bold")}
    ${weekly.map((key, index) => pB(key))}
    ${pB({id:"", text:"Monthly"}, text="has-text-danger is-uppercase has-text-weight-bold")}
    ${monthly.map((key, index) => pB(key))}
    `
}

const drawUserTasks = (user, tabIndex) => {
    const userData = U.loadUserData(user)
    // TODO: load from db
    const h = html`
      <nav id="mainPanel" class="panel is-info">
        <p class="panel-heading has-text-centered">Random Emails for ${user.userDetails}</p>
          <p class="panel-tabs">
          ${
            Object.keys(userData.groups).map((key, index) =>
              html`<a hx-get="api/group/${index}" hx-target="#mainPanel" hx-swap="outerHTML" class="has-text-weight-semibold ${index == tabIndex ? "is-active" : ""}">${key}</a>`)
          }

      <a>
      <span>
        <i class="fas fa-edit aria-hidden="true"></i>
      </span>
      </a>
          </p>
          ${getGroupEmails(userData, tabIndex)}
      </nav>
    `
    return U.hr(h)
}

module.exports = async function (context, req) {
  const user = U.getUser(req)
  const param = context.bindingData.index
  const index = Number.isInteger(param) ? param : parseInt(param.string)

  context.log(`GETLOGIN:${JSON.stringify(user)} with index:${index}`)

  if(user)
    return drawUserTasks(user, index)
  else
    return drawIntroPage()
};
