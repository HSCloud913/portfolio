package kr.co.nebula.portfolio.controller;

import jakarta.validation.Valid;
import kr.co.nebula.portfolio.dto.request.SkillRequest;
import kr.co.nebula.portfolio.dto.response.SkillResponse;
import kr.co.nebula.portfolio.service.SkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
@RequiredArgsConstructor
public class SkillController {
    private final SkillService skillService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SkillResponse createSkill(@Valid @RequestBody SkillRequest request) {
        return skillService.create(request);
    }

    @GetMapping
    public List<SkillResponse> getAllSkills() {
        return skillService.getAll();
    }

    @GetMapping("/{id}")
    public SkillResponse getSkill(@PathVariable Long id) {
        return skillService.getOne(id);
    }

    @PutMapping("/{id}")
    public SkillResponse updateSkill(@PathVariable Long id, @Valid @RequestBody SkillRequest request) {
        return skillService.update(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteSkill(@PathVariable Long id) {
        skillService.delete(id);
    }
}
