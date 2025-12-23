import * as vscode from 'vscode';

export class CueDefinitionProvider implements vscode.DefinitionProvider {
    public async provideDefinition(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken
    ): Promise<vscode.Definition | null> {

        // 1. Ensure we are inside a CUE code block
        if (!this.isInsideCueBlock(document, position)) {
            return null;
        }

        // 2. Get the word under the cursor
        const range = document.getWordRangeAtPosition(position);
        if (!range) {
            return null;
        }
        const word = document.getText(range);

        // 3. Find the definition in the document
        return this.findDefinitionInWorkspace(word, token);
    }

    private isInsideCueBlock(document: vscode.TextDocument, position: vscode.Position): boolean {
        let lineIndex = position.line;
        while (lineIndex >= 0) {
            const line = document.lineAt(lineIndex).text;
            // Check for start of CUE block
            if (line.trim().startsWith('```cue')) {
                return true;
            }
            // Check for end of a block or start of a different block
            if (line.trim().startsWith('```') && lineIndex !== position.line) {
                return false;
            }
            lineIndex--;
        }
        return false;
    }

    private async findDefinitionInWorkspace(word: string, token: vscode.CancellationToken): Promise<vscode.Location[]> {
        const locations: vscode.Location[] = [];

        // Find all markdown files in the workspace
        const files = await vscode.workspace.findFiles('**/*.md', '**/node_modules/**');

        for (const file of files) {
            if (token.isCancellationRequested) return [];

            const document = await vscode.workspace.openTextDocument(file);
            const text = document.getText();

            // Handle identifiers starting with # (which \b doesn't match correctly)
            const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const pattern = word.startsWith('#') ? `${escapedWord}\\s*:` : `\\b${escapedWord}\\s*:`;
            const regex = new RegExp(pattern, 'g');

            let match;
            while ((match = regex.exec(text)) !== null) {
                const targetPos = document.positionAt(match.index);
                if (this.isInsideCueBlock(document, targetPos)) {
                    locations.push(new vscode.Location(document.uri, targetPos));
                }
            }
        }
        return locations;
    }
}