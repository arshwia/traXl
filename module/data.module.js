// چیز های که به صورت گلوبال بهشون نیاز داریم

const { google } = require('googleapis');
const fs = require('fs');

let dialogs = [];
let lines = [];
let translated = [];

const auth = new google.auth.GoogleAuth({
    keyFile: 'C:/Users/Arsh/Desktop/traXl/service-account.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const SRT_INPUT = './input.srt';
const SRT_OUTPUT = './translated.srt';
const SHEET_ID = '1x7xYBLZq_CgEZXzYV4mYXdPqNrvsTHrhsvo0DHJZjMw';

module.exports = {
    dialogs,
    lines,
    translated,
    auth,
    google,
    fs,
    SRT_INPUT,
    SRT_OUTPUT,
    SHEET_ID,
};
