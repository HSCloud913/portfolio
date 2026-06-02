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
        Project project = new Project(request.title(), request.problem(), request.role(), request.impact(), request.tags());
        return new ProjectResponse(projectRepository.save(project));
    }

    @Transactional(readOnly = true)
    public List<ProjectResponse> getAll() {
        return projectRepository.findAll().stream()
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
        project.update(request.title(), request.problem(), request.role(), request.impact(), request.tags());
        return new ProjectResponse(projectRepository.save(project));
    }

    public void delete(Long id) {
        projectRepository.deleteById(id);
    }
}
