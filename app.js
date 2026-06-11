const fs = require('fs/promises');

const { processSrtFile } = require('./controllers/srt.controller');
const { processVttFile } = require('./controllers/vtt.controller');

const { SRT_INPUT, VTT_INPUT } = require('./config/paths.config');

async function main() {
    try {
        try {
            await fs.access(SRT_INPUT);
            console.log('srt ✅');
            await processSrtFile();
            return;
        } catch (err) {}

        try {
            await fs.access(VTT_INPUT);
            console.log('✅ vtt');
            await processVttFile();
        } catch (err) {
            console.log(`\n \n \n ${err}`);
            console.log('not faound VTT ❌');
        }
    } catch (error) {
        console.error('خطای کلی:', error);
    }
}

main();
