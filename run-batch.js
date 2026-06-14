const fs = require('fs/promises');
const path = require('path');
const { exec } = require('child_process');

const INPUT_DIR = path.join(__dirname, 'inputs', 'vtt');
const OUTPUT_DIR = path.join(__dirname, 'outputs', 'vtt');
const TEMP_INPUT = path.join(__dirname, 'input.vtt');
const TEMP_OUTPUT = path.join(__dirname, 'translated.vtt');

async function ensureDirs() {
    await fs.mkdir(INPUT_DIR, { recursive: true });
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
}

async function batchTranslate() {
    await ensureDirs();

    let files;
    try {
        files = await fs.readdir(INPUT_DIR);
        files = files.filter(f => f.toLowerCase().endsWith('.vtt'));
    } catch (err) {
        console.error('❌ inputs/vtt folder not found or cannot be accessed');
        return;
    }

    if (files.length === 0) {
        console.log('⚠️ No VTT files found in inputs/vtt');
        return;
    }

    console.log(`🔄 Starting translation of ${files.length} VTT files...\n`);

    for (let i = 0; i < files.length; i++) {
        const originalName = files[i];
        const inputPath = path.join(INPUT_DIR, originalName);
        const outputName = originalName.replace(/\.vtt$/i, '_fa.vtt');
        const finalOutputPath = path.join(OUTPUT_DIR, outputName);

        console.log(`⏳ [${i+1}/${files.length}] Processing: ${originalName}`);

        try {
            // Copy to temporary input
            await fs.copyFile(inputPath, TEMP_INPUT);

            // Run the main app
            await new Promise((resolve, reject) => {
                exec('node app.js', (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error executing app.js for ${originalName}`);
                        reject(error);
                        return;
                    }
                    if (stderr) console.error(stderr);
                    resolve();
                });
            });

            // Copy translated file to output with new name
            await fs.copyFile(TEMP_OUTPUT, finalOutputPath);

            console.log(`✅ Translated: ${outputName}\n`);

        } catch (err) {
            console.error(`❌ Failed to process ${originalName}: ${err.message}`);
        }
    }

    console.log('🎉 All files have been processed successfully!');
}

batchTranslate();