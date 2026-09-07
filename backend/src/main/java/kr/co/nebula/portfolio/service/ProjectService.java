package kr.co.nebula.portfolio.service;

import kr.co.nebula.portfolio.dto.request.ProjectRequest;
import kr.co.nebula.portfolio.dto.response.ProjectResponse;
import kr.co.nebula.portfolio.entity.Project;
import kr.co.nebula.portfolio.exception.ResourceNotFoundException;
import kr.co.nebula.portfolio.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;

    public ProjectResponse create(ProjectRequest request) {
        Project project = Project.builder()
                .title(request.title())
                .problem(request.problem())
                .role(request.role())
                .impact(request.impact())
                .period(request.period())
                .company(request.company())
                .groupName(request.groupName())
                .sortOrder(request.sortOrder())
                .repoUrl(request.repoUrl())
                .published(request.published())
                .tags(request.tags() == null ? List.of() : request.tags())
                .build();
        return new ProjectResponse(projectRepository.save(project));
    }

    /** 공개 사이트용. 비공개 카드를 제외한다. */
    @Transactional(readOnly = true)
    public List<ProjectResponse> getPublished() {
        return projectRepository.findAllByOrderBySortOrderAsc().stream()
                .filter(Project::isPublished)
                .map(ProjectResponse::new)
                .toList();
    }

    /** 관리자용. 작성 중인 비공개 카드까지 전부 반환한다. */
    @Transactional(readOnly = true)
    public List<ProjectResponse> getAll() {
        return projectRepository.findAllByOrderBySortOrderAsc().stream()
                .map(ProjectResponse::new)
                .toList();
    }

    @Transactional(readOnly = true)
    public ProjectResponse getOne(Long id) {
        return projectRepository.findById(id)
                .map(ProjectResponse::new)
                .orElseThrow(() -> new ResourceNotFoundException("Not found: " + id));
    }

    public ProjectResponse update(Long id, ProjectRequest request) {
        Project project = projectRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Not found: " + id));
        project.update(request.title(), request.problem(), request.role(), request.impact(),
                request.period(), request.company(), request.groupName(),
                request.sortOrder(), request.repoUrl(), request.published(),
                request.tags());
        return new ProjectResponse(projectRepository.save(project));
    }

    public void delete(Long id) {
        projectRepository.deleteById(id);
    }
}
