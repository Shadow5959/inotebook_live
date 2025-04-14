# iNotebook

iNotebook is a full-stack MERN (MongoDB, Express, React, Node.js) application for managing personal notes. It provides features like user authentication, note creation, editing, deletion, and a toggleable dark/light mode for better user experience.

## Features

- **User Authentication**: Secure login and signup functionality.
- **CRUD Operations**: Create, read, update, and delete notes.
- **Dark/Light Mode**: Toggle between dark and light themes.
- **Responsive Design**: Works seamlessly on different screen sizes.

## Project Structure

### Backend (`inotebook_backend`)
- **`app.js`**: Entry point for the backend server.
- **`db.js`**: Database connection setup using MongoDB.
- **`routes/`**: Contains API routes for authentication (`auth.js`) and notes management (`notes.js`).
- **`models/`**: Mongoose models for `User` and `Notes`.
- **`middlewares/`**: Middleware like `fetchUser` for authentication.

### Frontend (`inotebook_frontend`)
- **`src/components/`**: React components for UI, including `Navbar`, `Notes`, `Login`, `Signup`, etc.
- **`src/context/`**: Context API setup for managing global state, including `noteContext` and `noteState`.
- **`public/`**: Static files like `index.html` and icons.

## Installation

### Prerequisites
- Node.js
- MongoDB

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the backend folder and install dependencies:
   ```bash
   cd inotebook_backend
   npm install
   ```
3. Navigate to the frontend folder and install dependencies:
   ```bash
   cd ../inotebook_frontend
   npm install
   ```
4. Set up environment variables:
   - Backend: Create a `.env` file in `inotebook_backend` with the following:
     ```env
     MONGO_URI=<your-mongodb-uri>
     JWT_SECRET=<your-jwt-secret>
     ```

## Running the Application

### Backend
Start the backend server:
```bash
cd inotebook_backend
npm start
```

### Frontend
Start the frontend development server:
```bash
cd inotebook_frontend
npm start
```

## Usage
1. Open the application in your browser at `http://localhost:3000`.
2. Sign up or log in to start managing your notes.
3. Toggle between dark and light modes using the switch in the navbar.

## Contributing
Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

