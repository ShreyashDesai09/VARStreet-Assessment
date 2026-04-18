namespace TaskBoard.Api.DTOS
{
    public record ProjectResponseDto(
        int Id,
        string Name,
        string? Description,
        DateTime CreatedAt,
        int TaskCount
    );

    public record CreateProjectDto(
        string Name,
        string? Description
    );
}