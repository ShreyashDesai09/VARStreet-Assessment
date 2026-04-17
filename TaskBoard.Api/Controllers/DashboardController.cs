using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskBoard.Api.Data;
using TaskBoard.Api.Models;
using System.Linq;

namespace TaskBoard.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DashboardController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("{projectId}")]
        public async Task<IActionResult> GetDashboard(int projectId)
        {
            var tasks = await _context.Tasks
                .Where(t => t.ProjectId == projectId)
                .ToListAsync();

            var totalTasks = tasks.Count;

            var todo = tasks.Count(t => t.Status == Status.Todo);
            var inProgress = tasks.Count(t => t.Status == Status.InProgress);
            var review = tasks.Count(t => t.Status == Status.Review);
            var done = tasks.Count(t => t.Status == Status.Done);

            var overdue = tasks.Count(t =>
                t.DueDate.HasValue &&
                t.DueDate < DateTime.UtcNow &&
                t.Status != Status.Done);

            return Ok(new
            {
                totalTasks,
                todo,
                inProgress,
                review,
                done,
                overdue
            });
        }
    }
}