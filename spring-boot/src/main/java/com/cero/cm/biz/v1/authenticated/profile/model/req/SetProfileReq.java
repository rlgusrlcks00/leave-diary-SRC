package com.cero.cm.biz.v1.authenticated.profile.model.req;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Getter
@Setter
public class SetProfileReq {
    private String birth;
    private String gender;
    private MultipartFile profileImg;
    private LocalDateTime leaveDt;
}
