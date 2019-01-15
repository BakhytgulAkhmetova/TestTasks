import * as jsonServer from 'json-server';

import { loginHandler } from './routeHandlers';

const server = jsonServer.create();
const router = jsonServer.router('./db.json');

server.use(jsonServer.defaults());
server.use(jsonServer.bodyParser);
server.post('/auth/login', loginHandler );
server.use(router);
server.listen(4000, () => {
  console.log('Run Server');
});
