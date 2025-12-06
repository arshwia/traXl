const { google, auth } = require('../config/google.config');
const SHEET_ID = '1x7xYBLZq_CgEZXzYV4mYXdPqNrvsTHrhsvo0DHJZjMw';

/**
 * ترجمه و گرفتن دیالوگ ها با استفاده از گوگل شیت
 */
async function translateDialogs(dialogs) {
    //احراز هویت و کانکت شدن به گوگل شیت
    const client = await auth.getClient();
    //ایجاد یک شیع برای برقراری ارتباط و خواندن و نوشتن
    const sheet = google.sheets({ version: 'v4', auth: client });

    //نوشتن دیالوگ های خام روی گوگل شیت
    await sheet.spreadsheets.values.update({
        spreadsheetId: SHEET_ID,
        range: 'Sheet1!A1',
        valueInputOption: 'RAW',
        requestBody: {
            values: dialogs.map((d) => [d.text]),
        },
    });

    // اعمال دستور ترجمه با استفاده از گوگل ترنسلید
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
    batchUpdate();

    //گرفتن دیالوگ های ترجمه شده
    const result = await sheet.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: 'Sheet1!B1:B',
    });

    // چک کردن این که ایا هنوز دیالوگی هست که داخل فایل ترجمه نشده باشه یا نه
    for (const value of result.data.values) {
        if (value[0] === 'Loading...') {
            batchUpdate();
            break;
        }
    }

    // برگردونندن دیالوگ های ترجمه شده
    return result.data.values?.map(([cell]) => cell || []);
}

// اکسپورت کردن فانکشنمون
module.exports = { translateDialogs };
