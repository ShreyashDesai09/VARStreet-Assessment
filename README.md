# 📋 TaskBoard - Full Stack Management System

A modern, full-stack Task Management application designed to streamline project workflows. This project features a robust **.NET 7.0 Web API** backend and a dynamic **React** frontend with real-time analytics and theme customization.

---

## 🏗️ Design Decisions & Assumptions

* **Architectural Pattern:** Followed the **Service-Repository Pattern** to ensure a clean separation of concerns, making the business logic independent of the data access layer.
* **API Design:** Implemented **Minimal APIs** and **DTO (Data Transfer Objects)** to optimize request/response payloads and prevent circular dependency issues during JSON serialization.
* **Frontend State:** Used the **React Context API** for global theme management (Light/Dark mode) to avoid "prop drilling" and ensure a consistent UI state across all components.
* **Assumptions:** It is assumed that the user has **SQL Server** installed locally or has access to a connection string for database persistence.

---

## ⚙️ Prerequisites

Before running the application, ensure you have the following installed:
* [.NET 7.0 SDK](https://dotnet.microsoft.com/download/dotnet/7.0)
* [Node.js (v18 or higher)](https://nodejs.org/)
* [SQL Server / Azure SQL](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
* [EF Core Tools](https://learn.microsoft.com/en-us/ef/core/get-started/overview/install) (`dotnet tool install --global dotnet-ef`)

---

## 🚀 Installation & Database Setup

### 1. Backend & Database Migrations
1.  Navigate to the backend directory:
    ```bash
    cd TaskBoard.Api
    ```

2.  Update the **Connection String** in `appsettings.json` to point to your SQL Server instance.

3.  **Apply Migrations:** This will create the database schema automatically.
    ```bash
    dotnet ef migrations add InitialCreate
    dotnet ef database update
    ```

4.  **Seed Database:** The application is configured to seed initial data (Status/Priority types) upon the first successful database update or through the `DbInitializer` class on startup.

5.  **Run the API:**
    ```bash
    dotnet run
    ```

    *The API will be available at `http://localhost:5245`*

### 2. Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd task-board-ui
    ```

2.  Install all required dependencies:
    ```bash
    npm install
    ```

3.  **Run the UI:**
    ```bash
    npm start
    ```

    *The application will launch at `http://localhost:3000`*

---

## 🏗️ Technical Highlights (`Program.cs`)

To ensure seamless integration, the following was configured in the backend:
* **CORS Policy:** Enabled an "AllowReactApp" policy to permit requests from the React dev server.
* **JSON Serialization:** Added `JsonStringEnumConverter` so Enums (Status/Priority) are handled as readable strings in the frontend.

---

## 🚀 Key Features

* **🗂️ Project Management:** Organize multiple projects from a central hub.
* **✅ Task Board:** Filter by **Status** and **Priority** with a dynamic UI.
* **📊 Live Analytics:** Visual stat cards for completion rates and overdue items.
* **🌓 Theme Engine:** Persistence-based Light/Dark mode toggle.

---

## 👤 Connect with Me

[![Portfolio](https://img.shields.io/badge/Portfolio-%23121011.svg?style=for-the-badge&logo=google-chrome&logoColor=white)](https://shreyashdesai09.github.io)
[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/shreyash-desai-886979237/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ShreyashDesai09)

---

### Developed by Shreyash Desai 🚀
