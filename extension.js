// This extension provides CUE syntax highlighting in Markdown code blocks
const vscode = require('vscode');

function activate(context) {
    console.log('CUE in Markdown Syntax extension is now active!');

    // Register a command to test if extension is working
    let disposable = vscode.commands.registerCommand('cue-markdown.test', function () {
        vscode.window.showInformationMessage('CUE in Markdown Syntax extension is working!');
    });

    context.subscriptions.push(disposable);
}

function deactivate() {
    // Clean up if needed
}

module.exports = {
    activate,
    deactivate
};
