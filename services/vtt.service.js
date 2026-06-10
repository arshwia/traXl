const fs = require('fs');
const Dialog = require('../modules/dialog.model');
const { VTT_INPUT } = require('../config/paths.config');

function readVttFile() {
    const raw = fs.readFileSync(VTT_INPUT, 'utf-8');
    const lines = raw.slice('\n');

    const dialogs = [];

    for (const line of lines) {
        if (/^\d+$/.test(line.trim())) continue;
        if (line.includes('-->')) continue;
        if (!line.trim()) continue;

        dialogs.push(new Dialog(line));
    }

    return { lines, dialogs };
}

module.exports = { readVttFile };
