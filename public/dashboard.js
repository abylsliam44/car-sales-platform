const API_URL = '/api';

document.addEventListener('DOMContentLoaded', () => {
  const role = localStorage.getItem('role');
  if (!localStorage.getItem('token')) {
    alert('Please log in');
    window.location.href = '/login.html';
    return;
  }

  if (role !== 'client') {
    alert('Access denied. Clients only');
    window.location.href = '/login.html';
    return;
  }

  loadCars();
  loadMyOrders();
});

async function loadCars() {
  try {
    const res = await fetch(`${API_URL}/cars`);
    const cars = await res.json();
    if (!res.ok) throw new Error('Failed to fetch cars');

    const list = document.getElementById('car-list');
    list.innerHTML = cars.map(car => `
      <div class="car-card">
        <h4>${car.make} ${car.model} (${car.year})</h4>
        <p>Price: $${car.price}</p>
        <button onclick="orderCar('${car._id}')">Buy Now</button>
      </div>
    `).join('');
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
}

async function orderCar(carId) {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ carId }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to place order');
    alert('Order placed successfully');
    loadMyOrders();
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
}

async function loadMyOrders() {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`${API_URL}/orders/my`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    const orders = await res.json();
    if (!res.ok) throw new Error('Failed to fetch orders');

    const list = document.getElementById('order-list');
    list.innerHTML = orders.length === 0
      ? '<p>No orders yet.</p>'
      : orders.map(order => `
        <div class="order-card">
          <p>Car: ${order.carId?.make} ${order.carId?.model}</p>
          <p>Price: $${order.carId?.price}</p>
          <p>Status: <strong>${order.status}</strong></p>
          ${order.status === 'pending' ? `<button onclick="cancelOrder('${order._id}')">Cancel Order</button>` : ''}
        </div>
      `).join('');
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
}

async function confirmOrder(orderId) {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`${API_URL}/orders/${orderId}/confirm`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'confirmed' }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to confirm order');

    alert('Order confirmed successfully');
    loadAllOrders(); 
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
}

async function cancelOrder(orderId) {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`${API_URL}/orders/${orderId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to cancel order');

    alert('Order cancelled successfully');
    loadMyOrders(); 
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  window.location.href = 'login.html';
}
