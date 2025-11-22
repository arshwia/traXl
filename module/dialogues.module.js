const fs = require('fs');
const XLSX = require('xlsx');

function liner(err, data) {
    if (err) throw err;

    // این در کل میاد هر خط رو میکنه یک اینکدس برای ارایه
    const lines = data.split(/\r?\n/);

    let dialogues = [];
    let temp = [];

    for (const line of lines) {
        if (line.trim() === "") {
            if (temp.length > 0) {
                dialogues.push(temp.join('\n'));
                temp = [];
            }
            continue;
        };

        if (/^\d+$/.test(line.trim())) continue;

        if (line.includes("-->")) continue;

        temp.push(line);
    };

    // همون خط جدا کننده رو میسازه
    if (temp.length > 0) {
        dialogues.push(temp.join('\n'));
    };

    return dialogues
};

//  اسکل ساز 
const createEx = (dialogues) => {
    const workbook = XLSX.utils.book_new();
    const worksheet = {};

    dialogues.forEach((item, index) => {
        const callAddress = `A${index + 1}`;
        worksheet[callAddress] = { v: item };
    });

    worksheet["!ref"] = `A1:A${dialogues.length}`;

    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "dialogues-en.xlsx");
}

const { google } = require('googleapis');

async function writeToSheet(dialogues) {
    const auth = new google.auth.GoogleAuth({
        keyFile: "serviceAccount.json",
        scopes: ["https://www.googleapis.com/auth/spreadsheets"]
    });

    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = "1x7xYBLZq_CgEZXzYV4mYXdPqNrvsTHrhsvo0DHJZjMw";

    const values = dialogues.map(d => [d]);

    await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: "Sheet1!A1",
        valueInputOption: "RAW",
        resource: { values },
    });

    console.log("DONE!");
}

module.exports = {
    liner,
    createEx,
    writeToSheet
}