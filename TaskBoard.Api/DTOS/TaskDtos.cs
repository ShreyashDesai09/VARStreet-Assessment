using TaskBoard.Api.Models;

namespace TaskBoard.Api.DTOS
{
    public record TaskResponseDto(
        int Id,
        int ProjectId,
        string Title,
        string? Description,
        string Priority,
        string Status,
        DateTime? DueDate,
        DateTime CreatedAt,
        int CommentCount
    );

    public record CreateTaskDto(
        int ProjectId,
        string Title,
        string? Description,
        Priority Priority,
        Status Status,
        DateTime? DueDate
    );

    public record DashboardSummaryDto(
        int TotalProjects,
        int TotalTasks,
        Dictionary<string, int> TasksByStatus,
        int OverdueCount,
        int DueSoonCount
    );
}