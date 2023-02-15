const router = require('express').Router();
const User = require('../models/user');
const hashHelpers = require('../helpers/hash');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const checkToken = require('../helpers/token');

dotenv.config();

router.get('/', async (req, res) => {
    try {
        User.find({}).then(result => {
            console.log(result)
            res.send(result)
        }
        )
    } catch (err) {
        console.log(err)
    }
})

router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    const hashedPassword = await hashHelpers.hashPassword(password);
    const user = new User({
        username,
        password: hashedPassword,
        email
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email })
        if (user) {
            if (await hashHelpers.checkPassword(password, user.password)) {
                const accessToken = jwt.sign({ email: email }, process.env.SECRET_KEY, {
                    expiresIn: '1h',
                })

                res.cookie(
                    'token',
                    accessToken,
                    {
                        httpOnly: true,
                    }
                ).status(200).send({ token: accessToken, user })
            } else {
                res.status(400).send('password incorrect')
            }
        } else {
            res.status(404).send('user not found')
        }
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})

router.delete('/', async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email: email })
        if (user) {
            await User.findByIdAndDelete(user._id)
            res.send('user deleted')
        } else {
            res.send('user not found')
        }
    } catch (err) {
        res.send(err)
    }
}
)


module.exports = router;