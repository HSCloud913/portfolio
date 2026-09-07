package kr.co.nebula.portfolio.repository;

import kr.co.nebula.portfolio.entity.Experience;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExperienceRepository extends JpaRepository<Experience, Long> {

    /** sortOrder 가 비어 있는 기존 행은 PostgreSQL 의 ASC 기본 동작에 따라 뒤로 밀린다. */
    List<Experience> findAllByOrderBySortOrderAsc();
}
