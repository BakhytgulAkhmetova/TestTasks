import * as jsonServer from 'json-server';
import * as bodyParser from 'body-parser';

import { loginHandler } from './routeHandlers';

const server = jsonServer.create();
const router = jsonServer.router('./db.json');

 
var urlencodedParser = bodyParser.urlencoded({ extended: false });
server.use(jsonServer.defaults());
server.use(urlencodedParser);
server.post('/auth/login', loginHandler );
server.use(router);
server.listen(4000, () => {
  console.log('Run Server');
});
