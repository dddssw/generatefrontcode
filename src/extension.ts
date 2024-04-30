// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function getWebviewContent() {
  // 返回视图的 HTML 内容
  return `
        <h1>Package Explorer</h1>
        <p>Dependencies:</p>
        <ul>
            <li>In order to use git features, you can open a folder containing a git repository or clone from a URL.</li>
            <li><a href="command:vscode.openFolder">Open Folder</a></li>
            <li><a href="command:git.clone">Clone Repository</a></li>
        </ul>
        <p>To learn more about how to use git and source control in VS Code <a href="https://aka.ms/vscode-scm">read our docs</a>.</p>
    `;
}

export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "generatefrontcode" is now active!'
  );

  // 注册命令来打开输入框
  let disposable = vscode.commands.registerCommand(
    "generatefrontcode.generatefrontcode",
    () => {
      vscode.window
        .showInputBox({
          prompt: "Please input something...",
        })
        .then((value) => {
          if (value) {
            vscode.window.showInformationMessage("You entered: " + value);
          }
        });
    }
  );

  context.subscriptions.push(disposable);
  class WebviewSampleProvider implements vscode.WebviewViewProvider {
    resolveWebviewView(
      webviewView: vscode.WebviewView,
      context: vscode.WebviewViewResolveContext,
      token: vscode.CancellationToken
    ) {
      webviewView.webview.html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>WebView 示例</title>
      </head>
      <body>
          <h1>Hello WebView Provider</h1>
      </body>
      </html>
      `;
    }
  }
  vscode.window.registerWebviewViewProvider(
    "package-dependencies",
    new WebviewSampleProvider()
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
