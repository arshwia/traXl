const { readSrtFile } = require('../services/srt.service');
const { translateDialogs } = require('../services/google-sheet.service');
const { createTranslatedSrt } = require('../views/srt.view');

/**
 * کنترل کردن فانکشن های که در جا های دیگه ای نوشته بودیدم
 */
async function processSrtFile() {
    const { lines, dialogs } = readSrtFile();
    const translated = await translateDialogs(dialogs);
    createTranslatedSrt(lines, translated);

    console.log('DONE: translated.srt created.');
}

module.exports = { processSrtFile };
