package kr.co.nebula.portfolio.repository;

import kr.co.nebula.portfolio.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    /**
     * 메서드 이름으로 정렬 쿼리가 유도된다. 구현체는 Spring Data 가 만든다.
     * sortOrder 가 비어 있는 기존 행은 PostgreSQL 의 ASC 기본 동작에 따라 뒤로 밀린다.
     */
    List<Project> findAllByOrderBySortOrderAsc();
}
