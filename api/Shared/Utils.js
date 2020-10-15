const html = require("nanohtml")

const hr = htmlEl => { 
  return {
    status: 200,
    body: htmlEl.toString(),
    headers: {
            "Content-Type": "text/html"
    }
  };
}

const getUser = req => {
  const instanceid = process.env.WEBSITE_SITE_NAME
  const isLocal = typeof instanceid == 'undefined'
  if(isLocal) return { userDetails:'lucabollocal@microsoft.com'}
  //if(isLocal) return null
  const header = req.headers["x-ms-client-principal"];
  if(!header) return null // Empirically, absence of this header means not logged in
  const encoded = Buffer.from(header, "base64");
  const decoded = encoded.toString("ascii");
  return JSON.parse(decoded)    
}

async function getUser1() {
     const response = await fetch("/.auth/me");
     const payload = await response.json();
     const { clientPrincipal } = payload;
     return clientPrincipal
}

const drawEmail = ({id, text}, classText) => html`
  <a class="panel-block ${classText}"
  ${!id ? html`hx-get="api/emailForm" hx-target="this" hx-swap="afterend swap:0.5s"` : html``}
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
const loadUserData = user =>
  ({
    "id": "4cfcf612-0807-4d63-a054-a46638c78925",
    "email": "lucabolloc@gmail.com",
    "groups": {
      "Eat": {
        "weekly": [{id:"1dfb2d51-0a93-45cf-aad3-0955152eb6a1", text:"Eat broccoli and potatoes"}, {id:"3dfb2d51-0a93-45cf-aad3-0955152eb6a2", text:"Eat Carrots"}],
        "monthly": [{id:"2dfb2d51-0a93-45cf-aad3-0955152eb6a3", text:"Eat dessert"}, {id:"3dfb2d51-0a93-45cf-aad3-0955152eb6a4", text:"Eat Nothing"}]
      },
      "Read": {
        "weekly": [{id:"3dfb2d51-0a93-45cf-aad3-0955152eb6a5", text:"Read Economist"}, {id:"3dfb2d51-0a93-45cf-aad3-0955152eb6a6", text:"Read Gazzette"}, {id:"3dfb2d51-0a93-45cf-aad3-0955152eb6a7", text:"Read me"}],
        "monthly": []
      },
    }
 })

module.exports.hr = hr
module.exports.getUser = getUser
module.exports.loadUserData = loadUserData
module.exports.drawEmail = drawEmail