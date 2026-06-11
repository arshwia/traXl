const fs = require('fs');
const { VTT_OUTPUT } = require('../config/paths.config');

function createTranslatedVtt(originalLines, translated) {
    let index = 0;

    const newLines = originalLines.map((line) => {
        const trimmed = line.trim();

        if (
            !trimmed ||
            trimmed === 'WEBVTT' ||
            /^\d+$/.test(trimmed) ||
            line.includes('-->')
        ) {
            return line;
        }

        if (index < translated.length) {
            const tr = translated[index];
            index++;
            return tr;
        }

        return line;
    });

    fs.writeFileSync(VTT_OUTPUT, newLines.join('\n'), 'utf-8');
}

module.exports = { createTranslatedVtt };
