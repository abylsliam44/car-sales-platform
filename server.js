require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fetch = require("node-fetch");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const carRoutes = require("./routes/carRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reviewsRoutes = require('./routes/reviewRoutes');
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/orders", orderRoutes);
app.use('/api/reviews', reviewsRoutes);

app.get('/api/currency', async (req, res) => {
    try {
        const apiKey = process.env.EXCHANGE_RATE_API_KEY;

        if (!apiKey) {
            console.error('API key is not in .env');
            return res.status(500).json({ message: 'API key is missing' });
        }

        const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
        console.log('API Error:', apiUrl);

        const response = await fetch(apiUrl);

        if (!response.ok) {
            console.error('Error while getting data:', response.status, response.statusText);
            return res.status(response.status).json({ message: 'Failed to fetch currency data' });
        }

        const data = await response.json();

        if (!data || data.result !== "success" || !data.conversion_rates) {
            console.error('Not valid data:', data);
            return res.status(500).json({ message: 'Currency data not available' });
        }

        const rates = data.conversion_rates;
        const kztRate = rates.KZT;

        if (!kztRate) {
            console.error('KZT rate not found in the data');
            return res.status(500).json({ message: 'KZT rate not available' });
        }

        const convertedRates = Object.entries(rates).reduce((acc, [currency, rate]) => {
            acc[currency] = (rate * kztRate).toFixed(2);
            return acc;
        }, {});

        console.log('KZT data received successfully');
        res.json(convertedRates);
    } catch (error) {
        console.error('Server error:', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
