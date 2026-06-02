package kr.co.nebula.portfolio.dto.request;

import jakarta.validation.constraints.NotBlank;

public record ExperienceRequest(@NotBlank String type, @NotBlank String date, @NotBlank String title,
                                @NotBlank String description) {
}
