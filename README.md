# 📋 TaskBoard - Full Stack Management System

A modern, full-stack Task Management application designed to streamline project workflows. This project features a robust **.NET 8 Web API** backend and a dynamic **React** frontend with real-time analytics and theme customization.

---

## 🚀 Features

* **Project Management:** Create and organize multiple projects from a central hub.
* **Dynamic Task Board:** Filter tasks by **Status** (Todo, InProgress, Review, Done) and **Priority** (Low, Medium, High, Critical).
* **Live Analytics Dashboard:** Visual stat cards tracking total tasks, completion rates, and overdue items.
* **Theme Engine:** Seamless Light and Dark mode toggle using React **Context API**.
* **Server-Side Pagination:** Optimized data fetching for high-performance task listing.
* **RESTful Integration:** Full CRUD operations synced with a .NET backend.

---

## 🛠️ Tech Stack

### Frontend
* **Framework:** React.js
* **Routing:** React Router DOM (v6)
* **State Management:** Context API (Theme Management)
* **Styling:** Modern CSS3 with Variables (Grid & Flexbox)
* **HTTP Client:** Axios

### Backend
* **Framework:** .NET 8 Web API
* **Database:** Entity Framework Core
* **Architecture:** Service-Repository Pattern
* **Features:** DTO Mapping, Enums, and CORS configuration.

---

## ⚙️ Installation & Setup

### 1. Backend Setup (.NET)
1.  Navigate to the backend folder:
    ```bash
    cd TaskBoard.Api
    ```
2.  Update the connection string in `appsettings.json`.
3.  Run migrations and start the server:
    ```bash
    dotnet ef database update
    dotnet run
    ```
    *The API will be available at `http://localhost:5245`*

### 2. Frontend Setup (React)
1.  Navigate to the frontend folder:
    ```bash
    cd task-board-ui
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm start
    ```
    *The app will open at `http://localhost:3000`*

---

## 📂 Project Structure

* `/src/components` - Reusable UI components (Navbar, ThemeToggle).
* `/src/context` - ThemeContext for global theme state.
* `/src/pages` - Main views: Projects, Tasks, and Dashboard.
* `/src/App.js` - Routing configuration for the 4 core paths.

---

## 📖 Available Scripts (React)

### `npm start`
Runs the app in development mode.
### `npm run build`
Builds the app for production to the `build` folder.
### `npm test`
Launches the test runner.

---

### Developed by Shreyash Desai 🚀
