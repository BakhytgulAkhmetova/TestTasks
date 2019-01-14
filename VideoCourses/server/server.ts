import * as jsonServer from 'json-server';
const bodyParser = require('body-parser');

const server = jsonServer.create();
const router = jsonServer.router('./db/main.json');
server.use(jsonServer.defaults());
 
var urlencodedParser = bodyParser.urlencoded({ extended: false });
server.use(urlencodedParser);
require('./customRoutes/user')(server);
require('./customRoutes/course')(server);
server.use(router);
server.listen(4000, () => {
  console.log('Run Server');
});
