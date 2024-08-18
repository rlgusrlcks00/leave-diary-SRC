package com.cero.cm.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Table(name = "tb_user")
@Entity
@Getter
@Setter
@NoArgsConstructor
public class User implements UserDetails {

    @Id
    @GeneratedValue(generator = "tb_user_id_seq")
    @Column(name = "user_id", nullable = true)
    private Long userId;

    @Column(name = "user_email", nullable = true)
    private String userEmail;

    @Column(name = "user_name", nullable = true)
    private String userName;

    @Column(name = "user_pwd", nullable = true)
    private String userPwd;

    @Column(name = "reg_dt")
    private LocalDateTime regDt;

    @Column(name = "mod_dt")
    private LocalDateTime modDt;

    @Column(name = "leave_dt")
    private LocalDateTime leaveDt;

    @Column(name = "birth")
    private String birth;

    @Column(name = "gender")
    private String gender;

    @Column(name = "profile_img")
    private String profileImg;

    @Column(name = "del_yn")
    private String delYn;

    @Builder
    public User(
              Long userId
            , String userEmail
            , String userName
            , String userPwd
            , LocalDateTime regDt
            , LocalDateTime modDt
            , LocalDateTime leaveDt
            , String delYn
    ) {
        this.userId = userId;
        this.userEmail = userEmail;
        this.userName = userName;
        this.userPwd = userPwd;
        this.regDt = regDt;
        this.modDt = modDt;
        this.leaveDt = leaveDt;
        this.delYn = delYn;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<GrantedAuthority> roles = new HashSet<>();
        return roles;
    }

    //UserDetails의 메서드 구현때문에 UserName은 getUserRealName으로 호출
    public String getUserRealName() {
        return userName;
    }

    @Override
    public String getUsername() {
        return userEmail;
    }

    // 사용자의 password를 반환
    @Override
    public String getPassword() {
        return userPwd;
    }

    // 계정 만료 여부 반환
    @Override
    public boolean isAccountNonExpired() {
        // 만료되었는지 확인하는 로직
        return true; // true -> 만료되지 않았음
    }

    // 계정 잠금 여부 반환
    @Override
    public boolean isAccountNonLocked() {
        // 계정 잠금되었는지 확인하는 로직
        return true; // true -> 잠금되지 않았음
    }

    // 패스워드의 만료 여부 반환
    @Override
    public boolean isCredentialsNonExpired() {
        // 패스워드가 만료되었는지 확인하는 로직
        return true; // true -> 만료되지 않았음
    }

    // 계정 사용 가능 여부 반환
    @Override
    public boolean isEnabled() {
        // 계정이 사용 가능한지 확인하는 로직
        return true; // true -> 사용 가능
    }
}
