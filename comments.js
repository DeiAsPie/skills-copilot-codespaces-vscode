// Create web server and listen to port 3000

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());

app.get('/comments', (req, res) => {
    fs.readFile('comments.json', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server Error');
            return;
        }
        res.send(data.toString());
    });
});

app.post('/comments', (req, res) => {
    const comment = req.body.comment;
    if (!comment) {
        res.status(400).send('Bad Request');
        return;
    }
    fs.readFile('comments.json', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server Error');
            return;
        }
        const comments = JSON.parse(data.toString());
        comments.push(comment);
        fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Server Error');
                return;
            }
            res.send('OK');
        });
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000/');
});