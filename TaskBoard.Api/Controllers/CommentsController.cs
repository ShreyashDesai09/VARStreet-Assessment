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
    public class CommentsController : ControllerBase
    {

        private readonly AppDbContext _context;

        public CommentsController(AppDbContext context)
        {
            _context = context;
        }


        [HttpPost]
        public async Task<IActionResult> AddComment(Comment comment)
        {

            var taskExists = await _context.Tasks.AnyAsync(t =>  t.Id == comment.TaskId);

            if (!taskExists)
                return BadRequest("Invalid Task Id");

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return Ok(comment);

        }


        [HttpGet("task/{taskId}")]
        public async Task<IActionResult> GetCommentsByTask(int taskId)
        {

            var comments = await _context.Comments
                .Where(c => c.TaskId == taskId)
                .ToListAsync();

            return Ok(comments);

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {

            var comment = await _context.Comments.FindAsync(id);

            if (comment == null)
                return NotFound();

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();

            return Ok();

        }
    }
}
