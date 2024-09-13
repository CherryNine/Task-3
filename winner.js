export class RuleManager {
    constructor(moves) {
        this.moves = moves;
    }

    determineWinner(userMove, computerMove) {
        const index = this.moves.indexOf(userMove);
        const totalMoves = this.moves.length;
        const half = Math.floor(totalMoves / 2);

        const winningMoves = new Set();
        const losingMoves = new Set();

        for (let i = 1; i <= half; i++) {
            winningMoves.add(this.moves[(index + i) % totalMoves]);
        }

        for (let i = 1; i <= half; i++) {
            losingMoves.add(this.moves[(index - i + totalMoves) % totalMoves]);
        }

        if (userMove === computerMove) {
            return 'Draw';
        }
        return winningMoves.has(computerMove) ? 'You Win' : 'Computer Wins';
    }
}
