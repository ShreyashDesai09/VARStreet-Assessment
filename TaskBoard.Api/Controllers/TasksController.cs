using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskBoard.Api.Data;
using TaskBoard.Api.Models;
using System.Linq;

namespace TaskBoard.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {

        private readonly AppDbContext _context;

        public TasksController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateTask(ProjectTask task)
        {
            var projectExists = await _context.Projects.AnyAsync(p => p.Id == task.ProjectId);

            if (!projectExists)
                return BadRequest("Invalid ProjectId");

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTasksByProject), new { projectId = task.ProjectId }, task);
        }

        [HttpGet("project/{projectId}")]
        public async Task<IActionResult> GetTasksByProject(
        int projectId,
        string? status,
        string? priority,
        string sortBy = "createdAt",
        string sortDir = "desc",
        int page = 1,
        int pageSize = 10)
            {
                if (page < 1) page = 1;
                if (pageSize > 50) pageSize = 50;

                var query = _context.Tasks.Where(t => t.ProjectId == projectId);

                if (!string.IsNullOrEmpty(status))
                    query = query.Where(t => t.Status.ToString() == status);

                if (!string.IsNullOrEmpty(priority))
                    query = query.Where(t => t.Priority.ToString() == priority);

                if (sortBy == "dueDate")
                    query = sortDir == "asc"
                        ? query.OrderBy(t => t.DueDate)
                        : query.OrderByDescending(t => t.DueDate);
                else if (sortBy == "priority")
                    query = sortDir == "asc"
                        ? query.OrderBy(t => t.Priority)
                        : query.OrderByDescending(t => t.Priority);
                else
                    query = sortDir == "asc"
                        ? query.OrderBy(t => t.CreatedAt)
                        : query.OrderByDescending(t => t.CreatedAt);

                var totalCount = await query.CountAsync();

                var data = await query
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();

                return Ok(new
                {
                    data,
                    page,
                    pageSize,
                    totalCount,
                    totalPages = (int)Math.Ceiling(totalCount / (double)pageSize)
                });
            }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
                return NotFound();

            return Ok(task);
        }

        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] Status status)
        {

            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
                return NotFound();

            task.Status = status;
            await _context.SaveChangesAsync();

            return Ok(task);

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, ProjectTask updateTask)
        {

            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
                return NotFound();

            task.Title = updateTask.Title;
            task.Description = updateTask.Description;
            task.Priority = updateTask.Priority;
            task.DueDate = updateTask.DueDate;

            await _context.SaveChangesAsync();

            return Ok(task);

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {

            var task = await _context.Tasks.FindAsync(id);

            if(task == null)
                return NotFound();

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return Ok();

        }
  
    }
}
