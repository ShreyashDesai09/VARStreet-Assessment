using TaskBoard.Api.Models;

namespace TaskBoard.Api.Services
{
    public interface ICommentService
    {
        Task<IEnumerable<Comment>> GetByTaskIdAsync(int taskId);
        Task<Comment> AddAsync(Comment comment);
        Task<bool> DeleteAsync(int id);
    }
}