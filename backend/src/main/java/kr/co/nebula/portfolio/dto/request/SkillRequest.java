package kr.co.nebula.portfolio.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record SkillRequest(@NotBlank String name, @NotBlank String category, @Min(1) @Max(5) int level) {

}
