import express from 'express';
import { IncomingMessage } from 'http';
import { Socket } from 'net';
import path from 'path';
import url, { fileURLToPath } from 'url';
import { IWebSocket } from 'vscode-ws-jsonrpc';
import { WebSocketServer } from 'ws';

/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2018 TypeFox GmbH (http://www.typefox.io). All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import { launch } from './pses-launcher.js';

var __dirname = path.dirname(fileURLToPath(import.meta.url));

process.on("uncaughtException", function (err: any) {
  console.error("Uncaught Exception: ", err.toString());
  if (err.stack) {
    console.error(err.stack);
  }
});

// create the express application
const app = express();
// server the static content, i.e. index.html
app.use(express.static(__dirname));
// start the server
const server = app.listen(4000);
// create the web socket
const wss = new WebSocketServer({
  noServer: true,
  perMessageDeflate: false,
});

server.on(
  "upgrade",
  (request: IncomingMessage, socket: Socket, head: Buffer) => {
    const pathname = request.url ? url.parse(request.url).pathname : undefined;
    if (pathname === "/sampleServer") {
      wss.handleUpgrade(request, socket, head, (webSocket) => {
        const socket: IWebSocket = {
          send: (content) =>
            webSocket.send(content, (error) => {
              if (error) {
                throw error;
              }
            }),
          onMessage: (cb) => webSocket.on("message", cb),
          onError: (cb) => webSocket.on("error", cb),
          onClose: (cb) => webSocket.on("close", cb),
          dispose: () => webSocket.close(),
        };
        // launch the server when the web socket is opened
        if (webSocket.readyState === webSocket.OPEN) {
          launch(socket);
        } else {
          webSocket.on("open", () => launch(socket));
        }
      });
    }
  }
);
