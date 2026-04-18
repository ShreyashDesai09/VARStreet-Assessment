using Microsoft.EntityFrameworkCore;
using TaskBoard.Api.Data;
using TaskBoard.Api.Models;
using TaskBoard.Api.DTOS;

namespace TaskBoard.Api.Services
{
    public class ProjectService : IProjectService
    {
        private readonly AppDbContext _context;

        public ProjectService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ProjectResponseDto>> GetAllAsync()
        {
            return await _context.Projects
                .Select(p => new ProjectResponseDto(
                    p.Id,
                    p.Name,
                    p.Description,
                    p.CreatedAt,
                    p.Tasks.Count))
                .ToListAsync();
        }

        public async Task<ProjectResponseDto?> GetByIdAsync(int id)
        {
            var p = await _context.Projects
                .Include(p => p.Tasks)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (p == null) return null;

            return new ProjectResponseDto(p.Id, p.Name, p.Description, p.CreatedAt, p.Tasks.Count);
        }

        public async Task<ProjectResponseDto> CreateAsync(CreateProjectDto dto)
        {
            var project = new Project
            {
                Name = dto.Name,
                Description = dto.Description
            };

            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            return new ProjectResponseDto(
                project.Id,
                project.Name,
                project.Description,
                project.CreatedAt,
                0);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null) return false;

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}