using Microsoft.AspNetCore.Mvc;
using TaskBoard.Api.Services;
using TaskBoard.Api.DTOS;
using TaskBoard.Api.Models;

namespace TaskBoard.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _service;

        public TasksController(ITaskService service)
        {
            _service = service;
        }

        [HttpGet("project/{projectId}")]
        public async Task<IActionResult> GetTasksByProject(
            int projectId, string? status, string? priority,
            string sortBy = "createdAt", string sortDir = "desc",
            int page = 1, int pageSize = 10)
        {
            var result = await _service.GetPagedTasksAsync(projectId, status, priority, sortBy, sortDir, page, pageSize);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTask(CreateTaskDto dto)
        {
            var result = await _service.CreateAsync(dto);
            return Ok(result);
        }

        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] Status status)
        {
            var result = await _service.UpdateStatusAsync(id, status);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var success = await _service.DeleteAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}