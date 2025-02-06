// src/routes/api/radiology/+server.js
import { json } from '@sveltejs/kit';
import { spawn } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { tmpdir } from 'os';
import { fileURLToPath } from 'url';
import { pathToPyhton } from '../../../python/path.helper';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function POST({ request }) {
    try {
        // Parse multipart form data
        const formData = await request.formData();
        const fileField = formData.get('file');
        if (!fileField || typeof fileField === 'string') {
            return new Response('No file uploaded', { status: 400 });
        }

        // Get the language field; default to "en"
        const languageField = formData.get('language') || "en";

        // Convert uploaded file (ArrayBuffer) to a Buffer
        const arrayBuffer = await fileField.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Write the file to a temporary directory
        const tempDir = tmpdir();
        const fileName = `upload-${Date.now()}${path.extname(fileField.name)}`;
        const filePath = path.join(tempDir, fileName);
        await fs.writeFile(filePath, buffer);

        // Compute the absolute path to the Python script.
        // Adjust the path if needed (here using an absolute path as an example).
        const scriptPath = `${pathToPython}/radiology/radiology.py`;

        // Spawn the Python process, passing the file path and language as arguments
        const pythonProcess = spawn('python', [scriptPath, filePath, languageField]);

        let output = '';
        let errorOutput = '';

        pythonProcess.stdout.on('data', (data) => {
            output += data.toString();
        });
        pythonProcess.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });

        const exitCode = await new Promise((resolve) => {
            pythonProcess.on('close', resolve);
        });

        // Clean up: delete the temporary file
        await fs.unlink(filePath);

        if (exitCode !== 0) {
            console.error(`Python error: ${errorOutput}`);
            return new Response(`Python script error: ${errorOutput}`, { status: 500 });
        }

        // Parse the JSON output from the Python script
        const result = JSON.parse(output);
        return json(result);
    } catch (err) {
        console.error(err);
        return new Response(`Internal Server Error: ${err}`, { status: 500 });
    }
}
