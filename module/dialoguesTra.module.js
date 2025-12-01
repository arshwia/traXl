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
 * کار کردن با گوگل شیت و ساخت زیرنویس فارسی
 */
async function dialoguesTra() {
    console.log('reading srt...');

    const client = await auth.getClient();
    const sheet = google.sheets({ version: 'v4', auth: client });

    const srt = fs.readFileSync(SRT_INPUT, 'utf-8');
    let lines = srt.split('\n');

    // Extract dialog lines
    const dialogs = [];
    for (const line of lines) {
        if (/^\d+$/.test(line.trim())) continue; // Skip index number
        if (line.includes('-->')) continue; // Skip timestamp
        if (line.trim() === '') continue; // Skip empty lines

        dialogs.push([line]);
    }

    await sheet.spreadsheets.values.update({
        spreadsheetId: SHEET_ID,
        range: 'Sheet1!A1',
        valueInputOption: 'RAW',
        requestBody: {
            values: dialogs,
        },
    });

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
                                formulaValue: '=GOOGLETRANSLATE(A1,"en","fa")',
                            },
                        },
                        fields: 'userEnteredValue',
                    },
                },
            ],
        },
    });

    console.log(
        `dialogs length : ${dialogs.length} \n\n Writing dialogs to Google Sheet...`
    );

    await new Promise((r) => setTimeout(r, 3000));

    // Read translated column
    const result = await sheet.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: 'Sheet1!B1:B',
    });

    const translated = (result.data.values || []).map(([cell]) => cell);
}

module.exports = {
    dialoguesTra,
};
