using TaskBoard.Api.DTOS;

namespace TaskBoard.Api.Services
{
    public interface IProjectService
    {
        Task<IEnumerable<ProjectResponseDto>> GetAllAsync();
        Task<ProjectResponseDto?> GetByIdAsync(int id);
        Task<ProjectResponseDto> CreateAsync(CreateProjectDto dto);
        Task<bool> DeleteAsync(int id);
    }
}