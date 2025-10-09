const Dealers = require('../models/dealers');
require('../models/auctions');
require('../models/bids');

/**
 * @desc Create a new dealer
 * @route POST /api/v1/dealers
 */
const createDealer = async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        if (!name || !email) {
            return res.status(400).json({ message: "Name and Email are required" });
        }

        const existingDealer = await Dealers.findOne({ email });
        if (existingDealer) {
            return res.status(400).json({ message: "Dealer already exists" });
        }

        const dealer = await Dealers.create({ name, email, phone });
        res.status(201).json({ message: "Dealer created successfully", dealer });
    } catch (error) {
        res.status(500).json({ message: "Error creating dealer", error: error.message });
    }
};

/**
 * @desc Get all dealers
 * @route GET /api/v1/dealers
 */
const getAllDealers = async (req, res) => {
    try {
        const dealers = await Dealers.find().populate("auctionsParticipated").populate("bidsPlaced");
        res.status(200).json({ total: dealers.length, dealers });
    } catch (error) {
        res.status(500).json({ message: "Error fetching dealers", error: error.message });
    }
};

/**
 * @desc Get dealer by ID
 * @route GET /api/v1/dealers/:id
 */
const getDealerById = async (req, res) => {
    try {
        const { id } = req.params;
        const dealer = await Dealers.findById(id)
            .populate("auctionsParticipated")
            .populate("bidsPlaced");

        if (!dealer) return res.status(404).json({ message: "Dealer not found" });

        res.status(200).json({ message: "Dealer fetched successfully", dealer });
    } catch (error) {
        res.status(500).json({ message: "Error fetching dealer", error: error.message });
    }
};

/**
 * @desc Update dealer details
 * @route PATCH /api/v1/dealers/:id
 */
const updateDealer = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone } = req.body;

        const dealer = await Dealers.findByIdAndUpdate(
            id,
            { name, email, phone },
            { new: true, runValidators: true }
        );

        if (!dealer) return res.status(404).json({ message: "Dealer not found" });

        res.status(200).json({ message: "Dealer updated successfully", dealer });
    } catch (error) {
        res.status(500).json({ message: "Error updating dealer", error: error.message });
    }
};

/**
 * @desc Delete dealer
 * @route DELETE /api/v1/dealers/:id
 */
const deleteDealer = async (req, res) => {
    try {
        const { id } = req.params;
        const dealer = await Dealers.findByIdAndDelete(id);

        if (!dealer) return res.status(404).json({ message: "Dealer not found" });

        res.status(200).json({ message: "Dealer deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting dealer", error: error.message });
    }
};

module.exports = {
    createDealer,
    getDealerById,
    updateDealer,
    deleteDealer,
    getAllDealers,
};

