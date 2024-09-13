import Table from 'cli-table';

export class HelpPrinter {
    constructor(moves) {
        this.moves = moves;
    }

    printHelp() {
        const N = this.moves.length;
        const maxWidth = 12;

        const table = new Table({
            head: ['PC\\User >'].concat(this.moves),
            colWidths: Array(N + 1).fill(maxWidth)
        });

        for (let i = 0; i < N; i++) {
            const row = [this.moves[i]];
            for (let j = 0; j < N; j++) {
                if (i === j) {
                    row.push('Draw');
                } else {
                    const winIndex = (i + Math.floor(N / 2) + 1) % N;
                    row.push(j === winIndex ? 'Win' : 'Lose');
                }
            }
            table.push(row);
        }

        console.log(table.toString());
    }
}
