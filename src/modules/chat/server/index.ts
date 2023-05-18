/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuid } from 'uuid';
import WebSocket, { WebSocketServer } from 'ws';

const WS_PORT = 8080;
const wss = new WebSocketServer({ port: WS_PORT });

const users: WebSocket.WebSocket[] = [];

wss.on('connection', function connection(ws) {
  users.push(ws);
  let username: string;

  ws.on('message', function message(data) {
    const msgID = uuid();
    const timestamp = Date.now();

    const parsedData = JSON.parse(data.toString());

    switch (parsedData.event) {
      case 'text': {
        const storageData = {
          ...parsedData,
          author: username,
          msgID,
          timestamp,
          online: wss.listenerCount('message'),
        };

        broadcastMessage(storageData);
        break;
      }

      case 'connection': {
        username = parsedData.username;

        const storageData = {
          ...parsedData,
          online: wss.listenerCount('message'),
        };

        broadcastMessage(storageData);
        break;
      }

      case 'leave': {
        const storageData = {
          ...parsedData,
          online: wss.listenerCount('message'),
        };

        broadcastMessage(storageData);
        ws.close();
        break;
      }

      default:
        break;
    }
  });

  ws.on('close', function closeConnection() {
    ws.close();
    users.splice(users.indexOf(ws), 1);
  });
});

function broadcastMessage(parsedMessage: any) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(parsedMessage));
    }
  });
}
