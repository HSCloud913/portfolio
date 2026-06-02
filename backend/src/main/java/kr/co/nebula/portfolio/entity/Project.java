package kr.co.nebula.portfolio.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String problem;
    private String role;
    private String impact;

    @ElementCollection
    @CollectionTable(name = "project_tag", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "tag")
    private List<String> tags = new ArrayList<>();

    public Project(String title, String problem, String role, String impact, List<String> tags) {
        update(title, problem, role, impact, tags);
    }

    public void update(String title, String problem, String role, String impact, List<String> tags) {
        this.title = title;
        this.problem = problem;
        this.role = role;
        this.impact = impact;
        this.tags = tags;
    }
}
