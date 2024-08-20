# Monaco PowerShell Editor vNext

## Running PSES locally

> I am developing on Windows, so this shows the issue in Windows. To run the server in unix, use Dockerfile setup below.

1. Change `package.json` `"prepare"` statement to `npm run clean && npm run build:win` if building with Windows instead instead of unix.
2. Run `./build.ps1`
3. To run locally, run `npm start` to start the server on port 4000
4. Open another terminal and run `npm run serve` to start the client on port 5555

![alt text](image.png)

## Running PSES in Docker (unix)

1. I'm running Windows locally, so to show this also happens test this in unix systems, I've created a Dockerfile to build the project in a unix environment.
2. Run `docker build -t pses .` to build the image
3. Run `docker run -it -p 4000:4000 pses` to start the server

## Error

In both cases I get errors when performing `textDocument/codeAction` and `codeLens/resolve` commands.:

![alt text](image-1.png)

```csharp
Uncaught Error: Internal Error - System.ArgumentException: The value cannot be an empty string. (Parameter 'path')
   at System.ArgumentException.ThrowNullOrEmptyException(String argument, String paramName)
   at System.IO.Strategies.FileStreamHelpers.ValidateArguments(String path, FileMode mode, FileAccess access, FileShare share, Int32 bufferSize, FileOptions options, Int64 preallocationSize)
   at System.IO.FileStream..ctor(String path, FileMode mode, FileAccess access)
   at Microsoft.PowerShell.EditorServices.Services.WorkspaceService.OpenStreamReader(DocumentUri uri) in C:\__w\1\s\src\PowerShellEditorServices\Services\Workspace\WorkspaceService.cs:line 398
   at Microsoft.PowerShell.EditorServices.Services.WorkspaceService.GetFile(DocumentUri documentUri) in C:\__w\1\s\src\PowerShellEditorServices\Services\Workspace\WorkspaceService.cs:line 144
   at Microsoft.PowerShell.EditorServices.Services.WorkspaceService.TryGetFile(DocumentUri documentUri, ScriptFile& scriptFile) in C:\__w\1\s\src\PowerShellEditorServices\Services\Workspace\WorkspaceService.cs:line 211
   at Microsoft.PowerShell.EditorServices.Services.AnalysisService.GetMostRecentCodeActionsForFileAsync(DocumentUri uri) in C:\__w\1\s\src\PowerShellEditorServices\Services\Analysis\AnalysisService.cs:line 218
   at Microsoft.PowerShell.EditorServices.Handlers.PsesCodeActionHandler.Handle(CodeActionParams request, CancellationToken cancellationToken) in C:\__w\1\s\src\PowerShellEditorServices\Services\TextDocument\Handlers\CodeActionHandler.cs:line 49
   at OmniSharp.Extensions.LanguageServer.Server.Pipelines.SemanticTokensDeltaPipeline`2.Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate`1 next)
   at OmniSharp.Extensions.LanguageServer.Server.Pipelines.ResolveCommandPipeline`2.Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate`1 next)
   at MediatR.Pipeline.RequestPreProcessorBehavior`2.Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate`1 next)
   at MediatR.Pipeline.RequestPostProcessorBehavior`2.Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate`1 next)
   at MediatR.Pipeline.RequestExceptionProcessorBehavior`2.Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate`1 next)
   at MediatR.Pipeline.RequestExceptionProcessorBehavior`2.Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate`1 next)
   at MediatR.Pipeline.RequestExceptionActionProcessorBehavior`2.Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate`1 next)
   at MediatR.Pipeline.RequestExceptionActionProcessorBehavior`2.Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate`1 next)
   at OmniSharp.Extensions.JsonRpc.RequestRouterBase`1.<RouteRequest>g__InnerRoute|7_0(IServiceScopeFactory serviceScopeFactory, Request request, TDescriptor descriptor, Object params, CancellationToken token, ILogger logger)
   at OmniSharp.Extensions.JsonRpc.RequestRouterBase`1.RouteRequest(IRequestDescriptor`1 descriptors, Request request, CancellationToken token)
   at OmniSharp.Extensions.JsonRpc.DefaultRequestInvoker.<>c__DisplayClass10_0.<<RouteRequest>b__5>d.MoveNext()

