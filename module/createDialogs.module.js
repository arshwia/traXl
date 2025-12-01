const {
    dialogs,
    lines,
    translated,
    auth,
    google,
    fs,
    SRT_INPUT,
    SRT_OUTPUT,
    SHEET_ID,
} = require('./data.module');

/**
 * ساخت فایل زیر نویس فارسی فاینال
 */
function createdSRTfinal() {
    let tIndex = 0;
    const newLines = lines.map((line) => {
        if (/^\d+$/.test(line.trim())) return line; // line number
        if (line.includes('-->')) return line; // timestamp
        if (line.trim() === '') return line; // blank line

        const output = translated[tIndex];
        tIndex++;
        return output;
    });

    // Write new SRT
    fs.writeFileSync(SRT_OUTPUT, newLines.join('\n'), 'utf-8');

    console.log('DONE: translated.srt created.');
}

module.exports = {
    createdSRTfinal,
};
