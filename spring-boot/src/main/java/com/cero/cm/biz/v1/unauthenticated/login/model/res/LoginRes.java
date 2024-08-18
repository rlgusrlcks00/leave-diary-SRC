package com.cero.cm.biz.v1.unauthenticated.login.model.res;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRes {
    private Long userId;
    private String userName;
    private String userEmail;
    private String token;


    @Builder
    public LoginRes(Long userId, String userName, String userEmail, String token) {
        this.userId = userId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.token = token;
    }
}
