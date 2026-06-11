const { google } = require('googleapis');

//تنظیمات گوگل ای پی ای
const auth = new google.auth.GoogleAuth({
    keyFile: './services/google-sheet.service.js',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

module.exports = { google, auth };
