const { google } = require('googleapis');

//تنظیمات گوگل ای پی ای
const auth = new google.auth.GoogleAuth({
    keyFile: '././service-account.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

module.exports = { google, auth };
