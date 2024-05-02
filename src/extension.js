"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require("vscode");
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function getWebviewContent(srcUri) {
    return "<!doctype html>\n  <html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n    <title>webview-react</title>\n    <script defer=\"defer\" src=\"".concat(srcUri, "\"></script>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n  </body>\n  </html>");
}
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "generatefrontcode" is now active!');
    // 注册命令来打开输入框
    var disposable = vscode.commands.registerCommand("generatefrontcode.generatefrontcode", function () {
        vscode.window
            .showInputBox({
            prompt: "Please input something...",
        })
            .then(function (value) {
            if (value) {
                vscode.window.showInformationMessage("You entered: " + value);
            }
        });
    });
    context.subscriptions.push(disposable);
    var WebviewSampleProvider = /** @class */ (function () {
        function WebviewSampleProvider() {
        }
        WebviewSampleProvider.prototype.resolveWebviewView = function (webviewView, context, token) {
            webviewView.webview.html = "\n      <!DOCTYPE html>\n      <html lang=\"en\">\n      <head>\n          <meta charset=\"UTF-8\">\n          <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n          <title>WebView \u793A\u4F8B</title>\n      </head>\n      <body>\n          <h1>Hello WebView Provider</h1>\n      </body>\n      </html>\n      ";
            webviewView.webview.options = {
                enableScripts: true,
            };
        };
        return WebviewSampleProvider;
    }());
    vscode.window.registerWebviewViewProvider("package-dependencies", new WebviewSampleProvider());
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
