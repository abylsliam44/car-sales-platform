const Order = require('../models/Order');
const Car = require('../models/Car');

const createOrder = async (req, res) => {
  try {
    const car = await Car.findById(req.body.carId);
    if (!car) return res.status(404).json({ message: 'Car not found' });

    const order = await Order.create({
      userId: req.user.id,
      carId: req.body.carId,
      status: 'pending',
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate('carId');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
      status: 'pending',
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found or cannot be cancelled' });
    }

    res.status(200).json({ message: 'Order cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const confirmOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = 'confirmed';
    await order.save();

    res.status(200).json({ message: 'Order confirmed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate({ path: 'carId', select: 'make model' })
      .populate({ path: 'userId', select: 'email' });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, getMyOrders, deleteOrder, confirmOrder, getAllOrders };

const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (order.status === 'canceled') {
      return res.status(400).json({ message: 'Order is already canceled' });
    }

    order.status = 'canceled';
    await order.save();

    res.status(200).json({ message: 'Order canceled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, getMyOrders, deleteOrder, confirmOrder, getAllOrders, cancelOrder, removeOrder };


