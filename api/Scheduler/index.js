const U = require('../Shared/Utils.js')
const html = require('nanohtml')
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const msg = {
  to: 'lucabolg@gmail.com',
  from: 'randommaster@em7473.lucabol.com', // Use the email address or domain you verified above
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}

module.exports = async function (context, req) {
    (async () => {
            await sgMail.send(msg);
    })();

    return U.hr(html``)
}
