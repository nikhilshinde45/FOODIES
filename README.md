
# 🍴 FOODIES

The **FOODIES** is a comprehensive web application designed to streamline restaurant operations — including **table management**, **reservations**, **waiter allotment**, **order tracking**, and **bill generation** — all within one unified platform.  
This system enhances efficiency, coordination, and customer satisfaction through an intuitive interface and real-time functionality.

Developed to simplify day-to-day restaurant management, the platform provides **role-based access control**, **KOT (Kitchen Order Ticket)** integration, and a **Kitchen Display System (KDS)** for smooth communication between staff and kitchen operations.

🔗 GitHub Repository:
👉 https://github.com/nikhilshinde45/FOODIES.git

---

## 🚀 Key Features

### 🧾 Table & Reservation Management
Efficiently handle table bookings, monitor occupancy, and manage customer reservations in real-time.

### 👥 Role-Based Access Control
Four user roles with dedicated dashboards:
Admin – system configuration, reports, and user management
Customer – view menu, place orders, track status
Waiter – manage assigned tables and orders
Chef – handle kitchen orders via KOT/KDS

### 🍽️ Kitchen Order Ticket (KOT) System
A multi-order KOT system designed for real-time order status monitoring, enabling better coordination between waiters and chefs.

### 👨‍🍳 Kitchen Display System (KDS)
Displays live order updates for the kitchen staff, ensuring a smooth and organized flow of operations and timely service.

### 💸 Automated Billing & Order Tracking
Generates bills automatically upon order completion and tracks all orders throughout their lifecycle.

### 📱 Intuitive Interface
Clean, easy-to-navigate design that simplifies operations for all roles — from customers placing orders to admins managing reports.

### 🔐 Secure Login System
Provides user authentication and access management to protect sensitive data and prevent unauthorized access.

🚀 Usage Guide
👥 User Roles

1.The system provides role-based access with four main roles — each having specific privileges and views:
* Admin: Manage users, menus, tables, and system configurations.
* Customer: View menu, place orders, and track order status.
* Waiter: Manage assigned tables, update order status, and assist customers.
* Chef: View and prepare orders from the Kitchen Order Ticket (KOT) system.

2.🧾 Managing Tables & Reservations
* Admin or waiter can add, edit, or remove tables.
* Customers can book tables through the online reservation system.
* System automatically updates table status (occupied / available).

3.🍽️ Ordering & Kitchen Operations
* Customers can place new orders directly through the system.
* Orders are sent to the Kitchen Display System (KDS) in real-time for preparation.
* The Chef updates the order status once prepared.
* Waiters and customers get live updates on order progress.

4.💬 Order Tracking & Notifications
* Real-time updates using Socket.io ensure all users see live order status.
* Automatic notifications for order received, under preparation, and ready to serve.

5.💵 Billing & Payment
* The system automatically generates bills based on completed orders.
* Admin can view daily sales reports and manage payment records.

6.🔐 Authentication & Security

* Secure login and registration using JWT authentication.
* Passwords hashed with bcrypt for data protection.
* Role-based access ensures that each user only sees relevant features.


🛠️ Technology Stack
**Frontend**
* React.js: For building a dynamic and responsive User Interface.
* CSS: Custom styling for a clean, modern aesthetic.


**Backend**
* Node.js & Express.js: Scalable server-side logic and API routing.
* MongoDB & Mongoose: NoSQL database for flexible data modeling.
* Nodemailer: Automated email services for reservations and notifications.


**DevOps & Tools**
* Docker & Docker Compose: Containerization for consistent development and deployment environments.
* Postman: API testing and documentation.


🔐 Security Features
+ JWT (JSON Web Tokens): Secure user authentication and session management.
+ Bcrypt.js: Industry-standard password hashing.
+ Base64 Encryption: Used for secure data encoding within specific workflows.
+ Role-Based Access (RBAC): Strict middleware-level checks to ensure users only access authorized data.


⚙️ Installation & Setup


1. Clone the Repository
Bash

git clone https://github.com/nikhilshinde45/FOODIES.git
cd RESTAURANT

2. Environment Variables
Create a .env file in the backend directory and add the following:

Code snippet

PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password

3. Local Installation (Without Docker)
Backend:

Bash

cd backend
npm install
npm start
cd..
Frontend:

Bash

cd frontend
npm install
npm run dev


🐳 Docker Setup 
To run the entire application ( Backend and Database) seamlessly:

1. Build and Run Containers
Ensure you are in the root directory where docker-compose.yml is located:

Bash

🛠️ Docker Commands

**Start the Application:**

  * docker-compose up --build — Builds the images and starts all services.

  * docker-compose up -d — Starts the services in detached mode (background).

**Stop the Application:**

  * docker-compose down — Stops and removes the containers and networks.

  * docker-compose down -v — Stops containers and deletes the database volumes .

**View Logs:**

  *docker-compose logs -f — View live logs from all services to debug connection issues.


2. Access the Application
Frontend: http://localhost:5173 

Backend API: http://localhost:3000
