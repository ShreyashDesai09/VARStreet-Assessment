# 🚀 TaskBoard – Full Stack Assignment

## 📌 Overview
TaskBoard is a task management system where users can create projects, manage tasks, and add comments. It supports filtering, sorting, pagination, and dashboard insights.

---

## 🛠️ Tech Stack

### 🔧 Backend
- ASP.NET Core Web API (.NET 7)
- Entity Framework Core 7
- SQLite

### 🎨 Frontend
- React.js
- Axios
- React Router

---

## ✨ Features

### 📁 Projects
- Create, update, delete projects  
- Unique project name validation (409 handling)

### 📝 Tasks
- Create, update, delete tasks  
- Update task status  
- Filter by status and priority  
- Sort by due date, priority, created date  
- Pagination with metadata  

### 💬 Comments
- Add comments  
- View comments by task  
- Delete comments  

### 📊 Dashboard
- Total tasks  
- Tasks by status  
- Overdue tasks  

---

## 🔍 API Features (Tasks)

Supports query parameters:

- `status` → filter by status  
- `priority` → filter by priority  
- `sortBy` → dueDate | priority | createdAt  
- `sortDir` → asc | desc  
- `page` → default 1  
- `pageSize` → max 50  


### Response Format
```json
{
  "data": [],
  "page": 1,
  "pageSize": 10,
  "totalCount": 0,
  "totalPages": 0
}
```


## ⚙️ Backend Setup

```terminal
cd TaskBoard.Api
dotnet restore
dotnet ef migrations add InitialCreate
dotnet ef database update
dotnet run
```

## 👨‍💻 Author

[![Portfolio](https://img.shields.io/badge/Portfolio-%23121011.svg?style=for-the-badge&logo=google-chrome&logoColor=white)](https://shreyashdesai09.github.io)
[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/shreyash-desai-886979237/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ShreyashDesai09)
