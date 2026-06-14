const fs = require('fs');
const { VTT_OUTPUT } = require('../config/paths.config');

function createTranslatedVtt(originalLines, translated) {
    let index = 0;
    let isFirst = true;

    const newLines = originalLines.map((line) => {
        const trimmed = line.trim();

        // خطوط ساختاری (شماره، تایم، WEBVTT) رو بدون تغییر نگه دار
        if (
            !trimmed ||
            trimmed === 'WEBVTT' ||
            /^\d+$/.test(trimmed) ||
            line.includes('-->')
        ) {
            return line;
        }

        // جایگزینی متن فارسی
        if (index < translated.length) {
            let text = translated[index].trim();
            index++;

            // فقط برای اولین دیالوگ عدد ۱ اضافه کن
            if (isFirst) {
                isFirst = false;
                text = `1 ${text}`;
            }

            // اضافه کردن کنترل RTL برای نمایش درست فارسی
            text = '\u202B' + text + '\u202C';

            return text;
        }

        return line;
    });

    const content = newLines.join('\n');

    // خیلی مهم: UTF-8 بدون BOM
    fs.writeFileSync(VTT_OUTPUT, content, { encoding: 'utf8' });

    console.log('✅ translated.vtt با UTF-8 و RTL ساخته شد');
}

module.exports = { createTranslatedVtt };