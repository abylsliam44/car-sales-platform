const express = require('express');
const { createCar, getCars, deleteCar } = require('../controllers/carController');
const { protect, roleCheck } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, roleCheck(['admin']), createCar);

router.get('/', getCars);

router.delete('/:id', protect, roleCheck(['admin']), deleteCar);

module.exports = router;
