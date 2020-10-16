const html = require("nanohtml")
const { MongoClient } = require("mongodb")
const { uuid } = require("uuidv4")

const cosmoUrl = process.env.COSMO_URL
const database = "RandomEmails"
const collection = "Users"
let client = null

async function fetchCollection() {
  if(!client) client = await MongoClient.connect(cosmoUrl, { useNewUrlParser: true });

  const db = client.db(database);
  return db.collection(collection);
}

// Caching client connection
// TODO: manage errors
const withCollection = funcOnCollection => {
  if(client) {
    context.res = funcOnCollection(client.db(database).collection(collection), context)
  } else {
    mongoClient.connect(cosmoUrl, (err, cl) => {
      client = cl
      context.res = funcOnCollection(client.db(database).collection(collection), context)  
    })
  }
}

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

const drawEmail = ({id, text, group}, classText) => html`
  <a class="panel-block ${classText}"
  ${!id ? html`hx-get="api/emailForm" hx-vars="period:'${text}',group:'${group}'" hx-target="this" hx-swap="afterend swap:0.5s"` : html``}
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

const defaultDoc = user => JSON.parse(`
{
	"_id" : "${uuid()}",
	"email" : "${user.userDetails}",
	"groups" : {
		"Group1" : {
			"weekly" : [
				{
					"id" : "1dfb2d51-0a93-45cf-aad3-0955152eb6a1",
					"text" : "Eat broccoli and potatoes"
				}
			],
			"monthly" : [
			]
		},
		"Group2" : {
			"weekly" : [
			],
			"monthly" : [ ]
		}
	}
}
`)
async function loadUserData(user) {
  const c = await fetchCollection()
  const u = await c.findOne({email: user.userDetails})
  return u ? u : defaultDoc(user)
}

async function postTask(user, id, group, period, task) {
  const c = await fetchCollection()
  const path = ["groups", group, period.toLowerCase()].join('.')
  const updateInstruction = {}
  updateInstruction[path] = {
      "$each":[{ "id": id, "text": task }],
      "$position": 0
  }
  const updateObj = { "$push": updateInstruction }

  const r = await c.updateOne(
    {email: user.userDetails},
    updateObj        
  )
}

module.exports.hr = hr
module.exports.getUser = getUser
module.exports.loadUserData = loadUserData
module.exports.drawEmail = drawEmail
module.exports.postTask = postTask