/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuid } from 'uuid';
import WebSocket, { WebSocketServer } from 'ws';

const WS_PORT = 8080;
const wss = new WebSocketServer({ port: WS_PORT });

const users: WebSocket.WebSocket[] = [];
const usersOnline = { online: 0 };

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  users.push(ws);
  usersOnline.online += 1;

  wss.clients.forEach((client) => client.send(JSON.stringify(usersOnline)));

  ws.on('message', function message(data, isBinary) {
    const msgID = uuid();
    const timestamp = Date.now();

    const parsedData = JSON.parse(data.toString());
    console.log(parsedData);
    const storageData = { ...parsedData, msgID, timestamp };

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(storageData), {
          binary: isBinary,
        });
      }
    });
  });

  ws.on('close', function () {
    users.splice(users.indexOf(ws));
    usersOnline.online -= 1;
    users.forEach((user) => user.send(JSON.stringify(usersOnline)));
  });
});
