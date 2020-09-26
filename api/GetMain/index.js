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

const pB = (text, classText, isPlus) => html`
  <a class="panel-block ${classText}">
    <span class="panel-icon">
      <i class="fas ${isPlus ? "fa-plus-circle" : "fa-minus-circle"} fa-lg aria-hidden="true"></i>
    </span>
    ${isPlus ? html`` : html`
      <span class="panel-icon">
        <i class="fas fa-edit fa-lg aria-hidden="true"></i>
      </span>
    `}
    ${text}
  </a>
`
const getGroupEmails = (userData, tabIndex) => {
  const groupName = Object.keys(userData.groups)[tabIndex]
  const group = userData.groups[groupName]
  const weekly = group.weekly
  const monthly = group.monthly
  return html`
    ${pB("Weekly", "has-text-danger is-uppercase has-text-weight-bold", true)}
    ${weekly.map((key, index) => pB(key))}
    ${pB("Monthly", "has-text-danger is-uppercase has-text-weight-bold", true)}
    ${monthly.map((key, index) => pB(key))}
    `
}

const drawUserTasks = (user, tabIndex) => {
    const userData = U.loadUserData(user)
    const h = html`
      <nav id="mainPanel" class="panel is-info">
        <p class="panel-heading has-text-centered">Random Emails for ${user.userDetails}</p>
          <p class="panel-tabs">
          ${
            Object.keys(userData.groups).map((key, index) =>
              html`<a hx-get="api/group/${index}" hx-target="#mainPanel" class="${index == tabIndex ? "is-active" : ""}">${key}</a>`)
          }
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
