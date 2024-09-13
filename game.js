import { KeyGenerator, HMACGenerator } from './crypto.js';
import { MoveValidator } from './validation.js';
import { RuleManager } from './winner.js';
import { HelpPrinter } from './help.js';

export default class Game {
    constructor(args) {
        this.moves = MoveValidator.validateArgs(args);
        this.ruleManager = new RuleManager(this.moves);
        this.keyGenerator = new KeyGenerator();
        this.hmacGenerator = new HMACGenerator();
        this.helpPrinter = new HelpPrinter(this.moves);
        this.key = this.keyGenerator.generateKey();
        this.computerMove = this.getComputerMove();
        this.hmac = this.hmacGenerator.computeHMAC(this.key, this.computerMove);
    }

    isHelpRequested() {
        return process.argv.includes('help');
    }

    printHelp() {
        this.helpPrinter.printHelp();
    }

    start() {
        console.log('Available moves:');
        this.moves.forEach((move, index) => {
            console.log(`${index + 1} - ${move}`);
        });
        console.log('help - help');
        console.log('0 - Exit');
        console.log('HMAC: ' + this.hmac);
        console.log('Make your choice.');

        process.stdin.resume();
        process.stdin.setEncoding('utf8');
        process.stdin.on('data', (input) => this.handleInput(input));
    }

    handleInput(input) {
        input = input.trim();
        if (input === '0') {
            process.exit();
        } else if (input === 'help') {
            this.printHelp();
        } else {
            const index = parseInt(input, 10) - 1;
            if (index >= 0 && index < this.moves.length) {
                const userMove = this.moves[index];
                const result = this.ruleManager.determineWinner(userMove, this.computerMove);
                console.log(`Your move: ${userMove}`);
                console.log(`Computer move: ${this.computerMove}`);
                console.log(`Result: ${result}`);
                console.log(`Key: ${this.key.toString('hex')}`);
                console.log('You can check HMAC here:https://www.devglan.com/online-tools/hmac-sha256-online')
                process.exit();
            } else {
                console.log('Invalid input. Please select a valid move or enter "help".');
            }
        }
    }

    getComputerMove() {
        const randomIndex = Math.floor(Math.random() * this.moves.length);
        return this.moves[randomIndex];
    }
}
