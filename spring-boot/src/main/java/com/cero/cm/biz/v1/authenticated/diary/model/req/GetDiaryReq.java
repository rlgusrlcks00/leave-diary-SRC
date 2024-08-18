package com.cero.cm.biz.v1.authenticated.diary.model.req;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class GetDiaryReq {
    LocalDateTime date;
}
