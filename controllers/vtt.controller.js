const { readVttFile } = require('../services/vtt.service');
const { translateDialogs } = require('../services/google-sheet.service');
const { createTranslatedVtt } = require('../views/vtt.view');

/**
 * کنترل کردن فانکشن های که در جا های دیگه ای نوشته بودیدم
 */
async function processVttFile() {
    const { lines, dialogs } = readVttFile();
    console.log('1 side done');
    const translated = await translateDialogs(dialogs);
    console.log('2 side done');
    createTranslatedVtt(lines, translated);

    console.log('DONE: translated.vtt created.');
}

module.exports = { processVttFile };
