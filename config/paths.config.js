const path = require('path');

module.exports = {
    SRT_INPUT: path.join(__dirname, '..', 'input.srt'),
    SRT_OUTPUT: path.join(__dirname, '..', 'translated.srt'),

    VTT_INPUT: path.join(__dirname, '..', 'input.vtt'),
    VTT_OUTPUT: path.join(__dirname, '..', 'translated.vtt'),
};