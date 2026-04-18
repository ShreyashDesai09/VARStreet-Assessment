using TaskBoard.Api.DTOS;
using TaskBoard.Api.Models;

namespace TaskBoard.Api.Services
{
    public interface ITaskService
    {
        Task<object> GetPagedTasksAsync(int projectId, string? status, string? priority, string sortBy, string sortDir, int page, int pageSize);
        Task<TaskResponseDto> CreateAsync(CreateTaskDto dto);
        Task<TaskResponseDto?> UpdateStatusAsync(int id, Status status);
        Task<bool> DeleteAsync(int id);
        Task<object> GetProjectDashboardAsync(int projectId);
    }
}