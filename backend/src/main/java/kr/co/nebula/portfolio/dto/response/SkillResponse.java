package kr.co.nebula.portfolio.dto.response;

import kr.co.nebula.portfolio.entity.Skill;

public record SkillResponse(Long id, String name, String category, int level) {
    public SkillResponse(Skill skill) {
        this(skill.getId(), skill.getName(), skill.getCategory(), skill.getLevel());
    }
}
