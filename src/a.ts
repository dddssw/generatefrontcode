// import * as vscode from "vscode";
// import path from "node:path";

// export function activate(context: vscode.ExtensionContext) {
//   console.log(
//     'Congratulations, your extension "my-vscode-extendsion" is now active!'
//   );

//   let disposable = vscode.commands.registerCommand(
//     "my-vscode-extendsion.helloWorld",
//     () => {
//       vscode.window.showInformationMessage(
//         "Hello World from my-vscode-extendsion!"
//       );

//       const panel = vscode.window.createWebviewPanel(
//         "React",
//         "React App",
//         vscode.ViewColumn.One,
//         {
//           retainContextWhenHidden: true, // 保证 Webview 所在页面进入后台时不被释放
//           enableScripts: true, // 运行 JS 执行
//         }
//       );

//       const isProduction =
//         context.extensionMode === vscode.ExtensionMode.Production;
//       let srcUrl = "";
//       if (isProduction) {
//         const filePath = vscode.Uri.file(
//           path.join(context.extensionPath, "dist", "static/js/main.js")
//         );
//         srcUrl = panel.webview.asWebviewUri(filePath).toString();
//       } else {
//         srcUrl = "http://localhost:3000/static/js/main.js";
//       }
//       panel.webview.html = getWebviewContent(srcUrl);

//       const updateWebview = () => {
//         panel.webview.html = getWebviewContent(srcUrl);
//       };
//       updateWebview();
//       const interval = setInterval(updateWebview, 1000);

//       panel.onDidDispose(
//         () => {
//           clearInterval(interval);
//         },
//         null,
//         context.subscriptions
//       );
//     }
//   );

//   context.subscriptions.push(disposable);
// }

// export function deactivate() {}

// function getWebviewContent(srcUri: string) {
//   return `<!doctype html>
//   <html lang="en">
//   <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width,initial-scale=1">
//     <title>webview-react</title>
//     <script defer="defer" src="${srcUri}"></script>
//   </head>
//   <body>
//     <div id="root"></div>
//   </body>
//   </html>`;
// }
