# Car Sales Platform

## Description
Car Sales Platform is a web application that allows users to browse, buy, and manage car listings. The platform includes authentication, user roles (admin and client), car listing management, dealer management, and order processing.

## Features
- **Authentication & Authorization:** Users can register and log in with JWT authentication.
- **User Roles:** Admins can manage cars, dealers, and orders, while clients can browse and purchase cars.
- **Car Management:** Users can add, update, delete, and view car listings.
- **Dealer Management:** Admins can add and manage dealers.
- **Order Processing:** Clients can place orders for available cars.

## Technologies Used
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Frontend:** HTML, CSS, JavaScript
- **Authentication:** JSON Web Token (JWT)
- **Deployment:** Render

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB (MongoDB Atlas)

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/abylsliam44/car-sales-platform.git
   cd car-sales-platform
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   npm start
   ```
4. Open your browser and navigate to:
   ```sh
   http://localhost:5000
   ```

## API Endpoints
### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Cars
- `GET /api/cars` - Get all cars
- `POST /api/cars` - Add a new car (Admin only)
- `DELETE /api/cars/:id` - Delete a car (Admin only)

### Orders
- `GET /api/orders` - Get all orders (Admin only)
- `POST /api/orders` - Place an order (Client only)
- `GET /api/orders/my` - View client orders
- `DELETE /api/orders/:id` - Delete an order
- `PUT /api/orders/:id/confirm` - Confirm an order (Admin only)
- `PUT /api/orders/:id/cancel` - Cancel an order (Admin only)
- `DELETE /api/orders/:id/remove` - Remove an order (Admin only)

## Folder Structure
```
car-sales-platform/
│── config/
│── controllers/
│── middleware/
│── models/
│── node_modules/
│── public/
│── routes/
│── .gitignore
│── package-lock.json
│── package.json
│── server.js
│── README.md
```

## Deployment
To deploy on platforms like Render or Railway, follow these steps:
1. Push the repository to GitHub.
2. Connect the repository to Render/Railway.
3. Add environment variables in the deployment settings.
4. Deploy the application.

## Contact
For any inquiries, contact [abylajslamzanov@gmail.com].

