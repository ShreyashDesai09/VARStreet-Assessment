# TaskBoard – Full Stack Assignment

## Overview
This project is a task management system where users can create projects, manage tasks within those projects, and add comments. It includes filtering, sorting, pagination, and dashboard insights.

---

## Tech Stack

Backend
- ASP.NET Core Web API (.NET 7)
- Entity Framework Core 7
- SQLite

Frontend
- React.js
- Axios
- React Router

---

## Backend Features

Projects
- Create, update, delete projects
- Unique project name constraint (409 conflict handling)

Tasks
- Create, update, delete tasks
- Update task status
- Get tasks by project
- Filtering by status and priority
- Sorting by due date, priority, created date
- Pagination with metadata response

Comments
- Add comments to tasks
- Fetch comments by task
- Delete comments

Dashboard
- Total tasks
- Tasks grouped by status
- Overdue tasks

---

## API Features (Tasks Endpoint)

Supports query parameters:

- status → filter by task status  
- priority → filter by priority  
- sortBy → dueDate | priority | createdAt  
- sortDir → asc | desc  
- page → page number (default 1)  
- pageSize → max 50  

Example:
GET /api/tasks/project/1?status=InProgress&sortBy=dueDate&page=1&pageSize=10

Response format:
{
  "data": [],
  "page": 1,
  "pageSize": 10,
  "totalCount": 0,
  "totalPages": 0
}

---

## Error Handling

- 200 → Success  
- 201 → Created  
- 400 → Validation errors  
- 404 → Not found  
- 409 → Duplicate project name  
- 500 → Internal server error  

Global exception middleware is implemented to handle unhandled errors.

---

## Backend Setup

1. Navigate to backend
cd TaskBoard.Api

2. Restore dependencies
dotnet restore

3. Run migrations (IMPORTANT)
dotnet ef migrations add InitialCreate
dotnet ef database update

4. Run API
dotnet run

---

## Notes

- Built using .NET 7 (ensure compatible EF Core version)
- SQLite database is created locally (taskboard.db)
- Filtering, sorting, and pagination implemented as per requirements
- Clean separation of controllers (Projects, Tasks, Comments, Dashboard)

---

## Author

Shreyash Desai  
LinkedIn | GitHub
