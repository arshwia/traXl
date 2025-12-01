const { dialoguesTra } = require('./module/dialoguesTra.module');
const { createdSRTfinal } = require('./module/createDialogs.module');

async function main() {
    dialoguesTra();
    createdSRTfinal();
}

main();
