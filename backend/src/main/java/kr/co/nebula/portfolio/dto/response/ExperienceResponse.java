package kr.co.nebula.portfolio.dto.response;

import kr.co.nebula.portfolio.entity.Experience;

public record ExperienceResponse(Long id, String type, String date, String title, String description) {
    public ExperienceResponse(Experience experience) {
        this(experience.getId(), experience.getType(), experience.getDate(), experience.getTitle(), experience.getDescription());
    }
}
