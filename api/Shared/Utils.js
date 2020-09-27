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