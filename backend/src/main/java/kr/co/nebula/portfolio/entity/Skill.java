package kr.co.nebula.portfolio.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String category;
    private int level;

    public Skill(String name, String category, int level) {
        update(name, category, level);
    }

    public void update(String name, String category, int level) {
        this.name = name;
        this.category = category;
        this.level = level;
    }
}
