module.exports = async function (context, req) {
  return {
    // status: 200, /* Defaults to 200 */
    body: "<h1>Hello from the API.</h1>",
    headers: {
            "Content-Type": "text/html"
    }
  };
};
