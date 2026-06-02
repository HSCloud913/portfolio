package kr.co.nebula.portfolio.service;

import kr.co.nebula.portfolio.dto.request.SkillRequest;
import kr.co.nebula.portfolio.dto.response.SkillResponse;
import kr.co.nebula.portfolio.entity.Skill;
import kr.co.nebula.portfolio.exception.ResourceNotFoundException;
import kr.co.nebula.portfolio.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SkillService {
    private final SkillRepository skillRepository;

    public SkillResponse create(SkillRequest request) {
        Skill skill = new Skill(request.name(), request.category(), request.level());
        return new SkillResponse(skillRepository.save(skill));
    }

    @Transactional(readOnly = true)
    public List<SkillResponse> getAll() {
        return skillRepository.findAll().stream()
                .map(SkillResponse::new)
                .toList();
    }

    @Transactional(readOnly = true)
    public SkillResponse getOne(Long id) {
        return skillRepository.findById(id)
                .map(SkillResponse::new)
                .orElseThrow(() -> new ResourceNotFoundException("Not found: " + id));
    }

    public SkillResponse update(Long id, SkillRequest request) {
        Skill skill = skillRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Not found: " + id));
        skill.update(request.name(), request.category(), request.level());
        return new SkillResponse(skillRepository.save(skill));
    }

    public void delete(Long id) {
        skillRepository.deleteById(id);
    }
}
