import { dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  InitializeParams,
  InitializeRequest,
  Message,
} from 'vscode-languageserver';
import {
  IWebSocket,
  WebSocketMessageReader,
  WebSocketMessageWriter,
} from 'vscode-ws-jsonrpc';
import {
  createConnection,
  createServerProcess,
  forward,
} from 'vscode-ws-jsonrpc/server';

const filename = fileURLToPath(import.meta.url);
const directoryName = dirname(filename);

export function launch(socket: IWebSocket) {
    const reader = new WebSocketMessageReader(socket);
    const writer = new WebSocketMessageWriter(socket);
    // start the language server as an external process
    const socketConnection = createConnection(reader, writer, () => socket.dispose());
    const serverConnection = createServerProcess('powershell', 'pwsh', [directoryName + '/PowerShellEditorServices/Start-EditorServices.ps1', '-HostName', 'monaco', '-HostProfileId', '0', '-HostVersion', '1.0.0', '-LogPath', directoryName + '/logs/pses.log.txt', '-LogLevel', 'Diagnostic', '-BundledModulesPath', directoryName + '/PowerShellEditorServices', '-Stdio', '-SessionDetailsPath', directoryName + '/.pses_session', '-FeatureFlags', '@()']);
    forward(socketConnection, serverConnection, message => {
        if (Message.isRequest(message)) {
            if (message.method === InitializeRequest.type.method) {
                const initializeParams = message.params as InitializeParams;
                initializeParams.processId = process.pid;
            }
        }
        return message;
    });
}
