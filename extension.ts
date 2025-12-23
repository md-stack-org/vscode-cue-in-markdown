import * as vscode from 'vscode';
import { CueDefinitionProvider } from './cueDefinitionProvider';

export function activate(context: vscode.ExtensionContext) {
    const selector = { language: 'markdown', scheme: 'file' };
    const provider = new CueDefinitionProvider();

    const disposable = vscode.languages.registerDefinitionProvider(selector, provider);
    context.subscriptions.push(disposable);
}

export function deactivate() {}