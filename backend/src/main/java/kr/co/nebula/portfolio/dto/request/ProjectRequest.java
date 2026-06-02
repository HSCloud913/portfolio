package kr.co.nebula.portfolio.dto.request;

import jakarta.validation.constraints.NotBlank;

import java.util.List;

public record ProjectRequest(@NotBlank String title, @NotBlank String problem, @NotBlank String role,
                             @NotBlank String impact, List<String> tags) {
}
