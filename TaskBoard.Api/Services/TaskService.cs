using Microsoft.EntityFrameworkCore;
using TaskBoard.Api.Data;
using TaskBoard.Api.Models;
using TaskBoard.Api.DTOS;

namespace TaskBoard.Api.Services
{
    public class TaskService : ITaskService
    {
        private readonly AppDbContext _context;

        public TaskService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<object> GetPagedTasksAsync(int projectId, string? status, string? priority, string sortBy, string sortDir, int page, int pageSize)
        {
            var query = _context.Tasks.Where(t => t.ProjectId == projectId);

            // Filtering
            if (!string.IsNullOrEmpty(status))
                query = query.Where(t => t.Status.ToString() == status);

            if (!string.IsNullOrEmpty(priority))
                query = query.Where(t => t.Priority.ToString() == priority);

            // Sorting
            query = sortBy.ToLower() switch
            {
                "duedate" => sortDir == "asc" ? query.OrderBy(t => t.DueDate) : query.OrderByDescending(t => t.DueDate),
                "priority" => sortDir == "asc" ? query.OrderBy(t => t.Priority) : query.OrderByDescending(t => t.Priority),
                _ => sortDir == "asc" ? query.OrderBy(t => t.CreatedAt) : query.OrderByDescending(t => t.CreatedAt)
            };

            var totalCount = await query.CountAsync();
            var data = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(t => new TaskResponseDto(
                    t.Id,
                    t.ProjectId,
                    t.Title,
                    t.Description,
                    t.Priority.ToString(),
                    t.Status.ToString(),
                    t.DueDate,
                    t.CreatedAt,
                    t.Comments.Count))
                .ToListAsync();

            return new { data, page, pageSize, totalCount, totalPages = (int)Math.Ceiling(totalCount / (double)pageSize) };
        }

        public async Task<TaskResponseDto> CreateAsync(CreateTaskDto dto)
        {
            var task = new ProjectTask
            {
                ProjectId = dto.ProjectId,
                Title = dto.Title,
                Description = dto.Description,
                Priority = dto.Priority,
                Status = dto.Status,
                DueDate = dto.DueDate
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return new TaskResponseDto(task.Id, task.ProjectId, task.Title, task.Description,
                task.Priority.ToString(), task.Status.ToString(), task.DueDate, task.CreatedAt, 0);
        }

        public async Task<TaskResponseDto?> UpdateStatusAsync(int id, Status status)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return null;

            task.Status = status;
            await _context.SaveChangesAsync();

            return new TaskResponseDto(task.Id, task.ProjectId, task.Title, task.Description,
                task.Priority.ToString(), task.Status.ToString(), task.DueDate, task.CreatedAt, 0);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return false;

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<object> GetProjectDashboardAsync(int projectId)
        {
            var tasks = await _context.Tasks.Where(t => t.ProjectId == projectId).ToListAsync();

            return new
            {
                totalTasks = tasks.Count,
                todo = tasks.Count(t => t.Status == Status.Todo),
                inProgress = tasks.Count(t => t.Status == Status.InProgress),
                review = tasks.Count(t => t.Status == Status.Review),
                done = tasks.Count(t => t.Status == Status.Done),
                overdue = tasks.Count(t => t.DueDate.HasValue && t.DueDate < DateTime.UtcNow && t.Status != Status.Done)
            };
        }
    }
}