const { processSrtFile } = require('./controllers/srt.controller');

// #TODO باید یک کاری کنم که یه کل سیستم دسترسی داشته و بتونه فقط با داشن ادرس فایل فایل رو ترجمه کنه و همون جا ترجمه رو بریزه
async function main() {
    await processSrtFile();
}

main();
