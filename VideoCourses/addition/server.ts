import * as jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router('./db/main.json');
server.use(jsonServer.defaults());

server.use(router);
server.listen(4000, () => {
  console.log('Run Server');
});
