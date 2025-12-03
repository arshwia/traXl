const fs = require('fs');
const { SRT_OUTPUT } = require('../config/paths.config');

/**
 * ساخت دوباره همان فایل با دیالوگ های فارسی
 */
function createTranslatedSrt(originalLines, translated) {
    let index = 0;

    const newLines = originalLines.map((line) => {
        if (/^\d+$/.test(line.trim())) return line;
        if (line.includes('-->')) return line;
        if (!line.trim()) return line;

        const tr = translated[index];
        index++;
        return tr;
    });

    fs.writeFileSync(SRT_OUTPUT, newLines.join('\n'), 'utf-8');
}

module.exports = { createTranslatedSrt };
