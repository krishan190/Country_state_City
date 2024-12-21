import express from "express";
import User from "../models/userModel.js";
import countryModel from "../models/countryModel.js";
import State from "../models/stateModel.js";
import City from "../models/cityModel.js";

const router = express.Router();

router.get("/cities/:stateName", async (req, res) => {
    const { stateName } = req.params;
    try {
        const cities =await City.find({ short_name: stateName });
        res.status(200).json(cities);
    } catch (error) {
        res.status(500).json({ message: "test  €Error fetching City", error });
    }
});


// get all cities
router.get("/cities", async (req, res) => {
    try {
        const cities = await City.find();
        res.status(200).json(cities);
    } catch (error) {
        res.status(500).json({ message: "Error fetching City", error });
    }
});


// get all countries
router.get("/countries", async (req, res) => {
    // console.log("data", req);
    try {
        const countries = await countryModel.find();
        res.status(200).json(countries);
    } catch (error) {
        res.status(500).json({ message: "Error fetching countries", error });
    }
});

// GET all users
router.get("/", async (req, res) => {
    try {
        const userData = await User.find();
        if (!userData || userData.length === 0) {
            return res.status(404).json({ message: "user data not found" });
        }
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ success: false, message: "server error" });
    }
});

// get user by specific id
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({ message: "user not found" });
        }
        res.status(200).json({ userExist, message: "user exist" });
    } catch (error) {
        res.status(500).json({ success: false, message: "server error" });
    }
});

// CREATE a new user
router.post("/", async (req, res) => {
    const field = req.body;

    if (!field.name || !field.email || !field.address) {
        return res
            .status(400)
            .json({ success: false, message: "Please provide all fields" });
    }

    try {
        const newUser = new User(req.body);
        const { email } = newUser;

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exist" });
        }

        const savedData = await newUser.save();
        res.status(200).json(savedData);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
});

// PUT - Update a user
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({ message: "User Not Found." });
        }

        const updatedData = await User.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        // res.status(200).json(updatedData);
        res.status(200).json({ message: "User Updated Successfully." });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
});

// DELETE a user
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({ message: "User Not Found." });
        }
        await User.findByIdAndDelete(id);
        res.status(201).json({ message: "User deleted successfully." });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
});



// Get states by country short name
router.get("/states/:countryShortName", async (req, res) => {
    const { countryShortName } = req.params;
    try {
        const states = await State.find({ country_short_name: countryShortName });
        res.status(200).json(states);
    } catch (error) {
        res.status(500).json({ message: "Error fetching states", error });
    }
});


// // Get City by state Name   


export default router;
