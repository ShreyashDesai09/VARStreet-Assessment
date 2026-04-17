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
        public async Task<IActionResult> GetTasksByProject(int projectId)
        {
            var tasks = await _context.Tasks
                .Where(t => t.ProjectId == projectId)
                .ToListAsync();

            return Ok(tasks);

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
