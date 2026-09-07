package kr.co.nebula.portfolio.service;

import kr.co.nebula.portfolio.dto.request.ExperienceRequest;
import kr.co.nebula.portfolio.dto.response.ExperienceResponse;
import kr.co.nebula.portfolio.entity.Experience;
import kr.co.nebula.portfolio.exception.ResourceNotFoundException;
import kr.co.nebula.portfolio.repository.ExperienceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ExperienceService {
    private final ExperienceRepository experienceRepository;

    public ExperienceResponse create(ExperienceRequest request) {
        Experience experience = Experience.builder()
                .type(request.type())
                .date(request.date())
                .title(request.title())
                .description(request.description())
                .sortOrder(request.sortOrder())
                .linkTo(request.linkTo())
                .build();
        return new ExperienceResponse(experienceRepository.save(experience));
    }

    @Transactional(readOnly = true)
    public List<ExperienceResponse> getAll() {
        return experienceRepository.findAllByOrderBySortOrderAsc().stream()
                .map(ExperienceResponse::new)
                .toList();
    }

    @Transactional(readOnly = true)
    public ExperienceResponse getOne(Long id) {
        return experienceRepository.findById(id)
                .map(ExperienceResponse::new)
                .orElseThrow(() -> new ResourceNotFoundException("Not found: " + id));
    }

    public ExperienceResponse update(Long id, ExperienceRequest request) {
        Experience experience = experienceRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Not found: " + id));
        experience.update(request.type(), request.date(), request.title(), request.description(),
                request.sortOrder(), request.linkTo());
        return new ExperienceResponse(experienceRepository.save(experience));
    }

    public void delete(Long id) {
        experienceRepository.deleteById(id);
    }
}
