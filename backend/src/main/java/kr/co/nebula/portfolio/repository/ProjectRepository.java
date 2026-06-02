package kr.co.nebula.portfolio.repository;

import kr.co.nebula.portfolio.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {

}
