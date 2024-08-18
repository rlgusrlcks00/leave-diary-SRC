package com.cero.cm.biz.v1.unauthenticated.join.service;

import com.cero.cm.biz.v1.unauthenticated.join.model.req.JoinReq;
import com.cero.cm.db.entity.User;
import com.cero.cm.db.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class JoinService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public String joinUser(JoinReq req) {

        boolean existsReq = req == null;
        if(existsReq) {
            throw new IllegalArgumentException("Request is null");
        }

        boolean isSameEmail = userRepository.existsByUserEmail(req.getUserEmail());
        if(isSameEmail) {
            return "Email already exists";
        }

        // 비밀번호 암호화
        req.setUserPwd(passwordEncoder.encode(req.getUserPwd()));
        // User 정보 저장
        userRepository.save(req.toUserEntity());
        return "success";
    }
}
