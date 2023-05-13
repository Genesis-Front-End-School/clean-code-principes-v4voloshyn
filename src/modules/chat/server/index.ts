/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from 'uuid';
import WebSocket, { WebSocketServer } from 'ws';

const WS_PORT = 8080;
const wss = new WebSocketServer({ port: WS_PORT });

const users: WebSocket.WebSocket[] = [];

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  const userId = uuidv4();

  users.push(ws);

  ws.on('message', function message(data, isBinary) {
    console.log('received: %s', data);

    // const parsedData = JSON.parse(data.toString());
    // const id = uuidv4();

    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
  ws.on('close', function () {});
});
