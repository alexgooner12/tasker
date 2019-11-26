const router = require('express').Router();
let User = require('../models/User');
const { registrationValidator, loginValidator } = require('../validation');
const bcrypt = require('bcryptjs');
const { createHashedPassword, sendEmailWithResetInstructions } = require('../helpers');
const jwt = require('jsonwebtoken');
const auth = require('./validateToken');

router.post('/signup', async (req, res) => { 
    const { error } = registrationValidator(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const nameExists = await User.findOne({ name: req.body.name });
    if (nameExists) return res.status(400).send({ error: 'Username is taken. Please choose another one' });

    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).send({ error: 'A user has already been registered under this email' });

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: await createHashedPassword(req.body.password),
    });

    try {
        User.create(user).then(() => res.send({ success: 'yes' }));
    } catch (err) {
        console.log(err);
        res.status(400).send({ error: err });
    }

});

router.post('/login', async (req, res) => {
    const { error } = loginValidator(req.body);

    if (error) return res.status(400).send({ error: error.details[0].message });

    const user = await User.findOne({ name: req.body.name });
    if (!user) return res.status(400).send({ error: 'Username is not found' });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send({ error: 'Wrong password' });

    try {
        const token = jwt.sign({ _id: user._id }, process.env.AUTH_TOKEN);
        res.send({ token });
    } catch (err) {
        console.log(err);
    }

});

router.post('/login/identify', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.send({ error: 'Email not found' });
    sendEmailWithResetInstructions(req.body.email, res);
});

router.get('/', auth, async (req, res) => {
    const token = req.header('token');
    const userId = jwt.verify(token, process.env.AUTH_TOKEN)._id;
    try {
        const user = await User.findById(userId).select('name email password _id');
        res.send(user);
    } catch (err) {
        console.log(err);
        res.status(400).send({ err });
    }
});

router.patch('/update', async (req, res) => {
    try {
        const usernameExists = await User.findOne({ name: req.body.name });
        if (usernameExists) return res.send({ error: 'Username is taken' });
        const updatedUser = await User.findOneAndUpdate({ _id: req.body._id }, {
            name: req.body.name,
            email: req.body.email,
        });
        res.send({ updatedUser });
    } catch (error) {
        res.status(400).send({ error });
    }
});

router.post('/update/password', async (req, res) => {
    try {
        const user = await User.findById(req.body._id);
        await bcrypt.compare(req.body.password, user.password, (err, match) => {
            if (match) return res.send({ success: 'It is a match !' });
            res.send({ error: "Wrong password!" });
        });
    } catch (error) {
        res.status(400).send({ error });
    }
});

router.patch('/update/password', async (req, res) => {
    try {
        const editedUser = await User.findOneAndUpdate({ _id: req.body._id }, {
            password: await createHashedPassword(req.body.password)
        });
        res.send({ editedUser });
    } catch (error) {
        res.status(400).send({ error });
    }
});

router.patch('/reset', async (req, res) => {
    try {
        const emailExists = await User.findOne({ email: req.body.email });
        if (!emailExists) return res.send({ error: 'Email not found' });

        const user = await User.findOneAndUpdate({ email: req.body.email }, {
            name: req.body.name,
            password: await createHashedPassword(req.body.password)
        });
        res.send({ user });
    } catch (err) {
        console.log(err);
        res.status(400).json(`Error ${err}`);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.send({ deletedUser });
    } catch(err) { 
        res.status(400).json(`Error ${err}`);
    }
});

module.exports = router;
