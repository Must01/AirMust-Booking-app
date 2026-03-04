# AirMust

A Booking application builed with the MERN_STACK that integrates a backend developed with Node.js, Express, and MongoDB, and a frontend built using React and React Router. The project supports user authentication, profile page, place page where all the places you create and you can management them, and booking page with details of all bookings without the payment pages.

---

🌍 Website OverView :

Home Page :
![image](https://github.com/user-attachments/assets/0ec760c1-5ad7-41d7-8fdb-8185f9b12be0)
Place Details :
![image](https://github.com/user-attachments/assets/f87aba8c-763d-4433-b09e-5169d2088ed7)
![image](https://github.com/user-attachments/assets/eea19026-4eca-40b3-a72a-2303c3fb884c)
Profile Page:
![image](https://github.com/user-attachments/assets/3543111b-d92f-419c-927c-393294df9563)
Your Places Page :
![image](https://github.com/user-attachments/assets/20b11fe3-62bf-47e9-82fe-8124c26e75b1)
Add New Place / Edit Place Page:
![image](https://github.com/user-attachments/assets/ce33ac37-641f-4165-95d4-2153679eba89)
My Booking Page :
![image](https://github.com/user-attachments/assets/404c55ce-068f-4aeb-9d18-0971df33790c)
Booking Details Page :
![image](https://github.com/user-attachments/assets/fca3e761-1afb-4a0a-8f2b-f9e1d4efdd22)

---

## Table of Contents

- 📚 [Features](#features)
- 💻 [Technologies Used](#technologies-used)
- ⚙️ [Installation](#installation)
  - [Option 1: Local Development](#option-1-local-development)
  - [Option 2: Docker (Recommended)](#option-2-docker-recommended)
- 🚀 [Usage](#usage)
- 📡 [API Routes](#api-routes)
- 🖼️ [Frontend Pages](#frontend-pages)
- 📜 [License](#license)

---

## Features

### Backend:

- 🛠️ User Registration, Login, and Profile Management
- 🔒 JWT-based Authentication
- 🏠 Place Creation, Update, and Retrieval
- 📷 Photo Upload (via link or file)
- 📅 Booking Creation and Management

### Frontend:

- 🖥️ Responsive UI with React
- 🔄 Seamless Routing using React Router
- 🌐 Context API for Global State Management
- 🔗 Integration with Backend APIs

---

## Technologies Used

### Backend:

- 🟢 **Node.js**
- ⚡ **Express**
- 🍃 **MongoDB** with Mongoose
- 🛡️ **JWT** for Authentication
- 📤 **Multer** for File Uploads
- 🔑 **bcrypt.js** for Password Encryption
- 🌱 **dotenv** for Environment Configuration

### Frontend:

- ⚛️ **React**
- 🚏 **React Router** for Navigation
- 📡 **Axios** for API Requests
- 🎨 **TailwindCSS** (or CSS) for Styling

---

## Installation

### Option 1: Local Development

#### Prerequisites:

- 🖥️ Node.js and npm installed
- 🍃 MongoDB instance running locally or remotely

#### Steps:

1. 📂 Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. 🗂️ Navigate to the project directory:

   ```bash
   cd <project-folder>
   ```

3. 📦 Install dependencies for the backend:

   ```bash
   cd backend
   npm install
   ```

4. 📦 Install dependencies for the frontend:

   ```bash
   cd ../frontend
   npm install
   ```

5. ⚙️ Configure environment variables:

   - Create a `.env` file in the `backend` folder with the following:
     ```
     PORT=3000
     MONGO_URI=<your-mongo-db-uri>
     JWT_SECRET=<your-jwt-secret>
     ```

6. ▶️ Start the backend server:

   ```bash
   npm run dev
   ```

7. ▶️ Start the frontend development server:
   ```bash
   cd ../frontend
   npm start
   ```

---

### Option 2: Docker (Recommended)

#### Prerequisites:

- 🐳 Docker installed
- 📦 Docker Compose installed

#### Steps:

1. 📂 Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. 🗂️ Navigate to the project directory:

   ```bash
   cd <project-folder>
   ```

3. ▶️ Build and run with Docker Compose:

   ```bash
   docker-compose up --build
   ```

4. 🌐 Access the application at `http://localhost`

#### Services:

| Service | Port | Description |
|---------|------|-------------|
| Frontend | 80 | React app served by Nginx |
| Backend | 3000 | Express API |
| MongoDB | 27017 | Database |

---

## Usage

### Local Development:
- 🌐 Access the frontend at `http://localhost:5173`
- 🌐 Access the API at `http://localhost:3000`

### Docker:
- 🌐 Access the application at `http://localhost`

- 🖱️ Interact with features such as registration, login, creating places, and booking.

---

## API Routes

### Authentication:

- 📝 `POST /register`: Register a new user
- 🔑 `POST /login`: Login a user
- 🚪 `POST /logout`: Logout the user
- 👤 `GET /profile`: Get user profile

### Places:

- 🏠 `POST /places`: Add a new place
- 🌍 `GET /places`: Get all places
- 🆔 `GET /places/:id`: Get place by ID
- ✏️ `PUT /places/:id`: Update a place
- 🗂️ `GET /user-place`: Get places owned by a user

### Bookings:

- 🛎️ `POST /bookings`: Create a booking
- 📋 `GET /bookings`: Get bookings for a user
- 🔍 `GET /bookings/:id`: Get booking by ID

---

## Frontend Pages

- 🏠 `/`: Home Page
- 🔑 `/login`: User Login Page
- 📝 `/register`: User Registration Page
- 👤 `/account`: Profile Management
- 🏘️ `/account/places`: Manage User Places
- ➕ `/account/places/new`: Add a New Place
- 📖 `/account/bookings`: View User Bookings
- 🏠 `/place/:id`: View Place Details

---

## Contact

For inquiries or support, please contact: [mustaphabouddahr347@gmail.com]
