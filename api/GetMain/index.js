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

const enrich = (task, period, group) => {
  task.period = period
  task.group = group
  return task
}

const getGroupEmails = (userData, tabIndex) => {
  const groupName = Object.keys(userData.groups)[tabIndex]
  const group = userData.groups[groupName]
  var h = html``

  Object.keys(group).forEach((key,index) => {
    h = html`
      ${h}
      ${U.drawEmail({id:"", text:key, group: groupName, period: key}, "has-text-danger is-uppercase has-text-weight-bold")}
      `
    const emails = group[key].map(t => enrich(t, key, groupName))
    emails.forEach(e => {
      h = html`
        ${h}
        ${U.drawEmail(e)}
      `
    }
  )});
  return h
}

async function drawUserTasks(user, tabIndex) {
  const userData = await U.loadUserData(user)
  const h = html`
      <nav id="mainPanel" class="panel is-info">
        <p class="panel-heading has-text-centered">Random Emails for ${user.userDetails}</p>
          <p class="panel-tabs">
          ${Object.keys(userData.groups).map((key, index) => html`<a hx-get="api/group/${index}" hx-target="#mainPanel" hx-swap="outerHTML" class="has-text-weight-semibold ${index == tabIndex ? "is-active" : ""}">${key}</a>`)}
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

  context.log(`GETMAIN:${JSON.stringify(user)} with index:${index}`)

  if(user)
    return await drawUserTasks(user, index)
  else
    return drawIntroPage()
};
