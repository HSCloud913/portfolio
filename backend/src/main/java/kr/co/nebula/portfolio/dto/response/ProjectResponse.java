package kr.co.nebula.portfolio.dto.response;

import kr.co.nebula.portfolio.entity.Project;

import java.util.List;

public record ProjectResponse(Long id, String title, String problem,
                              String role, String impact,
                              String period, String company, String groupName,
                              Integer sortOrder, String repoUrl, boolean published,
                              List<String> tags) {
    public ProjectResponse(Project project) {
        this(project.getId(), project.getTitle(), project.getProblem(), project.getRole(), project.getImpact(),
                project.getPeriod(), project.getCompany(), project.getGroupName(),
                project.getSortOrder(), project.getRepoUrl(), project.isPublished(),
                project.getTags());
    }
}
