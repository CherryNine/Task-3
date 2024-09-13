export class MoveValidator {
    static validateArgs(args) {
        if (args.length < 3 || args.length % 2 === 0) {
            console.log('Error: Please provide an odd number of unique moves (≥ 3).');
            process.exit(1);
        }
        const uniqueArgs = new Set(args);
        if (uniqueArgs.size !== args.length) {
            console.log('Error: Moves must be unique.');
            process.exit(1);
        }
        return Array.from(uniqueArgs);
    }
}
