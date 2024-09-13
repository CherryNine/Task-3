import Game from './game.js';

const main = () => {
    const args = process.argv.slice(2);
    const game = new Game(args);

    if (game.isHelpRequested()) {
        game.printHelp();
        return;
    }

    game.start();
};

main();
