async function loadCars() {
    try {
      const res = await fetch('/api/cars');
      const cars = await res.json();
      if (!res.ok) throw new Error('Failed to load cars');
  
      const list = document.getElementById('car-list');
      list.innerHTML = cars.length === 0
        ? '<p>No cars available.</p>'
        : cars.map(car => `
          <div class="car-card">
            <h3>${car.make} ${car.model} (${car.year})</h3>
            <p>Price: $${car.price}</p>
          </div>
        `).join('');
    } catch (error) {
      document.getElementById('car-list').innerHTML = `<p>Error: ${error.message}</p>`;
    }
  }
  
  document.addEventListener('DOMContentLoaded', loadCars);
  