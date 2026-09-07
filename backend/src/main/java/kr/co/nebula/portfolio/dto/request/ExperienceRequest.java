package kr.co.nebula.portfolio.dto.request;

import jakarta.validation.constraints.NotBlank;

/**
 * description 은 선택값이다. 자격증처럼 부연이 없는 항목이 있어 @NotBlank 를 걸지 않는다.
 */
public record ExperienceRequest(@NotBlank String type, @NotBlank String date, @NotBlank String title,
                                String description, Integer sortOrder, String linkTo) {
}
