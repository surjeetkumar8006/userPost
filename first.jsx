const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// existing users
const users = [
    { email: 'abc@foo.com' }
]

app.use(bodyParser.json());

app.post('/users', (req, res) => {
    const { email } = req.body;
    const userExists = users.find(u => u.email === email);
    if (userExists) {
        return res.status(400).json({ error: 'User already exists' })
    }
    res.json(req.body);
});


app.listen(3000, () => console.log('server started'));