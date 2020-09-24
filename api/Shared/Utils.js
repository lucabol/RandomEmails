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
  const header = req.headers["x-ms-client-principal"];
  if(!header) return {myError: 'no header'}
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