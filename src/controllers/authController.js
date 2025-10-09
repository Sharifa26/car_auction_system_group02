const generateToken = require('../utils/tokenHelper');


/**
 * @desc Generate authentication token
 * @route POST /api/v1/auction/token
 */
const generateAuthToken = (req, res) => {
    const { username, password } = req.body;

    if (username === "Admin" && password === "Admin") {
        const token = generateToken({ username });
        return res.status(200).json({ message: "Login successful", token });
    } else {
        return res.status(401).json({ message: "Invalid credentials" });
    }
};

module.exports = {
    generateAuthToken,
};
