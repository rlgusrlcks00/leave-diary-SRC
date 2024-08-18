package com.cero.cm.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Table(name = "tb_diary")
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Diary {
    @Id
    @GeneratedValue(generator = "tb_diary_id_seq")
    @Column(name = "diary_id", nullable = true)
    private Long diaryId;

    @Column(name  = "title", nullable = true)
    private String title;

    @Column(name  = "content", nullable = true)
    private String content;

    @Column(name  = "reg_dt")
    private LocalDateTime regDt;

    @Column(name  = "mod_dt")
    private LocalDateTime modDt;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "score")
    private Long score;

    @Column(name = "del_yn")
    private String delYn;
}
