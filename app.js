console.clear();

const { processSrtFile } = require('./controllers/srt.controller');

async function main() {
    await processSrtFile();
}

main();
