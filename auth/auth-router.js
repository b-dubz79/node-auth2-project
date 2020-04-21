const router = require('express').Router(); //what does .Router do?
const bcrypt = require('bcryptjs'); // why don't i have to specific the actual file?
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model');
const secrets = require('../api/secrets.js');

router.post('/register', (req, res) => {
    const user = req.body;

    const rounds = process.env.HASH_ROUNDS || 14

    const hash = bcrypt.hashSync(user.password, rounds);

    user.password = hash; // don't understand assigning hash again.  just did it above.

    Users.add(user)
    .then(saved => {
        res.status(201).json(saved)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: error.message})
    });
});

router.post('/login', (req, res) => {
    let {username, password } = req.body;

    Users.findBy({ username })
        .then(([user]) => {//why is user in brackets?
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);

                res.status(200).json({ message: "Welcome!", token })
            } else {
                res.status(401).json({ message: "You cannot pass!"})
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: error.message})
        })
});

function generateToken(user) {
    const payload = {
        userId: user.id,
        username: user.username,
    };
    const secret = secrets.jwtSecret;
    const options = {
        expiresIn: "1d",
    }

    return jwt.sign(payload, secret, options)
}

module.exports = router;