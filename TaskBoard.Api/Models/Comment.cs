using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TaskBoard.Api.Models
{
    public class Comment
    {
        public int Id { get; set; }

        [Required]
        public int TaskId { get; set; }

        [Required]
        public string Author { get; set; } = string.Empty;

        [Required]
        [MaxLength(500)]
        public string Body { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        [JsonIgnore]
        public virtual ProjectTask? ProjectTask { get; set; }
    }
}