using System.ComponentModel.DataAnnotations;

namespace TaskBoard.Api.Models
{
    public class ProjectTask : BaseEntity
    {
        public int Id { get; set; }

        [Required]
        public int ProjectId { get; set; }

        [Required]
        [MaxLength(150)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(1000)]
        public string? Description { get; set; }

        public Priority Priority { get; set; }
        public Status Status { get; set; }
        public DateTime? DueDate { get; set; }

        public Project Project { get; set; } = null!;
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }

    public enum Priority { Low, Medium, High, Critical }
    public enum Status { Todo, InProgress, Review, Done }
}