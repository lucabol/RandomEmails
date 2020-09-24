const htmlResponse = htmlString => { 
  return {
    status: 200,
    body: htmlString,
    headers: {
            "Content-Type": "text/html"
    }
  };
}

const getUser1 = req => {
  const header = req.headers["x-ms-client-principal"];
  const encoded = Buffer.from(header, "base64");
  const decoded = encoded.toString("ascii");
  return JSON.parse(decoded)    
}

async function getUser() {
     const response = await fetch("/.auth/me");
     const payload = await response.json();
     const { clientPrincipal } = payload;
     return clientPrincipal
}

module.exports.htmlResponse = htmlResponse
module.exports.getUser = getUser