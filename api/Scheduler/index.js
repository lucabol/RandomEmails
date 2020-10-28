const U = require('../Shared/Utils.js')
const html = require('nanohtml')
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const msg = (email, emailText) => { return {
  to: email,
  from: 'randommaster@em7473.lucabol.com', // Use the email address or domain you verified above
  subject: emailText,
  text: ''
}}

const sendEmail = async (email, emailText) => await sgMail.send(msg(email, emailText))

const randomSelect= (cadence, tasks) => {
  const cadenceMap = {
    'often': 7,
    'seldom': 30,
    'rarely': 365
  }
  const cad = cadenceMap[cadence]
  const len = tasks.length

  // Probability of picking one task. Bizarrely, it can be more than zero,
  // in which case a task is certainly chosen. After intense deliberation with myself,
  // I think that is what I want. If you set more tasks than days in cadence, then
  // you get a random task every day.
  const prob = len / cad
  const coin = Math.random()
  if(coin > prob)
    return null
  else
    return tasks[Math.floor(Math.random() * len)]
}
const processGroup = async (user, name, group) => {
  // reverse to start choosing from rarer tasks
  Object.keys(group).reverse().forEach(async cadence => {
    const tasks = group[cadence]
    for(var i = 0; i < tasks.length; i++) {
      const emailText = randomSelect(cadence, tasks)
      if(emailText) {
        await sendEmail(user.email, `${name}: emailText`)
        return
      }
    }
  })
} 

const processUser = async user => {
  const groups = user.groups
  Object.keys(groups).forEach(async name => await processGroup(user, name, groups[name]))
}

module.exports = async function (context, req) {
    const users = await U.loadAllUsers()
    users.each(async (err, user) => await processUser(user))
    return U.hr(html``)
}
