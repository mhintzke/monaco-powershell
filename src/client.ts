import '@codingame/monaco-vscode-theme-defaults-default-extension';
import '@codingame/monaco-vscode-powershell-default-extension';

import * as monaco from 'monaco-editor';
import { MonacoLanguageClient } from 'monaco-languageclient';
import { initServices } from 'monaco-languageclient/vscode/services';
import {
  BaseLanguageClient,
  CloseAction,
  ErrorAction,
  MessageTransports,
} from 'vscode-languageclient/lib/common/client.js';
import {
  toSocket,
  WebSocketMessageReader,
  WebSocketMessageWriter,
} from 'vscode-ws-jsonrpc';
import { ColorScheme } from 'vscode/vscode/vs/platform/theme/common/theme';

import getTextmateServiceOverride
  from '@codingame/monaco-vscode-textmate-service-override';
import getThemeServiceOverride
  from '@codingame/monaco-vscode-theme-service-override';

await initServices({
  serviceConfig: {
    userServices: {
      ...getThemeServiceOverride(),
      ...getTextmateServiceOverride(),
    },
    debugLogging: true,
    workspaceConfig: {
      initialColorTheme: {
        themeType: ColorScheme.LIGHT,
      },
    },
  },
});

// register Monaco languages
monaco.languages.register({
  id: "powershell",
  extensions: [".ps1", ".psd1", ".psm1"],
  aliases: ["pwsh", "PowerShell"],
  mimetypes: ["text/plain"],
});

// create Monaco editor
const value = `function Verb-Noun {

}`;
const editor = monaco.editor.create(document.getElementById("container")!, {
  model: monaco.editor.createModel(
    value,
    "powershell",
    monaco.Uri.parse("inmemory://model.ps1")
  ),
  glyphMargin: true,
  lightbulb: {},
  fixedOverflowWidgets: true,
  automaticLayout: true,
  scrollBeyondLastLine: false,
});

window.onresize = () => {
  editor.layout({ width: window.innerWidth, height: window.innerHeight });
};

// create the web socket
const url = createUrl("/sampleServer");

const ws = createWebSocket(url);

ws.onopen = async () => {
  const socket = toSocket(ws);

  const reader = new WebSocketMessageReader(socket);
  const writer = new WebSocketMessageWriter(socket);

  const languageClient = createLanguageClient({ reader, writer });
  await languageClient.start();
  reader.onClose(() => languageClient.stop());
};

function createLanguageClient(
  connection: MessageTransports
): BaseLanguageClient {
  return new MonacoLanguageClient({
    name: "Monaco PowerShell",
    clientOptions: {
      // use a language id as a document selector
      documentSelector: ["powershell"],
      // disable the default error handler
      errorHandler: {
        error: (_err, message, _count) => {
          return { action: ErrorAction.Continue };
        },
        closed: () => ({ action: CloseAction.Restart }),
      },
    },
    // create a language client connection from the JSON RPC connection on demand
    connectionProvider: {
      get: () => {
        return Promise.resolve(connection);
      },
    },
  });
}

function createUrl(path: string): string {
  return 'ws://localhost:4000' + path;
}

function createWebSocket(url: string): WebSocket {
  return new WebSocket(url);
}
