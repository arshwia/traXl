// این فایل میدهد فایل اس ار تی با دیالوگ های ترجمه شده را

const fs = require("fs");
const xlsx = require("xlsx");

// مسیر فایل‌ها
const srtPath = "./subtitleOrg.srt";
const excelPath = "./dialoguesExFa.xlsx";
const outputSrtPath = "./updated.srt";

// 1. خواندن فایل اکسل
const workbook = xlsx.readFile(excelPath);
const sheetName = workbook.SheetNames[0]; // شیت اول
const sheet = workbook.Sheets[sheetName];

// تبدیل شیت به آرایه
const sheetData = xlsx.utils.sheet_to_json(sheet, { header: 1 });

// آرایه دیالوگ‌ها (ستون اول هر ردیف)
const newDialogues = sheetData.map(row => row[0]);

// 2. خواندن فایل SRT اصلی
fs.readFile(srtPath, "utf8", (err, data) => {
  if (err) throw err;

  // 3. تقسیم به بلوک‌ها با خط خالی
  const blocks = data.split(/\r?\n\r?\n/);

  // 4. جایگزینی دیالوگ‌ها
  const updatedBlocks = blocks.map((block, index) => {
    const lines = block.split(/\r?\n/);

    // شماره و تایم‌کد بدون تغییر
    const header = lines.slice(0, 2);

    // دیالوگ جدید یا همون متن قبلی اگه دیالوگ جدید نباشه
    const newDialogue = newDialogues[index] || lines.slice(2).join("\n");

    return [...header, newDialogue].join("\n");
  });

  // 5. دوباره بلوک‌ها رو به هم بچسبون
  const newSrtContent = updatedBlocks.join("\n\n");

  // 6. نوشتن فایل SRT جدید
  fs.writeFile(outputSrtPath, newSrtContent, "utf8", (err) => {
    if (err) throw err;
    console.log(`SRT جدید ساخته شد: ${outputSrtPath}`);
  });
});