import * as jsonServer from 'json-server';

import { loginHandler } from './routeHandlers';

const server = jsonServer.create();
const router = jsonServer.router('./db.json');

server.use(jsonServer.defaults());
server.use(jsonServer.bodyParser);
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
server.post('/auth/login', loginHandler );
server.use(router);
server.listen(4000, () => {
  console.log('Run Server');
});
