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
  const encoded = Buffer.from(header, "base64");
  const decoded = encoded.toString("ascii");
  return JSON.parse(decoded)    
}

module.exports.htmlResponse = htmlResponse
module.exports.getUser = getUser