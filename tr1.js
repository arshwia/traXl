// این فایل میدهد اکسل دیلاوگ های اصلی را

const fs = require("fs");
const XLSX = require("xlsx");

const srtPath = "subtitleOrg.srt";

//کل جدا سازی متن اصل اینگیلیسی
fs.readFile(srtPath, "utf-8", (err, data) => {
    // جدا کردن دیالوگ ها از بقیه چیز های داخل فایل اس ار تی 
    if (err) throw err;

    const lines = data.split(/\r?\n/);

    let dialogues = [];
    let temp = [];

    for (let line of lines) {

        if (line.trim() === "") {
            if (temp.length > 0) {
                dialogues.push(temp.join("\n"));
                temp = [];
            }
            continue;
        }

        if (/^\d+$/.test(line.trim())) continue;

        if (line.includes("-->")) continue;

        temp.push(line);
    }

    if (temp.length > 0) {
        dialogues.push(temp.join("\n"));
    }


    // ساختن یک فایل اکسل که دیتامون داخلش باشه
    const workbook = XLSX.utils.book_new();
    const worksheet = {};

    dialogues.forEach((i, idx) => {
        const cellAddress = `A${idx + 1}`;
        worksheet[cellAddress] = { v: i };
    });

    worksheet["!ref"] = `A1:A${dialogues.length}`;

    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "dialoguesEx.xlsx");
});