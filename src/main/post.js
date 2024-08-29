const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs');
const { content_html_file, create_block } = require('./func');
const { func_id_get } = require('./let');
const { name_html_file } = require('./conf');

let start_core = 0;
let process;

function stopProcess(process) {
    if (process) {
        process.kill();
    }
}

function start_pojekt(req, res) {
    const receivedData = req.body;
    if (start_core === 0) {
        start_core = 1;

        const folderPath = path.join(__dirname, '../../end');
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }

        const filePath = path.join(folderPath, name_html_file);

        let code = create_block(receivedData);
        let htmlContent = content_html_file(code, func_id_get, receivedData);

        fs.writeFileSync(filePath, htmlContent, 'utf8');

        let exePath = path.join('C:', 'Users', 'god19', 'Desktop', 'Engine-web', 'core', 'main.exe');
        process = execFile(exePath, { cwd: path.dirname(exePath) });

        res.status(200).send('Data received');
    }
}

function stop_pojekt(req, res) {
    if (start_core === 1){
        start_core = 0;
        stopProcess(process);
        res.status(200).send('Process stopped and reset');
    }
}

function open_file(req, res) {
    const filePath = path.join(__dirname, '../../save/main.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        const jsonData = JSON.parse(data);
        res.status(200).send(jsonData);
    });
}

function save_file(req, res) {
    const receivedData = req.body;
    
    const jsonData = JSON.stringify(receivedData, null, 2);
    console.log(jsonData)
    const filePath = 'out/data.json';
    
    fs.writeFile(filePath, jsonData, 'utf8', (err) => {
        if (err) {
            console.error("Сталася помилка під час запису файлу:", err);
        } else {
            console.log("Файл успішно створено та дані записано.");
        }
    });
    res.status(200).send('Process stopped and reset');
}

module.exports = { start_pojekt, stop_pojekt, open_file, save_file };