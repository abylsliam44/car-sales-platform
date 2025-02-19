const API_URL = '/api';

document.addEventListener('DOMContentLoaded', () => {
    const role = localStorage.getItem('role');
    if (!localStorage.getItem('token')) {
        alert('Please log in');
        window.location.href = '/login.html';
        return;
    }

    if (role !== 'admin') {
        alert('Access denied. Admins only');
        window.location.href = '/login.html';
        return;
    }

    loadCars();
    loadAllOrders();
});

async function addCar() {
    const token = localStorage.getItem('token');
    const make = document.getElementById('make').value;
    const model = document.getElementById('model').value;
    const year = document.getElementById('year').value;
    const price = document.getElementById('price').value;

    try {
        const res = await fetch(`${API_URL}/cars`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ make, model, year, price }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to add car');
        alert('Car added successfully');
        loadCars();
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

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
                <button onclick="deleteCar('${car._id}')">Delete</button>
            </div>
        `).join('');
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

async function deleteCar(carId) {
    const token = localStorage.getItem('token');
    try {
        const res = await fetch(`${API_URL}/cars/${carId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to delete car');
        alert('Car deleted successfully');
        loadCars();
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

async function loadAllOrders() {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch('/api/orders', {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    if (!res.ok) throw new Error('Failed to fetch orders');

    const orders = await res.json();
    console.log("Orders received:", orders);

    const list = document.getElementById('order-list');
    list.innerHTML = orders.map(order => `
      <div class="order-card">
        <p>Car: ${order.carId?.make} ${order.carId?.model}</p>
        <p>User: ${order.userId?.email}</p>
        <p>Status: <strong>${order.status}</strong></p>
        <button onclick="confirmOrder('${order._id}')">Confirm Order</button>
        <button onclick="cancelOrder('${order._id}')" style="background-color:red;">Cancel Order</button>
        <button onclick="removeOrder('${order._id}')" style="background-color:black;">Remove Order</button>
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
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            }
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
    const res = await fetch(`/api/orders/${orderId}/cancel`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to cancel order');

    alert('Order canceled successfully');
    loadAllOrders();
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
}

async function removeOrder(orderId) {
  const token = localStorage.getItem('token');
  if (!confirm("Are you sure you want to delete this order permanently?")) return;

  try {
    const res = await fetch(`/api/orders/${orderId}/remove`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to remove order');

    alert('Order removed successfully');
    loadAllOrders();
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
}



// 📌 Выход из системы
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/login.html';
}
