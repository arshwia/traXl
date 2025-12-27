const { google, auth } = require('../config/google.config');
const SHEET_ID = '1x7xYBLZq_CgEZXzYV4mYXdPqNrvsTHrhsvo0DHJZjMw';

/**
 * ترجمه و گرفتن دیالوگ ها با استفاده از گوگل شیت
 */
async function translateDialogs(dialogs) {
    const client = await auth.getClient();
    const sheet = google.sheets({ version: 'v4', auth: client });

    // نوشتن متون خام
    await sheet.spreadsheets.values.update({
        spreadsheetId: SHEET_ID,
        range: 'Sheet1!A1',
        valueInputOption: 'RAW',
        requestBody: {
            values: dialogs.map((d) => [d.text]),
        },
    });

    async function batchUpdate() {
        await sheet.spreadsheets.batchUpdate({
            spreadsheetId: SHEET_ID,
            requestBody: {
                requests: [
                    {
                        repeatCell: {
                            range: {
                                sheetId: 0,
                                startColumnIndex: 1,
                                endColumnIndex: 2,
                                startRowIndex: 0,
                            },
                            cell: {
                                userEnteredValue: {
                                    formulaValue:
                                        '=GOOGLETRANSLATE(A1,"en","fa")',
                                },
                            },
                            fields: 'userEnteredValue',
                        },
                    },
                ],
            },
        });
    }

    // اجرای اولیه
    await batchUpdate();

    // Loop برای انتظار تا تکمیل ترجمه
    let translatedValues;
    while (true) {
        const result = await sheet.spreadsheets.values.get({
            spreadsheetId: SHEET_ID,
            range: 'Sheet1!B1:B',
        });

        translatedValues = result.data.values || [];

        // آیا هنوز Loading وجود دارد؟
        const hasLoading = translatedValues.some((v) => v[0] === 'Loading...');

        if (!hasLoading) break; // ترجمه کامل شد
        console.log('no traXl done');
        // اگر هنوز ترجمه نشده بود: دوباره Update و کمی صبر
        await batchUpdate();
        await new Promise((r) => setTimeout(r, 1000)); // یک ثانیه صبر
    }

    // برگرداندن ترجمه
    return translatedValues.map(([cell]) => cell);
}
// اکسپورت کردن فانکشنمون
module.exports = { translateDialogs };
