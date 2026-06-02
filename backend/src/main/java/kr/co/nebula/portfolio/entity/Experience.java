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
public class Experience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;
    private String date;
    private String title;
    private String description;

    public Experience(String type, String date, String title, String description) {
        update(type, date, title, description);
    }

    public void update(String type, String date, String title, String description) {
        this.type = type;
        this.date = date;
        this.title = title;
        this.description = description;
    }
}
