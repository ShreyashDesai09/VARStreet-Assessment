using Microsoft.AspNetCore.Mvc;
using TaskBoard.Api.Services;

namespace TaskBoard.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly ITaskService _service;

        public DashboardController(ITaskService service)
        {
            _service = service;
        }

        [HttpGet("{projectId}")]
        public async Task<IActionResult> GetDashboard(int projectId)
        {
            var stats = await _service.GetProjectDashboardAsync(projectId);
            return Ok(stats);
        }
    }
}