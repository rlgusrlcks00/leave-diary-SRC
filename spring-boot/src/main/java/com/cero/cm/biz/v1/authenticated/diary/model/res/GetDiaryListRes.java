package com.cero.cm.biz.v1.authenticated.diary.model.res;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class GetDiaryListRes {
    private Long diaryId;
    private String title;
    private String content;
    private Long score;
    private LocalDateTime modDt;
}
