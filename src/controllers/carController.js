const Car = require('../models/cars');

/**
 * @desc Create a new car
 * @route POST /api/v1/car
 */
const createCar = async (req, res) => {
    try {
        const { make, model, year } = req.body;

        if (!make || !model || !year) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const car = await Car.create({ make, model, year });
        res.status(201).json({ message: "Car created successfully", car });
    } catch (error) {
        res.status(500).json({ message: "Error creating car", error: error.message });
    }
};

/**
 * @desc Fetch all cars
 * @route GET /api/v1/car
 */
const getAllCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.status(200).json({ message: "Cars fetched successfully", total: cars.length, cars });
    } catch (error) {
        res.status(500).json({ message: "Error fetching cars", error: error.message });
    }
};

/**
 * @desc Fetch a single car by ID
 * @route GET /api/v1/car/:id
 */
const getCarById = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await Car.findById(id);

        if (!car) return res.status(404).json({ message: "Car not found" });

        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ message: "Error fetching car", error: error.message });
    }
};

/**
 * @desc Update car details
 * @route PATCH /api/v1/car/:id
 */
const updateCar = async (req, res) => {
    try {
        const { id } = req.params;
        const { make, model, year } = req.body;

        const car = await Car.findByIdAndUpdate(
            id,
            { make, model, year },
            { new: true, runValidators: true }
        );

        if (!car) return res.status(404).json({ message: "Car not found" });

        res.status(200).json({ message: "Car updated successfully", car });
    } catch (error) {
        res.status(500).json({ message: "Error updating car", error: error.message });
    }
};

/**
 * @desc Delete a car by ID
 * @route DELETE /api/v1/car/:id
 */
const deleteCar = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await Car.findByIdAndDelete(id);

        if (!car) return res.status(404).json({ message: "Car not found" });

        res.status(200).json({ message: "Car deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting car", error: error.message });
    }
};


module.exports = {
    createCar,
    getAllCars,
    getCarById,
    updateCar,
    deleteCar,
};