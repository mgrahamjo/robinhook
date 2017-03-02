const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

module.exports = query => new Promise(resolve => {

    const stdin = process.openStdin();

    function handler(char) {
        char = char + '';
        switch (char) {
            case '\n':
            case '\r':
            case '\u0004':
                stdin.removeListener('data', handler); 
                stdin.pause();
                break;
            default:
                process.stdout.write('\033[2K\033[200D' + query + Array(rl.line.length+1).join('*'));
        }
    }

    process.stdin.on('data', handler);

    rl.question(query, value => {

        rl.history = rl.history.slice(1);

        resolve(value);

    });

});
