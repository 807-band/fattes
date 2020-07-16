const fs = require("fs");
const http = require("http");
const https = require("https");

require('dotenv').config();

if (process.env.ENVIRONMENT === "prod") {
   const privateKey = fs.readFileSync('/etc/letsencrypt/live/807.band/privkey.pem', 'utf8');
   const certificate = fs.readFileSync('/etc/letsencrypt/live/807.band/cert.pem', 'utf8');
   const ca = fs.readFileSync('/etc/letsencrypt/live/807.band/chain.pem', 'utf8');

   const credentials = {
      key: privateKey,
      cert: certificate,
      ca: ca
   };
}

const openPorts = (app) => {
   const httpServer = http.createServer(app);

   httpServer.listen(80, () => {
      console.log("Server listening on port 80");
   }

   if (process.env.ENVIRONMENT === "prod") {
      const httpsServer = https.createServer(credentials, app);

      httpsServer.listen(433, () => {
         console.log("Server listening on port 443");
      }
   }

};

module.exports = openPorts;
