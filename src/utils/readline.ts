import readline from 'readline';

export class ReadlineUtil {
    private rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    question(promptText: string): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question(promptText, (answer) => {
                resolve(answer);
            });
        });
    }

    close(): void {
        this.rl.close();
    }
}
