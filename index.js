//  kheyli birahmi :( :( ;( :(                                                                                      x            

const { google } = require('googleapis');
const fs = require('fs');

const SRT_INPUT = "./input.srt";
const SRT_OUTPUT = "./translated.srt";
const SHEET_ID = "1x7xYBLZq_CgEZXzYV4mYXdPqNrvsTHrhsvo0DHJZjMw";

const auth = new google.auth.GoogleAuth({
    keyFile: "./service-account.json",
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

async function main() {
    const client = await auth.getClient();
    const sheet = google.sheets({ version: "v4", auth: client });

    console.log("reading srt...");

    // read srt file
    const srt = fs.readFileSync(SRT_INPUT, "utf-8");
    const lines = srt.split("\n");

    // Extract dialog lines
    const dialogs = [];
    for (const line of lines) {
        if (/^\d+$/.test(line.trim())) continue;       // Skip index number
        if (line.includes("-->")) continue;            // Skip timestamp
        if (line.trim() === "") continue;              // Skip empty lines

        dialogs.push([line]);
    };

    console.log(`dialogs l : ${dialogs.length}`);

    // Write dialogs to Sheet column A
    console.log("Writing dialogs to Google Sheet...");

    await sheet.spreadsheets.values.update({
        spreadsheetId: SHEET_ID,
        range: "Sheet1!A1",
        valueInputOption: "RAW",
        requestBody: {
            values: dialogs,
        },
    });

    console.log("Applying translation formula...");

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
                                formulaValue: '=GOOGLETRANSLATE(A1,"en","fa")'
                            },
                        },
                        fields: "userEnteredValue",
                    },
                },
            ],
        },
    });

    console.log("Waiting 3 seconds...");

    await new Promise((r) => setTimeout(r, 3000));

    // Read translated column
    const result = await sheet.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: "Sheet1!B1:B",
    });

    const translated = (result.data.values || []).map(([cell]) => cell);

    console.log("Downloaded translated dialogs.");

    // Rebuild SRT
    let tIndex = 0;
    const newLines = lines.map((line) => {

        if (/^\d+$/.test(line.trim())) return line;    // line number
        if (line.includes("-->")) return line;         // timestamp
        if (line.trim() === "") return line;           // blank line

        const output = translated[tIndex];
        tIndex++;
        return output;
    });

    // Write new SRT
    fs.writeFileSync(SRT_OUTPUT, newLines.join("\n"), "utf-8");

    console.log("DONE: translated.srt created.");
};

main();