Error: Internal Error - System.ArgumentException: The value cannot be an empty string. (Parameter 'path')
   at System.ArgumentException.ThrowNullOrEmptyException(String argument, String paramName)
   at System.IO.Strategies.FileStreamHelpers.ValidateArguments(String path, FileMode mode, FileAccess access, FileShare share, Int32 bufferSize, FileOptions options, Int64 preallocationSize)
   at System.IO.FileStream..ctor(String path, FileMode mode, FileAccess access)
   at Microsoft.PowerShell.EditorServices.Services.WorkspaceService.OpenStreamReader(DocumentUri uri) in C:\__w\1\s\src\PowerShellEditorServices\Services\Workspace\WorkspaceService.cs:line 398
   at Microsoft.PowerShell.EditorServices.Services.WorkspaceService.GetFile(DocumentUri documentUri) in C:\__w\1\s\src\PowerShellEditorServices\Services\Workspace\WorkspaceService.cs:line 144
   at Microsoft.PowerShell.EditorServices.Services.WorkspaceService.TryGetFile(DocumentUri documentUri, ScriptFile& scriptFile) in C:\__w\1\s\src\PowerShellEditorServices\Services\Workspace\WorkspaceService.cs:line 211
   at Microsoft.PowerShell.EditorServices.Services.AnalysisService.GetMostRecentCodeActionsForFileAsync(DocumentUri uri) in C:\__w\1\s\src\PowerShellEditorServices\Services\Analysis\AnalysisService.cs:line 218
   at Microsoft.PowerShell.EditorServices.Handlers.PsesCodeActionHandler.Handle(CodeActionParams request, CancellationToken cancellationToken) in C:\__w\1\s\src\PowerShellEditorServices\Services\TextDocument\Handlers\CodeActionHandler.cs:line 49
   at OmniSharp.Extensions.LanguageServer.Server.Pipelines.SemanticTokensDeltaPipeline`2.Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate`1 next)
   at OmniSharp.Extensions.LanguageServer.Server.Pipelines.ResolveCommandPipeline`2.Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate`1 next)
   at MediatR.Pipeline.RequestPreProcessorBehavior`2.Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate`1 next)
   at MediatR.Pipeline.RequestPostProcessorBehavior`2.Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate`1 next)
   at MediatR.Pipeline.RequestExceptionProcessorBehavior`2.Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate`1 next)
   at MediatR.Pipeline.RequestExceptionProcessorBehavior`2.Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate`1 next)
   at MediatR.Pipeline.RequestExceptionActionProcessorBehavior`2.Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate`1 next)
   at MediatR.Pipeline.RequestExceptionActionProcessorBehavior`2.Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate`1 next)
   at OmniSharp.Extensions.JsonRpc.RequestRouterBase`1.<RouteRequest>g__InnerRoute|7_0(IServiceScopeFactory serviceScopeFactory, Request request, TDescriptor descriptor, Object params, CancellationToken token, ILogger logger)
   at OmniSharp.Extensions.JsonRpc.RequestRouterBase`1.RouteRequest(IRequestDescriptor`1 descriptors, Request request, CancellationToken token)
   at OmniSharp.Extensions.JsonRpc.DefaultRequestInvoker.<>c__DisplayClass10_0.<<RouteRequest>b__5>d.MoveNext()
    at handleResponse (http://localhost:5555/main.bundle.js:1331:48)
    at handleMessage (http://localhost:5555/main.bundle.js:1111:13)
    at processMessageQueue (http://localhost:5555/main.bundle.js:1128:17)
    at http://localhost:5555/main.bundle.js:1100:13
    at http://localhost:5555/main.bundle.js:108245:29
```
