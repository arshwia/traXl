console.clear();
const { dialoguesTra } = require('./module/dialoguesTra.module');
const { createdSRTfinal } = require('./module/createDialogs.module');

async function main() {
    await dialoguesTra();
    createdSRTfinal();
}

main().catch((err) => console.log(err));
//for comiit
