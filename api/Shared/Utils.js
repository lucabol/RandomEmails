const htmlResponse = htmlString => { 
  return {
    status: 200,
    body: htmlString,
    headers: {
            "Content-Type": "text/html"
    }
  };
}

const getUser = req => {
  const instanceid = process.env["WEBSITE_INSTANCE_ID"]
  const isLocal = typeof instanceid == 'undefined'
  if(isLocal) return { userDetails:'lucabol@microsoft.com'}
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


module.exports.htmlResponse = htmlResponse
module.exports.getUser = getUser