package kr.co.nebula.portfolio.dto.request;

import jakarta.validation.constraints.NotBlank;

import java.util.List;

/**
 * 새로 추가된 필드는 모두 선택값이다. 카드를 골격만 만들어 두고
 * 내용을 나중에 채우는 흐름을 막지 않기 위해 검증을 걸지 않는다.
 */
public record ProjectRequest(@NotBlank String title, @NotBlank String problem, @NotBlank String role,
                             @NotBlank String impact,
                             String period, String company, String groupName,
                             Integer sortOrder, String repoUrl, Boolean published,
                             List<String> tags) {
}
