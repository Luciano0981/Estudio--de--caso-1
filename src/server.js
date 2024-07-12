const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

let notes = [];

app.use(bodyParser.json());
app.use(express.static('public'));

// Rutas
app.get('/notas', (req, res) => {
    res.sendFile(__dirname + '/../views/index.html');
});

app.get('/notas/:id', (req, res) => {
    res.sendFile(__dirname + '/../views/edit.html');
});

// API
app.post('/api/notas', (req, res) => {
    const { title, content, tags } = req.body;
    if (!title || !content) {
        return res.status(400).send('Title and content are required');
    }
    const note = {
        id: uuidv4(),
        title,
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: tags || []
    };
    notes.push(note);
    res.status(201).json(note);
});

app.put('/api/notas/:id', (req, res) => {
    const { id } = req.params;
    const { title, content, tags } = req.body;
    const note = notes.find(n => n.id === id);
    if (!note) {
        return res.status(404).send('Note not found');
    }
    note.title = title || note.title;
    note.content = content || note.content;
    note.updatedAt = new Date();
    note.tags = tags || note.tags;
    res.json(note);
});

app.delete('/api/notas/:id', (req, res) => {
    notes = notes.filter(n => n.id !== req.params.id);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
