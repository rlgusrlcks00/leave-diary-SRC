package com.cero.cm.biz.v1.authenticated.profile.service;

import com.cero.cm.biz.v1.authenticated.profile.model.req.SetProfileReq;
import com.cero.cm.common.service.FileStorageService;
import com.cero.cm.db.entity.User;
import com.cero.cm.db.repository.user.UserRepository;
import com.cero.cm.util.TokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final UserRepository userRepository;

    @Transactional
    public User setProfile(SetProfileReq req) {

        Long userId = TokenUtil.getUserId();
        LocalDateTime now = LocalDateTime.now();

        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
        String profileImgUrl = user.getProfileImg();
        FileStorageService fileStorageService = new FileStorageService();
        if(req.getProfileImg() != null) {
            profileImgUrl = fileStorageService.storeProfileFile(req.getProfileImg());
            user.setProfileImg(profileImgUrl);
        } else {
            user.setProfileImg(profileImgUrl);
        }

        user.setBirth(req.getBirth());
        user.setGender(req.getGender());
        user.setModDt(now);
        user.setLeaveDt(req.getLeaveDt());

        return userRepository.save(user);
    }

    public User getProfile() {
        Long userId = TokenUtil.getUserId();
        return userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
    }
}
