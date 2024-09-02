const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.get('/get', (req, res) => {
    TodoModel.find()
        .then(result => res.json(result))
        .catch(err => res.status(500).json(err));
});

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndUpdate(id, { done: true }, { new: true })
        .then(result => res.json(result))
        .catch(err => res.status(500).json(err));
});

app.post('/add', (req, res) => {
    const { task } = req.body;
    TodoModel.create({ task })
        .then(result => res.json(result))
        .catch(err => res.status(500).json(err));
});

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete(id)
        .then(result => res.json(result))
        .catch(err => res.status(500).json(err));
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
