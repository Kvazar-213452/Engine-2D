const express = require('express');
const path = require('path');
const { start_pojekt, stop_pojekt, open_file, save_file } = require('./main/post');
const { port } = require('./main/conf');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/satrt', start_pojekt);
app.post('/stop', stop_pojekt);
app.post('/open_file', open_file);
app.post('/save_file', save_file);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});