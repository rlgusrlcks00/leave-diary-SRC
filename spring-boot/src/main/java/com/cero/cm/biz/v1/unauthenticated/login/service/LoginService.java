package com.cero.cm.biz.v1.unauthenticated.login.service;

import com.cero.cm.biz.v1.unauthenticated.login.model.req.LoginReq;
import com.cero.cm.biz.v1.unauthenticated.login.model.res.LoginRes;
import com.cero.cm.config.config.JwtTokenUtil;
import com.cero.cm.db.entity.User;
import com.cero.cm.db.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final UserRepository userRepository;
    private final JwtTokenUtil jwtTokenUtil;
    private final PasswordEncoder passwordEncoder;

    public LoginRes loginUser(LoginReq req) {

        User user = userRepository.findByUserEmail(req.getUserEmail());

        if(Objects.equals(user.getDelYn(), "Y")) {
            throw new IllegalArgumentException("Deleted user");
        }


        if(user == null || !passwordEncoder.matches(req.getUserPwd(), user.getUserPwd())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        LoginRes res = LoginRes.builder()
                .userId(user.getUserId())
                .userName(user.getUserRealName())
                .userEmail(user.getUserEmail())
                .build();

        res.setToken(jwtTokenUtil.generateToken(user));

        return res;
    }
}
