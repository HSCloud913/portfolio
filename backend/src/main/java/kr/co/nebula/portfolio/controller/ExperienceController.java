package kr.co.nebula.portfolio.controller;

import jakarta.validation.Valid;
import kr.co.nebula.portfolio.dto.request.ExperienceRequest;
import kr.co.nebula.portfolio.dto.response.ExperienceResponse;
import kr.co.nebula.portfolio.service.ExperienceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/experiences")
@RequiredArgsConstructor
public class ExperienceController {
    private final ExperienceService experienceService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ExperienceResponse createExperience(@Valid @RequestBody ExperienceRequest request) {
        return experienceService.create(request);
    }

    @GetMapping
    public List<ExperienceResponse> getAllExperiences() {
        return experienceService.getAll();
    }

    @GetMapping("/{id}")
    public ExperienceResponse getExperience(@PathVariable Long id) {
        return experienceService.getOne(id);
    }

    @PutMapping("/{id}")
    public ExperienceResponse updateExperience(@PathVariable Long id, @Valid @RequestBody ExperienceRequest request) {
        return experienceService.update(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteExperience(@PathVariable Long id) {
        experienceService.delete(id);
    }
}
