package kr.co.nebula.portfolio.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    // Problem/Role/Impact 는 문단 길이라 varchar(255) 를 넘는다. 컬럼을 TEXT 로 고정한다.
    // (ddl-auto=update 는 컬럼을 추가할 뿐 기존 컬럼 타입을 넓히지 않으므로,
    //  이미 만들어진 DB 는 아래 주석의 ALTER 를 한 번 실행해야 한다.)
    //   ALTER TABLE project ALTER COLUMN problem TYPE text;
    //   ALTER TABLE project ALTER COLUMN role    TYPE text;
    //   ALTER TABLE project ALTER COLUMN impact  TYPE text;
    @Column(columnDefinition = "TEXT")
    private String problem;

    @Column(columnDefinition = "TEXT")
    private String role;

    @Column(columnDefinition = "TEXT")
    private String impact;

    /**
     * 표시용 기간. "2024.11 – 현재" / "2019" / "개인 프로젝트 · 진행 중" 처럼
     * 날짜가 아닌 값이 들어오므로 LocalDate 가 아니라 문자열로 둔다.
     */
    private String period;

    /** 소속 회사. 개인 프로젝트는 null. */
    private String company;

    /** 카드 그룹명. Skill.category 와 같이 문자열로 두어 코드 배포 없이 그룹을 늘릴 수 있게 한다. */
    private String groupName;

    /** 표시 순서. 사이에 카드를 끼워 넣을 수 있도록 10 단위로 부여한다. */
    private Integer sortOrder;

    /** 공개 저장소 주소. 없으면 null. */
    private String repoUrl;

    /**
     * 공개 여부. 내용이 덜 채워진 카드를 공개 사이트에서 감추는 용도.
     * <p>
     * 원시 타입 boolean/int 이 아니라 래퍼 타입을 쓰는 이유: ddl-auto=update 는
     * 원시 타입 필드에 대해 NOT NULL 컬럼을 추가하려 하는데, 이미 행이 있는
     * 테이블에서는 기본값 없는 NOT NULL 추가가 실패한다. 래퍼 타입이면
     * nullable 컬럼으로 추가되어 기존 행과 충돌하지 않는다.
     */
    private Boolean published;

    @ElementCollection
    @CollectionTable(name = "project_tag", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "tag")
    @Builder.Default
    private List<String> tags = new ArrayList<>();

    /** published 가 아직 비어 있는 기존 행은 공개로 취급한다. */
    public boolean isPublished() {
        return published == null || published;
    }

    public void update(String title, String problem, String role, String impact,
                       String period, String company, String groupName,
                       Integer sortOrder, String repoUrl, Boolean published,
                       List<String> tags) {
        this.title = title;
        this.problem = problem;
        this.role = role;
        this.impact = impact;
        this.period = period;
        this.company = company;
        this.groupName = groupName;
        this.sortOrder = sortOrder;
        this.repoUrl = repoUrl;
        this.published = published;
        this.tags = tags == null ? new ArrayList<>() : tags;
    }
}
