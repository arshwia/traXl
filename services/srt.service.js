const fs = require('fs');
const Dialog = require('../modules/dialog.model');
const { SRT_INPUT } = require('../config/paths.config');

/**
 *  دیالوگ های مارو از بقیه خط ها جدا میکنه
 */
function readSrtFile() {
    //خواندن فایل خام
    const raw = fs.readFileSync(SRT_INPUT, 'utf-8');
    //جدا کردن هر بخش دیالوگ با استفاده از یک اینتر خالی
    const lines = raw.split('\n');

    //  تعریف ارایه ای که فقط دیالوگ درون ان است
    const dialogs = [];

    // جدا سازی تما چیز ها بجز خود متن دیالوگ
    for (const line of lines) {
        if (/^\d+$/.test(line.trim())) continue;
        if (line.includes('-->')) continue;
        if (!line.trim()) continue;

        // ساخت دیالوگ ها میتون با استفاده از مودل از قبل ساخته شده
        dialogs.push(new Dialog(line));
    }

    // برگردونندن دیالوگ ها و لاین های که تمام خط های فایلمون رو دارن
    return { lines, dialogs };
}

// اکسپورت کردن فانکشنون
module.exports = { readSrtFile };
