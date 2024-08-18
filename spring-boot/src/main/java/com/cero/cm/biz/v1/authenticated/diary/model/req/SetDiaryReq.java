package com.cero.cm.biz.v1.authenticated.diary.model.req;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SetDiaryReq {
    String title;
    String content;
    Long score;
}
