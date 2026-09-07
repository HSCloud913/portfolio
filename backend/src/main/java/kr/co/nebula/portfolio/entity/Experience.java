package kr.co.nebula.portfolio.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Experience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** EDUCATION / COMPANY / ACHIEVEMENT / LICENSE */
    private String type;

    private String date;
    private String title;

    // Project 와 같은 이유로 TEXT. 기존 DB 는 아래를 한 번 실행할 것.
    //   ALTER TABLE experience ALTER COLUMN description TYPE text;
    @Column(columnDefinition = "TEXT")
    private String description;

    /**
     * 같은 type 안에서의 표시 순서. Project 와 같은 이유로 래퍼 타입을 쓴다.
     * (ddl-auto=update 는 원시 타입에 NOT NULL 컬럼을 만들려 하는데,
     * 이미 행이 있는 테이블에서는 기본값 없는 NOT NULL 추가가 실패한다.)
     */
    private Integer sortOrder;

    /**
     * 같은 내용을 다루는 Projects 카드의 앵커. 예: "project-40".
     * 프로젝트 id 가 아니라 sortOrder 기준이라 재시딩해도 값이 유지된다.
     */
    private String linkTo;

    public void update(String type, String date, String title, String description,
                       Integer sortOrder, String linkTo) {
        this.type = type;
        this.date = date;
        this.title = title;
        this.description = description;
        this.sortOrder = sortOrder;
        this.linkTo = linkTo;
    }
}
