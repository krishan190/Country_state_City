import express from "express"
import User from '../models/userModel.js';
import Country from "../models/countryModel.js";
import State from "../models/stateModel.js";
import City from "../models/cityModel.js"
const router = express.Router();


// GET all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// POST a new user
router.post('/', async (req, res) => {
    const { name, email, address } = req.body;
    const newUser = new User({ name, email, address });
    await newUser.save();
    res.status(201).json(newUser);
});

// PUT - Update a user
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedUser);
});

// DELETE a user
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted' });
});


router.get('/get-countries', async (req, res) => {
    try {
        const countries = await Country.find({});
        res.status(200).send({ success: true, msg: "Countries data", data: countries })
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message })
    }
})

router.get('/get-states', async (req, res) => {
    try {
        const states = await State.find({});
        res.status(200).send({ success: true, msg: "states data", data: states })
    } catch (error) {

        res.status(400).send({ success: false, msg: error.message })
    }
})

router.get('/get-cities', async (req, res) => {
    try {
        const cities = await City.find({});
        res.status(200).send({ success: true, msg: "states data", data: cities })
    } catch (error) {

        res.status(400).send({ success: false, msg: error.message })
    }
})





export default router;