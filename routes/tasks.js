const express = require('express');
const Task = require('../models/Task');
const auth = require('./validateToken');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/', auth, async (req, res) => {
    const token = req.header('token');
    const userId = jwt.verify(token, process.env.AUTH_TOKEN)._id;
    try {
        const tasks = await Task.find({ userId }).select('title description _id');
        res.send({ tasks });
    } catch (error) {
        res.send({ error });
    }
});

router.get('/:taskId', auth, async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId).select('title description _id');
        res.send({ task });
    } catch (error) {
        res.send({ error });
    }
});

router.post('/', auth, async (req, res) => {
    const token = req.headers.token;
    const userId = await jwt.verify(token, process.env.AUTH_TOKEN)._id;
    const task = new Task({ title: req.body.title, description: req.body.description, userId });
    try {
        const savedTask = await task.save();
        res.send({ savedTask });
    } catch (error) {
        res.send({ error });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedTask = await Task.deleteOne({ _id: req.params.id });
        res.send({ deletedTask });
    } catch (error) {
        res.send({ error });
    }
});

router.patch('/:id', auth, async (req, res) => {
    try {
        const updatedTask = await Task.updateOne({ _id: req.params.id }, { 
            $set: { title: req.body.title, description: req.body.description } 
        });
        res.send({ updatedTask });
    } catch (error) {
        res.send({ error });
    }
});

module.exports = router;