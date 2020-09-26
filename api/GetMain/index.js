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

const pB = (text, classText) => html`
  <p class="panel-block ${classText}">${text}</p>
`
const getGroupEmails = (userData, groupName) => {
  const weekly = userData.groups[groupName].weekly
  const monthly = userData.groups[groupName].monthly
  return html`
    ${pB("Weekly", "has-text-danger is-uppercase has-text-weight-bold")}
    ${weekly.map((key, index) => pB(key))}
    ${pB("Monthly", "has-text-danger is-uppercase has-text-weight-bold")}
    ${monthly.map((key, index) => pB(key))}
    `
}

const drawUserTasks = (user, tabIndex) => {
    const userData = U.loadUserData(user)
    const h = html`
      <nav class="panel is-info">
        <p class="panel-heading has-text-centered">Random Emails for ${userData.email}</p>
          <p class="panel-tabs">
          ${
            Object.keys(userData.groups).map((key, index) =>
              html`<a hx-get="group/${key}" class="${index == tabIndex ? "is-active" : ""}">${key}</a>`)
          }
          </p>
          ${getGroupEmails(userData,"Eat")}
      </nav>
    `
    return U.hr(h)
}

module.exports = async function (context, req) {
  const user = U.getUser(req)
  context.log(`GETLOGIN:${JSON.stringify(user)}`)

  if(user)
    return drawUserTasks(user, 0)
  else
    return drawIntroPage()
};
